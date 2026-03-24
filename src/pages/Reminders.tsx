import { useState } from "react";
import { motion } from "framer-motion";
import { Bell, Droplets, Bug, Wheat, FlaskConical, MapPin, Sprout } from "lucide-react";
import { reminders as initialReminders } from "@/lib/mock-data";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const typeIcons: Record<string, React.ReactNode> = {
  fertilizer: <FlaskConical className="w-5 h-5" />,
  water: <Droplets className="w-5 h-5" />,
  pest: <Bug className="w-5 h-5" />,
  harvest: <Wheat className="w-5 h-5" />,
  soil: <Sprout className="w-5 h-5" />,
  market: <MapPin className="w-5 h-5" />,
};

export default function Reminders() {
  const [items, setItems] = useState(initialReminders);
  const { t } = useLanguage();

  const toggle = (id: string) => {
    setItems((prev) => prev.map((r) => (r.id === id ? { ...r, enabled: !r.enabled } : r)));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">{t.remTitle}</h1>
          <p className="text-sm text-muted-foreground mt-1">{t.remSubtitle}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Bell className="w-4 h-4" /> {items.filter((r) => r.enabled).length} {t.remActive}
        </div>
      </div>

      <div className="space-y-3">
        {items.map((reminder, i) => (
          <motion.div
            key={reminder.id}
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className={`glass-card p-4 flex items-center gap-4 transition-opacity ${!reminder.enabled ? "opacity-60" : ""}`}
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              {typeIcons[reminder.type]}
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-sm text-foreground">{reminder.title}</h4>
              <p className="text-xs text-muted-foreground mt-0.5">{reminder.time}</p>
            </div>
            <button
              onClick={() => toggle(reminder.id)}
              className={`relative w-11 h-6 rounded-full transition-colors ${
                reminder.enabled ? "bg-primary" : "bg-muted"
              }`}
            >
              <div
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-card shadow transition-transform ${
                  reminder.enabled ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
