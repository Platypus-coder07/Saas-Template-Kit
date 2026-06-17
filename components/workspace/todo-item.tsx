"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2,
  Trash2,
  Sparkles,
  ArrowRightLeft,
  Loader2,
  X,
  AlertCircle,
  PlusCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";

interface Todo {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "INBOX" | "TODAY" | "BACKLOG";
}

interface TodoItemProps {
  todo: Todo;
  onRefreshAction: () => void;
}

export function TodoItem({ todo, onRefreshAction }: TodoItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDecomposeOpen, setIsDecomposeOpen] = useState(false);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [generatedSubTasks, setGeneratedSubTasks] = useState<
    { title: string; description: string }[]
  >([]);

  // Toggle complete state handler
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
      toast.error("Failed to update execution state");
    } finally {
      setIsUpdating(false);
    }
  };

  // Move task to Today's Focus (Enforces backend 3-todo threshold)
  const handleMoveToToday = async () => {
    setIsUpdating(true);
    try {
      const res = await fetch(`/api/todos/${todo.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "TODAY" }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Action restricted");
      }

      toast.success("Allocated to Today's Focus");
      onRefreshAction();
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  // Delete handler
  const deleteTodo = async () => {
    try {
      const res = await fetch(`/api/todos/${todo.id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Task cleared successfully");
      onRefreshAction();
    } catch {
      toast.error("Could not drop reference thread");
    }
  };

  // Trigger Gemini API Decomposition Sequence
  const triggerDecompose = async () => {
    setIsDecomposeOpen(true);
    setIsAiLoading(true);
    setGeneratedSubTasks([]);

    try {
      const res = await fetch("/api/todos/decompose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskTitle: todo.title,
          taskDescription: todo.description,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Decomposition pipeline aborted");
      }

      setGeneratedSubTasks(data.subTasks || []);
    } catch (error: any) {
      toast.error(error.message);
      setIsDecomposeOpen(false); // Snap close on auth block or restriction
    } finally {
      setIsAiLoading(false);
    }
  };

  // Batch insert generated sub-tasks back into user's Inbox
  const commitSubTasksToInbox = async () => {
    setIsUpdating(true);
    try {
      await Promise.all(
        generatedSubTasks.map((task) =>
          fetch("/api/todos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              title: task.title,
              description: task.description,
              status: "INBOX",
              priority: todo.priority,
            }),
          }),
        ),
      );

      toast.success(
        `Spawned ${generatedSubTasks.length} micro-steps into Inbox`,
      );
      setIsDecomposeOpen(false);
      onRefreshAction();
    } catch {
      toast.error("Batch tracking insertion faulted partially");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.18, ease: "easeInOut" }}
        className="flex items-center justify-between p-3.5 bg-white border border-stone-200/60 rounded-xl shadow-2xs gap-4 group hover:border-[#8FB8A8]/60 transition-colors duration-150"
      >
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={toggleComplete}
            disabled={isUpdating}
            className={`w-[18px] h-[18px] rounded-md flex items-center justify-center border transition-all duration-150 shrink-0 ${
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

        {/* Dynamic Action Controls (Fades in neatly on Desktop Hover) */}
        <div className="flex items-center gap-1 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-150 shrink-0">
          {todo.status !== "TODAY" && !todo.completed && (
            <button
              onClick={handleMoveToToday}
              disabled={isUpdating}
              title="Move to Focus"
              className="p-1.5 text-stone-400 hover:text-[#2D8A78] hover:bg-stone-50 rounded-lg transition-colors duration-150"
            >
              <ArrowRightLeft className="w-4 h-4" />
            </button>
          )}
          {!todo.completed && (
            <button
              onClick={triggerDecompose}
              title="Decompose with AI"
              className="p-1.5 text-stone-400 hover:text-[#2D8A78] hover:bg-[#8FB8A8]/10 rounded-lg transition-colors duration-150"
            >
              <Sparkles className="w-4 h-4 stroke-[2.2]" />
            </button>
          )}
          <button
            onClick={deleteTodo}
            className="p-1.5 text-stone-400 hover:text-[#E26D5A] hover:bg-red-50/60 rounded-lg transition-colors duration-150"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </motion.div>

      {/* STAGE 2: PREMIUM DECOMPOSER INTERACTIVE PORTAL LAYOUT */}
      <AnimatePresence>
        {isDecomposeOpen && (
          <div className="fixed inset-0 bg-[#161616]/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
              className="bg-white border border-stone-200 w-full max-w-md rounded-2xl shadow-xl overflow-hidden p-5 flex flex-col gap-4 text-left"
            >
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <div className="flex items-center gap-2 text-sm font-black text-stone-900 tracking-tight">
                  <Sparkles className="w-4 h-4 text-[#E6B85C] fill-[#E6B85C]" />
                  AI Task Decomposer
                </div>
                <button
                  onClick={() => setIsDecomposeOpen(false)}
                  className="p-1 hover:bg-stone-100 rounded-md text-stone-400 hover:text-stone-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                  Breaking down target:
                </span>
                <p className="text-xs font-black text-stone-700 leading-snug bg-stone-50 p-2.5 rounded-xl border border-stone-200/40">
                  {todo.title}
                </p>
              </div>

              {/* Dynamic Slate Render Matrix */}
              <div className="min-h-40 flex flex-col justify-center">
                {isAiLoading ? (
                  <div className="flex flex-col items-center justify-center space-y-2 py-8 text-stone-400">
                    <Loader2 className="w-6 h-6 animate-spin text-[#2D8A78]" />
                    <span className="text-xs font-bold tracking-tight animate-pulse text-stone-500">
                      Formulating execution blocks...
                    </span>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block px-0.5">
                      Generated Sub-Tasks (~30 min sessions)
                    </span>
                    <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                      {generatedSubTasks.map((sub, index) => (
                        <div
                          key={index}
                          className="p-2.5 bg-[#F4F1E8]/40 border border-stone-200/60 rounded-xl flex items-start gap-2.5 animate-fadeIn"
                        >
                          <PlusCircle className="w-4 h-4 text-[#2D8A78] shrink-0 mt-0.5" />
                          <div className="space-y-0.5 min-w-0">
                            <h5 className="text-xs font-black text-stone-800 tracking-tight truncate">
                              {sub.title}
                            </h5>
                            <p className="text-[11px] font-medium text-stone-500 leading-normal">
                              {sub.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Modal Confirmation Controls Panel */}
              <div className="flex items-center justify-end gap-2 border-t border-stone-100 pt-3">
                <button
                  type="button"
                  onClick={() => setIsDecomposeOpen(false)}
                  className="px-3.5 py-2 text-xs font-bold text-stone-500 hover:bg-stone-50 rounded-xl transition-all duration-150"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isAiLoading || generatedSubTasks.length === 0}
                  onClick={commitSubTasksToInbox}
                  className="px-4 py-2 bg-[#2D8A78] hover:bg-[#236B5D] disabled:opacity-40 text-white text-xs font-black rounded-xl shadow-xs transition-all duration-150 flex items-center gap-1.5"
                >
                  Add All to Inbox
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
