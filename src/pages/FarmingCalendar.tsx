import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, CheckCircle2, Clock, Circle } from "lucide-react";
import { calendarTasks } from "@/lib/mock-data";

const typeColors: Record<string, string> = {
  sowing: "bg-safe/15 text-safe border-safe/20",
  fertilizing: "bg-warning/15 text-warning border-warning/20",
  irrigation: "bg-sky/15 text-sky border-sky/20",
  inspection: "bg-primary/15 text-primary border-primary/20",
  harvest: "bg-accent/15 text-accent-foreground border-accent/20",
};

const statusIcons = {
  completed: <CheckCircle2 className="w-4 h-4 text-safe" />,
  pending: <Clock className="w-4 h-4 text-warning" />,
  upcoming: <Circle className="w-4 h-4 text-muted-foreground" />,
};

const typeEmoji: Record<string, string> = {
  sowing: "🌱", fertilizing: "🧪", irrigation: "💧", inspection: "🔍", harvest: "🌾",
};

export default function FarmingCalendar() {
  const [view, setView] = useState<"week" | "month">("week");

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Farming Calendar</h1>
          <p className="text-sm text-muted-foreground mt-1">Plan and track your farming activities</p>
        </div>
        <div className="flex bg-secondary rounded-xl p-1">
          {(["week", "month"] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all ${
                view === v ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {v === "week" ? "Weekly" : "Monthly"}
            </button>
          ))}
        </div>
      </div>

      {/* Mini Calendar Header */}
      <div className="glass-card p-4">
        <div className="flex items-center justify-between mb-4">
          <button className="p-1.5 rounded-lg hover:bg-muted"><ChevronLeft className="w-4 h-4 text-muted-foreground" /></button>
          <h3 className="font-display font-semibold text-foreground">March 2026</h3>
          <button className="p-1.5 rounded-lg hover:bg-muted"><ChevronRight className="w-4 h-4 text-muted-foreground" /></button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((d) => (
            <span key={d} className="text-muted-foreground py-1">{d}</span>
          ))}
          {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => {
            const hasTask = calendarTasks.some((t) => parseInt(t.date.split("-")[2]) === day);
            const isToday = day === 24;
            return (
              <button
                key={day}
                className={`py-1.5 rounded-lg text-xs font-medium transition-colors relative ${
                  isToday ? "bg-primary text-primary-foreground" : hasTask ? "bg-primary/10 text-primary hover:bg-primary/20" : "text-foreground hover:bg-muted"
                }`}
              >
                {day}
                {hasTask && !isToday && <span className="absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-3">
        <h3 className="font-display font-semibold text-foreground">Upcoming Tasks</h3>
        {calendarTasks.map((task, i) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`glass-card p-4 flex items-center gap-4 border-l-4 ${typeColors[task.type]}`}
          >
            <span className="text-2xl">{typeEmoji[task.type]}</span>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-foreground">{task.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{task.field} • {task.date}</p>
            </div>
            <div className="flex items-center gap-1.5">
              {statusIcons[task.status]}
              <span className="text-xs text-muted-foreground capitalize">{task.status}</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Progress */}
      <div className="glass-card p-4">
        <h3 className="font-display font-semibold text-foreground mb-3">This Week's Progress</h3>
        <div className="w-full bg-muted rounded-full h-3">
          <div className="bg-primary h-3 rounded-full transition-all" style={{ width: "25%" }} />
        </div>
        <p className="text-xs text-muted-foreground mt-2">2 of 8 tasks completed</p>
      </div>
    </div>
  );
}
