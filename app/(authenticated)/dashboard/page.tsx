"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TodoForm } from "@/components/workspace/todo-form";
import { TodoItem } from "@/components/workspace/todo-item";
import { Inbox, Layers, Loader2 } from "lucide-react";

export default function DashboardPage() {
  const [todos, setTodos] = useState([]);
  const [activeTab, setActiveTab] = useState<"INBOX" | "BACKLOG">("INBOX");
  const [isLoading, setIsLoading] = useState(true);

  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/todos?status=${activeTab}`);
      if (res.ok) {
        const data = await res.json();
        setTodos(data.todos || []);
      }
    } catch (error) {
      console.error("Error hydrating collection state:", error);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className="min-h-screen bg-[#FCFAEF] text-stone-800 p-4 sm:p-8">
      <div className="max-w-xl mx-auto space-y-6 pt-6">
        {/* Workspace Quick-Capture Entry point */}
        <div className="space-y-2">
          <h1 className="text-xl font-black text-stone-900 tracking-tight">
            Your Engine Room
          </h1>
          <TodoForm onSuccessAction={fetchTodos} />
        </div>

        {/* Dynamic Navigation Tabs */}
        <div className="flex border-b border-stone-200/80 gap-4">
          <button
            onClick={() => setActiveTab("INBOX")}
            className={`flex items-center gap-2 pb-2.5 text-sm font-bold border-b-2 transition-all relative ${
              activeTab === "INBOX"
                ? "border-[#2D8A78] text-[#2D8A78]"
                : "border-transparent text-stone-400 hover:text-stone-600"
            }`}
          >
            <Inbox className="w-4 h-4" />
            Inbox Bucket
          </button>
          <button
            onClick={() => setActiveTab("BACKLOG")}
            className={`flex items-center gap-2 pb-2.5 text-sm font-bold border-b-2 transition-all ${
              activeTab === "BACKLOG"
                ? "border-[#2D8A78] text-[#2D8A78]"
                : "border-transparent text-stone-400 hover:text-stone-600"
            }`}
          >
            <Layers className="w-4 h-4" />
            Backlog Stream
          </button>
        </div>

        {/* Workspace Display Slate */}
        <div className="min-h-48 relative">
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center text-stone-400">
              <Loader2 className="w-5 h-5 animate-spin text-[#2D8A78]" />
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <AnimatePresence mode="popLayout">
                {todos.length === 0 ? (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-xs font-semibold text-stone-400 text-center py-12"
                  >
                    No pending items mapped to this track.
                  </motion.p>
                ) : (
                  todos.map((todo: any) => (
                    <TodoItem
                      key={todo.id}
                      todo={todo}
                      onRefreshAction={fetchTodos}
                    />
                  ))
                )}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
