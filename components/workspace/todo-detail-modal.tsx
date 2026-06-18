"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Sparkles,
  Calendar,
  Loader2,
  PlusCircle,
  Trash2,
} from "lucide-react";
import { toast } from "react-hot-toast";

interface Todo {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "INBOX" | "TODAY" | "BACKLOG";
  dueDate?: string | Date | null;
}

interface TodoDetailModalProps {
  todo: Todo;
  isOpen: boolean;
  onClose: () => void;
  onRefreshAction: () => void;
}

export function TodoDetailModal({
  todo,
  isOpen,
  onClose,
  onRefreshAction,
}: TodoDetailModalProps) {
  // Field Edit States
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description || "");
  const [priority, setPriority] = useState(todo.priority);
  const [dueDate, setDueDate] = useState("");

  // Execution Core States
  const [isSaving, setIsSaving] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [generatedSubTasks, setGeneratedSubTasks] = useState<
    { title: string; description: string }[]
  >([]);

  // Safely format incoming dates for HTML input compatibility
  useEffect(() => {
    if (todo.dueDate) {
      const d = new Date(todo.dueDate);
      setDueDate(d.toISOString().split("T")[0]);
    } else {
      setDueDate("");
    }
    // Reset states when swapping target todo contexts
    setTitle(todo.title);
    setDescription(todo.description || "");
    setPriority(todo.priority);
    setGeneratedSubTasks([]);
  }, [todo, isOpen]);

  // Handle saving primary inline edits
  const handleSaveChanges = async () => {
    if (!title.trim()) {
      toast.error("Task title cannot be empty");
      return;
    }
    setIsSaving(true);
    try {
      const res = await fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim() || null,
          priority,
          dueDate: dueDate || null,
        }),
      });
      if (!res.ok) throw new Error();
      toast.success("Task updates synchronized");
      onRefreshAction();
      onClose();
    } catch {
      toast.error("Failed to commit task metadata updates");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/todos/${todo.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Task deleted");
      onRefreshAction();
      onClose();
    } catch {
      toast.error("Could not delete task");
    }
  };

  // Trigger Gemini Pipeline
  const handleAiDecompose = async () => {
    setIsAiLoading(true);
    setGeneratedSubTasks([]);
    try {
      const res = await fetch("/api/todos/decompose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskTitle: title,
          taskDescription: description,
        }),
      });
      const data = await res.json();
      if (!res.ok)
        throw new Error(data.error || "Decomposition pipeline aborted");
      setGeneratedSubTasks(data.subTasks || []);
      toast.success("AI breakdown sequence completed");
    } catch (error: any) {
      toast.error(error.message || "Failed to parse generation steps");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Option A Execution: Mass-insert independent action items straight into Inbox
  const handleAddAllToInbox = async () => {
    setIsSaving(true);
    try {
      await Promise.all(
        generatedSubTasks.map(async (task) => {
          const res = await fetch("/api/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: task.title,
              description: task.description,
              status: "INBOX",
              priority: priority,
            }),
          });
          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.error);
          }
        }),
      );
      toast.success(
        `Spawned ${generatedSubTasks.length} action items into Inbox`,
      );
      setGeneratedSubTasks([]);
      onRefreshAction();
    } catch {
      toast.error("Batch creation failed partially");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-[#161616]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="bg-white border border-stone-200/80 w-full max-w-lg rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden"
          >
            {/* Modal Top Metadata Strip */}
            <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-[#F4F1E8]/20 shrink-0">
              <div className="flex items-center gap-2">
                <span
                  className={`text-[10px] font-black tracking-widest uppercase px-2 py-0.5 rounded-md ${
                    priority === "HIGH"
                      ? "bg-red-50 text-[#E26D5A]"
                      : priority === "MEDIUM"
                        ? "bg-amber-50 text-[#E6B85C]"
                        : "bg-stone-100 text-stone-500"
                  }`}
                >
                  {priority} Priority
                </span>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider bg-stone-50 border border-stone-200/40 px-2 py-0.5 rounded-md">
                  {todo.status}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-stone-100 rounded-lg text-stone-400 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Document Editing Core */}
            <div className="p-5 overflow-y-auto space-y-5 flex-1 text-stone-800">
              {/* Editable Title Section */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                  Task Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full text-lg font-black text-stone-900 bg-transparent border-b border-transparent hover:border-stone-200 focus:border-[#8FB8A8] focus:outline-hidden pb-1 transition-colors"
                />
              </div>

              {/* Editable Description Box */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                  Context Notes
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Drop added details or long-form notes here..."
                  className="w-full min-h-20 p-3 rounded-xl bg-stone-50/50 border border-stone-200/60 text-xs font-medium focus:outline-hidden focus:border-stone-300 transition-colors resize-none placeholder-stone-400"
                />
              </div>

              {/* Quick Config Strip Grid */}
              <div className="grid grid-cols-2 gap-4 pt-1">
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                    Adjust Weight
                  </span>
                  <div className="flex bg-stone-100 p-0.5 rounded-lg border border-stone-200/40 w-max">
                    {(["LOW", "MEDIUM", "HIGH"] as const).map((p) => (
                      <button
                        key={p}
                        type="button"
                        onClick={() => setPriority(p)}
                        className={`px-3 py-1 text-[10px] font-black rounded-md transition-all ${
                          priority === p
                            ? p === "HIGH"
                              ? "bg-[#E26D5A] text-white"
                              : p === "MEDIUM"
                                ? "bg-[#E6B85C] text-white"
                                : "bg-stone-500 text-white"
                            : "text-stone-500 hover:text-stone-800"
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                    Target Deadline
                  </span>
                  <div className="flex items-center gap-1.5 bg-stone-50 border border-stone-200/60 px-2 py-1 rounded-lg w-max">
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

              {/* ─── AI SUB-TASKS PROCESSING TRACKER ─── */}
              <div className="border-t border-stone-100 pt-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black tracking-tight text-stone-800 uppercase">
                    AI Execution Sub-Tasks
                  </span>
                  {generatedSubTasks.length === 0 && (
                    <button
                      type="button"
                      disabled={isAiLoading}
                      onClick={handleAiDecompose}
                      className="flex items-center gap-1 px-3 py-1 bg-[#8FB8A8]/10 text-[#2D8A78] hover:bg-[#8FB8A8]/20 transition-all text-[11px] font-black rounded-lg border border-[#8FB8A8]/20"
                    >
                      {isAiLoading ? (
                        <Loader2 className="w-3 h-3 animate-spin" />
                      ) : (
                        <Sparkles className="w-3 h-3 fill-[#2D8A78]" />
                      )}
                      Decompose Goal (Pro)
                    </button>
                  )}
                </div>

                {/* Sub-task Display Shell */}
                <div className="space-y-2">
                  {isAiLoading && (
                    <div className="p-6 border border-dashed border-stone-200 rounded-xl flex flex-col items-center justify-center text-stone-400 space-y-1.5 bg-stone-50/30">
                      <Loader2 className="w-5 h-5 animate-spin text-[#2D8A78]" />
                      <span className="text-[11px] font-bold tracking-tight animate-pulse text-stone-500">
                        Formulating optimal 30-min sessions...
                      </span>
                    </div>
                  )}

                  {generatedSubTasks.length > 0 && (
                    <div className="space-y-2">
                      <div className="max-h-48 overflow-y-auto space-y-2 border border-stone-200/60 p-2 rounded-xl bg-stone-50/40 pr-1">
                        {generatedSubTasks.map((sub, idx) => (
                          <div
                            key={idx}
                            className="p-2.5 bg-white border border-stone-100 rounded-lg flex items-start gap-2.5 shadow-2xs"
                          >
                            <PlusCircle className="w-3.5 h-3.5 text-[#2D8A78] shrink-0 mt-0.5" />
                            <div className="space-y-0.5 min-w-0">
                              <h5 className="text-xs font-bold text-stone-800 truncate">
                                {sub.title}
                              </h5>
                              <p className="text-[10px] text-stone-500 leading-normal font-medium">
                                {sub.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={handleAddAllToInbox}
                        disabled={isSaving}
                        className="w-full py-2 bg-stone-100 hover:bg-[#8FB8A8]/10 text-stone-700 hover:text-[#2D8A78] text-[11px] font-black rounded-xl border border-stone-200/80 hover:border-[#8FB8A8]/40 transition-all flex items-center justify-center gap-1.5"
                      >
                        Add These Actions to Inbox
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Modal Primary Action Confirmation Strip */}
            <div className="p-4 border-t border-stone-100 flex items-center justify-between bg-stone-50/50 shrink-0">
              <button
                onClick={handleDelete}
                type="button"
                className="p-2 text-stone-400 hover:text-[#E26D5A] hover:bg-red-50 rounded-xl transition-colors"
                title="Delete parent task thread"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-bold text-stone-500 hover:bg-stone-100 rounded-xl transition-all"
                >
                  Close
                </button>
                <button
                  type="button"
                  disabled={isSaving}
                  onClick={handleSaveChanges}
                  className="px-4 py-2 bg-[#2D8A78] hover:bg-[#236B5D] text-white text-xs font-black rounded-xl shadow-xs transition-all flex items-center gap-1"
                >
                  {isSaving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
