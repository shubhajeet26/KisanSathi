import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Droplets, FlaskConical, Thermometer, Sprout } from "lucide-react";
import { soilSuggestions } from "@/lib/mock-data";

export default function SoilHealth() {
  const [ph, setPh] = useState(6.8);
  const [moisture, setMoisture] = useState(42);

  const phCategory = useMemo(() => {
    if (ph < 5.5) return "acidic";
    if (ph > 7.5) return "alkaline";
    return "neutral";
  }, [ph]);

  const moistureStatus = useMemo(() => {
    if (moisture < 25) return { label: "Low", color: "text-critical", bg: "bg-critical" };
    if (moisture > 60) return { label: "High", color: "text-warning", bg: "bg-warning" };
    return { label: "Optimal", color: "text-safe", bg: "bg-safe" };
  }, [moisture]);

  const soil = soilSuggestions[phCategory];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Soil Health 🌱</h1>
        <p className="text-sm text-muted-foreground mt-1">Analyze and improve your soil conditions</p>
      </div>

      {/* Inputs */}
      <div className="glass-card p-5 space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-primary" /> Soil pH
            </label>
            <span className="text-sm font-display font-bold text-foreground">{ph.toFixed(1)}</span>
          </div>
          <input type="range" min={3} max={10} step={0.1} value={ph} onChange={(e) => setPh(Number(e.target.value))} className="w-full accent-primary" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>3.0 (Acidic)</span><span>7.0 (Neutral)</span><span>10.0 (Alkaline)</span>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-foreground flex items-center gap-2">
              <Droplets className="w-4 h-4 text-sky" /> Soil Moisture
            </label>
            <span className="text-sm font-display font-bold text-foreground">{moisture}%</span>
          </div>
          <input type="range" min={0} max={100} value={moisture} onChange={(e) => setMoisture(Number(e.target.value))} className="w-full accent-sky" />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>0% (Dry)</span><span>100% (Saturated)</span>
          </div>
        </div>
      </div>

      {/* Visual Indicators */}
      <div className="grid grid-cols-2 gap-3">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`glass-card p-4 border-l-4 ${soil.color === "safe" ? "border-l-safe" : soil.color === "warning" ? "border-l-warning" : "border-l-critical"}`}>
          <div className="flex items-center gap-2 mb-1">
            <FlaskConical className="w-4 h-4 text-primary" />
            <span className="text-xs text-muted-foreground">pH Status</span>
          </div>
          <p className={`font-display font-bold text-sm ${soil.color === "safe" ? "text-safe" : soil.color === "warning" ? "text-warning" : "text-critical"}`}>{soil.status}</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className={`glass-card p-4 border-l-4 ${moistureStatus.color === "text-safe" ? "border-l-safe" : moistureStatus.color === "text-warning" ? "border-l-warning" : "border-l-critical"}`}>
          <div className="flex items-center gap-2 mb-1">
            <Droplets className="w-4 h-4 text-sky" />
            <span className="text-xs text-muted-foreground">Moisture</span>
          </div>
          <p className={`font-display font-bold text-sm ${moistureStatus.color}`}>{moistureStatus.label} ({moisture}%)</p>
        </motion.div>
      </div>

      {/* Suggestions */}
      <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card p-5">
        <h3 className="font-display font-semibold text-foreground mb-3 flex items-center gap-2">
          <Sprout className="w-5 h-5 text-primary" /> Recommendations
        </h3>
        <ul className="space-y-2.5">
          {soil.suggestions.map((s, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
              {s}
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
}
