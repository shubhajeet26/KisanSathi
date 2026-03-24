import { motion } from "framer-motion";
import type { ActionAlert } from "@/lib/mock-data";

const levelStyles = {
  safe: "border-l-safe bg-safe/5",
  warning: "border-l-warning bg-warning/5",
  critical: "border-l-critical bg-critical/5",
};

const levelBadge = {
  safe: "bg-safe/15 text-safe",
  warning: "bg-warning/15 text-warning",
  critical: "bg-critical/15 text-critical",
};

interface AlertCardProps {
  alert: ActionAlert;
  index: number;
}

export default function AlertCard({ alert, index }: AlertCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={`rounded-xl border-l-4 p-4 ${levelStyles[alert.level]} transition-shadow hover:shadow-md cursor-pointer`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className="text-2xl flex-shrink-0">{alert.icon}</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="font-semibold text-sm text-foreground">{alert.title}</h4>
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${levelBadge[alert.level]}`}>
                {alert.level.toUpperCase()}
              </span>
            </div>
            <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{alert.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] text-muted-foreground/70">{alert.time}</span>
              <span className="text-[10px] text-muted-foreground/50">•</span>
              <span className="text-[10px] text-muted-foreground/70">{alert.category}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
