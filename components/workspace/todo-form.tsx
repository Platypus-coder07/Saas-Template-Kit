"use client";

import { useState } from "react";
import { toast } from "react-hot-toast";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TodoFormProps {
  onSuccessAction: () => void;
}

export function TodoForm({ onSuccessAction }: TodoFormProps) {
  const [title, setTitle] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          status: "INBOX", // Default bucket for casual capture
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      toast.success("Task captured into Inbox");
      setTitle("");
      onSuccessAction();
    } catch (error: any) {
      toast.error(error.message || "Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Quick capture your thought (Press Enter to drop into Inbox)..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isSubmitting}
        className="flex-1 h-11 px-4 rounded-xl border border-stone-200 bg-white text-stone-800 text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-[#2D8A78]/50 disabled:opacity-60 transition-all"
      />
      <Button
        type="submit"
        disabled={isSubmitting || !title.trim()}
        className="h-11 px-4 bg-[#2D8A78] hover:bg-[#236B5D] text-white rounded-xl transition-all shadow-md shrink-0"
      >
        {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
      </Button>
    </form>
  );
}