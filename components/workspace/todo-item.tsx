"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Trash2, ArrowRightLeft, ArrowUpRight, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";
import { TodoDetailModal } from "./todo-detail-modal"; 
import { useUpgradeModal } from "@/lib/upgrade-modal-context";

interface Todo {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "INBOX" | "TODAY" | "BACKLOG";
  dueDate?: string | Date | null;
}

interface TodoItemProps {
  todo: Todo;
  onRefreshAction: () => void;
}

export function TodoItem({ todo, onRefreshAction }: TodoItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { showUpgradeModal } = useUpgradeModal();

  const toggleComplete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid popping the modal on button check toggle
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

  const handleMoveToToday = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid popping modal context on transition click
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "TODAY" }),
      });
      const data = await res.json();
      if (res.status === 403) {
        showUpgradeModal(); 
        return;
      }

      if (!res.ok) throw new Error(data.error || "Action restricted");
      toast.success("Allocated to Today's Focus");
      onRefreshAction();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const [isDeleting, setIsDeleting] = useState(false);
  const deleteTodo = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/todos/${todo.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Task cleared");
      onRefreshAction();
    } catch {
      toast.error("Could not remove task");
    }
  };

  const moveToBacklog = async (e: React.MouseEvent) => {
    e.stopPropagation();
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
      toast.error("Failed to move task");
    }
  };

  return (
    <>
      <motion.div
        layout
        onClick={() => setIsDetailOpen(true)} // Open full contextual detail sheet on click
        className="flex items-center justify-between p-3.5 bg-white border border-stone-200/60 rounded-xl shadow-2xs gap-4 group hover:border-[#8FB8A8]/60 cursor-pointer transition-all duration-150"
      >
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={toggleComplete}
            disabled={isUpdating}
            className={`size-4.5 rounded-md flex items-center justify-center border transition-all shrink-0 ${
              todo.completed
                ? "bg-[#2D8A78] border-[#2D8A78] text-white"
                : "border-stone-300 bg-stone-50 hover:border-stone-400"
            }`}
          >
            {todo.completed && (
              <CheckCircle2 className="w-3.5 h-3.5 stroke-[3.5]" />
            )}
          </button>

          <div className="flex flex-col min-w-0 gap-0.5">
            <span
              className={`text-sm font-semibold tracking-tight truncate transition-all duration-200 ${
                todo.completed
                  ? "line-through text-stone-400/80 font-medium"
                  : "text-stone-800"
              }`}
            >
              {todo.title}
            </span>
            <div className="flex items-center gap-2">
              <span
                className={`text-[9px] font-black tracking-wider uppercase px-1.5 py-0.5 rounded-md ${
                  todo.priority === "HIGH"
                    ? "bg-red-50 text-[#E26D5A]"
                    : todo.priority === "MEDIUM"
                      ? "bg-amber-50 text-[#E6B85C]"
                      : "bg-stone-100 text-stone-500"
                }`}
              >
                {todo.priority}
              </span>
              <span className="text-[10px] font-bold text-stone-400 capitalize">
                {todo.status.toLowerCase()}
              </span>
            </div>
          </div>
        </div>

        {/* Hover Controls Panel */}
        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0">
          {todo.status !== "TODAY" && !todo.completed && (
            <button
              onClick={handleMoveToToday}
              disabled={isUpdating}
              title="Move to Focus"
              className="p-1.5 text-stone-400 hover:text-[#2D8A78] hover:bg-stone-50 rounded-lg transition-colors"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          )}
          {(todo.status === "INBOX" || todo.status === "TODAY") && (
            <button
              onClick={moveToBacklog}
              title="Move to Backlog"
              className="p-1.5 text-stone-400 hover:text-[#2D8A78] hover:bg-stone-50 rounded-lg transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={deleteTodo}
            disabled={isDeleting}
            className="p-1.5 text-stone-400 hover:text-[#E26D5A] hover:bg-red-50/60 rounded-lg transition-colors"
          >
            {isDeleting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Trash2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </motion.div>

      {/* Embedded Detail Overlay Controller */}
      <TodoDetailModal
        todo={todo}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        onRefreshAction={onRefreshAction}
      />
    </>
  );
}
