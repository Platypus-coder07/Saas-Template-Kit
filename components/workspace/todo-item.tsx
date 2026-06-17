"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Trash2, ArrowUpRight } from "lucide-react";
import { toast } from "react-hot-toast";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  status: "INBOX" | "TODAY" | "BACKLOG";
}

interface TodoItemProps {
  todo: Todo;
  onRefreshAction: () => void;
}

export function TodoItem({ todo, onRefreshAction }: TodoItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const toggleComplete = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !todo.completed }),
      });
      if (!res.ok) throw new Error();
      onRefreshAction();
    } catch {
      toast.error("Failed to update status");
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteTodo = async () => {
    try {
      const res = await fetch(`/api/todos/${todo.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Task deleted");
      onRefreshAction();
    } catch {
      toast.error("Could not remove task");
    }
  };

  const moveToBacklog = async () => {
    try {
      const res = await fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "BACKLOG" }),
      });
      if (!res.ok) throw new Error();
      toast.success("Moved to Backlog");
      onRefreshAction();
    } catch {
      toast.error("Failed to process task routing");
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="flex items-center justify-between p-3 bg-white border border-stone-200/60 rounded-xl shadow-xs gap-3 group"
    >
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={toggleComplete}
          disabled={isUpdating}
          className={`w-4 h-4 rounded flex items-center justify-center border transition-all shrink-0 ${
            todo.completed
              ? "bg-[#2D8A78] border-[#2D8A78] text-white"
              : "border-stone-300 bg-stone-50 hover:border-stone-400"
          }`}
        >
          {todo.completed && <CheckCircle2 className="w-3 h-3 stroke-[3.5]" />}
        </button>

        <span
          className={`text-sm font-semibold tracking-tight truncate transition-all duration-300 ${
            todo.completed ? "line-through text-stone-400" : "text-stone-700"
          }`}
        >
          {todo.title}
        </span>
      </div>

      <div className="flex items-center gap-1.5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
        {todo.status === "INBOX" && (
          <button
            onClick={moveToBacklog}
            title="Process into Backlog"
            className="p-1.5 text-stone-400 hover:text-[#2D8A78] hover:bg-stone-100 rounded-lg transition-colors"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          onClick={deleteTodo}
          className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50/50 rounded-lg transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </motion.div>
  );
}
