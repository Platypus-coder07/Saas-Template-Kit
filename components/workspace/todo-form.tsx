"use client";

import { useState, useRef, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Plus, Loader2, Calendar} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUpgradeModal } from "@/lib/upgrade-modal-context";

interface TodoFormProps {
  onSuccessAction: () => void;
}

export function TodoForm({ onSuccessAction }: TodoFormProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");
  const [dueDate, setDueDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showUpgradeModal } = useUpgradeModal();

  const formRef = useRef<HTMLFormElement>(null);

  // Collapse form when user clicks outside the workspace container boundary
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        formRef.current &&
        !formRef.current.contains(event.target as Node) &&
        !title.trim()
      ) {
        setIsExpanded(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || undefined,
          priority,
          status: "INBOX",
          dueDate: dueDate || undefined,
        }),
      });

      const data = await response.json();
      if (response.status === 403) {
        showUpgradeModal(); 
        return;
      }

      if (!response.ok) throw new Error(data.error || "Capture rejected");

      toast.success("Task dropped into Inbox");
      setTitle("");
      setDescription("");
      setPriority("MEDIUM");
      setDueDate("");
      setIsExpanded(false);
      onSuccessAction();
    } catch (error: any) {
      toast.error(error.message || "Failed to save task");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="w-full flex flex-col bg-white rounded-xl border border-stone-200 transition-all duration-200 p-2 space-y-3 shadow-2xs"
    >
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Capture an idea or task instantly..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          disabled={isSubmitting}
          className="flex-1 h-10 px-3 bg-transparent text-sm font-semibold text-stone-800 focus:outline-hidden placeholder-stone-400"
        />
        {!isExpanded && (
          <Button
            type="submit"
            disabled={isSubmitting || !title.trim()}
            className="h-9 w-9 bg-[#2D8A78] hover:bg-[#236B5D] text-white rounded-lg transition-colors shadow-xs"
          >
            {isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4 stroke-[2.5]" />
            )}
          </Button>
        )}
      </div>

      {/* Expanded Fields Meta Selection Panel */}
      {isExpanded && (
        <div className="border-t border-stone-100 pt-3 px-1 space-y-3 animate-fadeIn">
          <textarea
            placeholder="Add contextual details or multiline sub-notes (optional)..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isSubmitting}
            className="w-full min-h-16 max-h-32 p-2 rounded-lg bg-stone-50/50 border border-stone-200/60 text-xs font-medium text-stone-700 focus:outline-hidden focus:border-stone-300 resize-y placeholder-stone-400"
          />

          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-4">
              {/* Priority Select Strip */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                  Priority
                </span>
                <div className="flex bg-stone-100 p-0.5 rounded-lg border border-stone-200/40">
                  {(["LOW", "MEDIUM", "HIGH"] as const).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`px-2.5 py-1 text-[10px] font-black rounded-md transition-all ${
                        priority === p
                          ? p === "HIGH"
                            ? "bg-[#E26D5A] text-white"
                            : p === "MEDIUM"
                              ? "bg-[#E6B85C] text-white"
                              : "bg-stone-400 text-white"
                          : "text-stone-500 hover:text-stone-800"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Due Date Trigger */}
              <div className="flex flex-col gap-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">
                  Target Timeline
                </span>
                <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200/60 px-2 py-1 rounded-lg">
                  <Calendar className="w-3.5 h-3.5 text-stone-400" />
                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="bg-transparent text-[11px] font-bold text-stone-600 focus:outline-hidden"
                  />
                </div>
              </div>
            </div>

            {/* Form Actions Section */}
            <div className="flex items-center gap-2 self-end">
              <Button
                type="button"
                variant="ghost"
                onClick={() => {
                  setIsExpanded(false);
                  setTitle("");
                  setDescription("");
                  setPriority("MEDIUM");
                  setDueDate("");
                }}
                className="h-8 px-3 text-xs font-bold text-stone-500 hover:bg-stone-50 rounded-lg"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting || !title.trim()}
                className="h-8 px-4 bg-[#2D8A78] hover:bg-[#236B5D] text-white text-xs font-bold rounded-lg shadow-xs"
              >
                {isSubmitting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  "Drop into Inbox"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </form>
  );
}
