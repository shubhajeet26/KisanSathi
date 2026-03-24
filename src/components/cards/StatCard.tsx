import { motion } from "framer-motion";

interface StatCardProps {
  label: string;
  value: number | string;
  unit: string;
  status: "good" | "average" | "poor";
  icon: React.ReactNode;
  delay?: number;
}

const statusColors = {
  good: "text-safe",
  average: "text-warning",
  poor: "text-critical",
};

export default function StatCard({ label, value, unit, status, icon, delay = 0 }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="glass-card p-4 flex items-center gap-4"
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center bg-primary/10 ${statusColors[status]}`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-muted-foreground truncate">{label}</p>
        <p className="text-xl font-display font-bold text-foreground">
          {value}
          <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>
        </p>
      </div>
    </motion.div>
  );
}
