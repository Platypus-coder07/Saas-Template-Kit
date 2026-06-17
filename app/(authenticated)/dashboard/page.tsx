"use client";

import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "@/components/workspace/navbar";
import { TodoForm } from "@/components/workspace/todo-form";
import { TodoItem } from "@/components/workspace/todo-item";
import {
  Inbox,
  Layers,
  CheckSquare,
  Settings,
  Menu,
  X,
  TrendingUp,
  CheckCircle2,
  Sparkles,
  Clock,
  AlertCircle,
  Loader2,
} from "lucide-react";

const MOTIVATIONAL_QUOTES = [
  "Capture first, organize later.",
  "Small progress compounds.",
  "Clear space, clear execution block.",
  "Focus on the immediate next step.",
];

interface Todo {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH";
  status: "INBOX" | "TODAY" | "BACKLOG";
  dueDate?: string | Date | null;
  userId: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export default function DashboardPage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [activeTab, setActiveTab] = useState<"INBOX" | "TODAY" | "BACKLOG">(
    "INBOX",
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [greeting, setGreeting] = useState("Good Day");
  const [currentDate, setCurrentDate] = useState("");
  const [motto, setMotto] = useState("");

  useEffect(() => {
    const fetchSubscription = async () => {
      const res = await fetch("/api/subscription");
      if (res.ok) {
        const data = await res.json();
        setIsSubscribed(data.isSubscribed);
      }
    };
    fetchSubscription();
  }, []);

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) setGreeting("Good Morning");
    else if (hours < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");


    setCurrentDate(
      new Date().toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      }),
    );

    setMotto(
      MOTIVATIONAL_QUOTES[
        Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length)
      ],
    );
  }, []);

  
  const fetchTodos = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/todos?status=${activeTab}`);
      if (res.ok) {
        const data = await res.json();
        setTodos(data.todos || []);
      }
    } catch (error) {
      console.error("Hydration fault:", error);
    } finally {
      setIsLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const completedCount = todos.filter((t) => t.completed).length;
  const pendingCount = todos.filter((t) => !t.completed).length;

  const totalAllocated = pendingCount + completedCount;
  const metricsPercentage =
    totalAllocated > 0
      ? Math.round((completedCount / totalAllocated) * 100)
      : 0;

  return (
    <div className="h-screen w-screen bg-[#F4F1E8] text-[#161616] flex flex-col overflow-hidden font-sans antialiased">
      <Navbar isSubscribed={isSubscribed} />

      <div className="flex-1 flex w-full max-w-400 mx-auto relative overflow-hidden">
        <div className="md:hidden absolute top-4 left-4 z-40">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 bg-white border border-stone-200 rounded-xl shadow-xs text-stone-700"
          >
            {isMobileMenuOpen ? (
              <X className="w-4 h-4" />
            ) : (
              <Menu className="w-4 h-4" />
            )}
          </button>
        </div>

        <aside
          className={`
          fixed md:sticky top-0 bottom-0 left-0 h-full w-65 bg-white border-r border-stone-200/60 p-4 
          flex flex-col justify-between shrink-0 z-30 transition-transform duration-200 ease-in-out
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
        >
          <div className="space-y-6 pt-12 md:pt-0">
            <div className="px-2 text-[10px] font-bold uppercase tracking-widest text-stone-400">
              Navigation
            </div>
            <nav className="space-y-1">
              {[
                { id: "INBOX", label: "Inbox Bucket", icon: Inbox },
                { id: "TODAY", label: "Today's Focus", icon: CheckSquare },
                { id: "BACKLOG", label: "Backlog Stream", icon: Layers },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-150 ${
                    activeTab === item.id
                      ? "bg-[#8FB8A8]/10 text-[#2D8A78]"
                      : "text-stone-600 hover:bg-stone-50"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <item.icon className="w-4.5 h-4.5 stroke-[2.2]" />
                    {item.label}
                  </div>
                  {item.id === "INBOX" && pendingCount > 0 && (
                    <span className="bg-[#8FB8A8]/20 text-[#2D8A78] text-[10px] px-1.5 py-0.5 rounded-md font-black">
                      {pendingCount}
                    </span>
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="border-t border-stone-100 pt-4">
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-stone-500 hover:bg-stone-50 transition-all duration-150">
              <Settings className="w-4.5 h-4.5" /> System Settings
            </button>
          </div>
        </aside>

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:p-8 md:p-12 space-y-8 h-full bg-[#F4F1E8]">
          {/* Header Typography Section Block */}
          <div className="space-y-1 pt-6 md:pt-0">
            <h1 className="text-3xl font-black tracking-tight text-[#161616]">
              {greeting}
            </h1>
            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
              <span className="text-xs font-bold text-[#E6B85C] uppercase tracking-wider">
                {currentDate}
              </span>
              <span className="hidden sm:inline text-stone-300 text-xs">|</span>
              <span className="text-xs font-medium text-stone-500 italic">
                "{motto}"
              </span>
            </div>
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { label: "Pending Tasks", val: pendingCount, icon: Inbox },
              {
                label: "Completed Today",
                val: completedCount,
                icon: CheckCircle2,
              },
              {
                label: "Weekly Progress",
                val: `${metricsPercentage}%`,
                icon: TrendingUp,
              },
            ].map((card, i) => (
              <div
                key={i}
                className="bg-white border border-stone-200/50 p-4 rounded-xl flex items-center justify-between transition-all duration-150 hover:shadow-xs group"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
                    {card.label}
                  </span>
                  <span className="text-2xl font-black text-[#161616] tracking-tight block">
                    {card.val}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl text-[#2D8A78] bg-[#8FB8A8]/20 shrink-0">
                  <card.icon className="w-4.5 h-4.5 stroke-[2.2]" />
                </div>
              </div>
            ))}
          </section>

          <div className="bg-white p-2 rounded-2xl border border-stone-200/40 shadow-xs focus-within:ring-2 focus-within:ring-[#8FB8A8]/40 transition-all duration-150">
            <TodoForm onSuccessAction={fetchTodos} />
          </div>

          <div className="space-y-3 min-h-48 relative">
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin text-[#2D8A78]" />
              </div>
            ) : (
              <div className="flex flex-col gap-2">
                <AnimatePresence mode="popLayout">
                  {todos.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.99 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center text-center py-16 px-6 bg-white border border-stone-200/60 rounded-2xl space-y-4 shadow-2xs"
                    >
                      <div className="w-12 h-12 bg-stone-50 text-stone-400 flex items-center justify-center rounded-2xl text-xl font-bold">
                        📥
                      </div>
                      <div className="space-y-1 max-w-sm">
                        <h4 className="text-base font-bold text-[#161616]">
                          Welcome to Todo Master
                        </h4>
                        <p className="text-xs text-stone-500 leading-relaxed font-medium">
                          Capture raw details or action items instantly inside
                          the Inbox, sort them down into your Backlog, and pick
                          max 3 focus targets to clear daily stress.
                        </p>
                      </div>
                    </motion.div>
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
        </main>

        <aside className="w-[320px] bg-white border-l border-stone-200/60 p-5 hidden lg:flex flex-col gap-6 sticky top-0 bottom-0 h-full shrink-0 z-20 overflow-y-auto">
          {/* Today's Focus Meter Container Block */}
          <div className="bg-[#F4F1E8]/50 border border-stone-200/60 p-4 rounded-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black tracking-tight text-stone-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#E6B85C] fill-[#E6B85C]" />
                Daily Execution Focus
              </span>
              <span className="text-xs font-bold text-[#2D8A78] bg-[#8FB8A8]/10 px-2 py-0.5 rounded-md">
                {metricsPercentage}% Ready
              </span>
            </div>

            <div className="w-full h-2 bg-stone-200/80 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#2D8A78] rounded-full transition-all duration-300"
                style={{ width: `${metricsPercentage}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-[11px] font-bold text-stone-500 px-0.5">
              <span>{completedCount} completed</span>
              <span>{pendingCount} remaining</span>
            </div>
          </div>

          <div className="space-y-3">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block px-1">
              Up Next Action Block
            </span>
            <div className="p-4 bg-white border border-stone-200 rounded-xl space-y-3 shadow-2xs hover:border-[#8FB8A8]/60 transition-colors duration-150">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[10px] font-black text-[#E6B85C] uppercase tracking-wider">
                  <AlertCircle className="w-3.5 h-3.5" /> High Importance
                </div>
                <div className="text-[11px] font-bold text-stone-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> ~30 min
                </div>
              </div>
              <p className="text-xs font-black text-stone-800 leading-snug">
                {todos[0]?.title ||
                  "Refactor platform core pipeline security layout handles"}
              </p>
              <button className="w-full py-2 bg-[#2D8A78] hover:bg-[#236B5D] text-white text-xs font-black rounded-lg shadow-sm transition-all duration-150">
                Start Deep Focus Session
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
