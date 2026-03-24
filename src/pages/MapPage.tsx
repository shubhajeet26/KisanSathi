import { motion } from "framer-motion";
import { MapPin, Cloud, Thermometer, Droplets, Layers } from "lucide-react";

export default function MapPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Farm Map 🗺️</h1>
        <p className="text-sm text-muted-foreground mt-1">View your farm location and weather zones</p>
      </div>

      {/* Map Placeholder */}
      <div className="glass-card relative overflow-hidden rounded-2xl" style={{ height: "400px" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-safe/20 via-primary/10 to-sky/20" />
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(hsl(var(--border)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          opacity: 0.4,
        }} />

        {/* Farm marker */}
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
        >
          <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center shadow-lg">
            <MapPin className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="mt-2 glass-card-elevated px-3 py-1.5 text-xs font-medium text-foreground whitespace-nowrap">
            Your Farm — Nashik
          </div>
          <div className="w-4 h-4 bg-primary/30 rounded-full mt-1 animate-pulse-soft" />
        </motion.div>

        {/* Weather zones */}
        <div className="absolute top-4 right-4 bg-safe/20 border border-safe/30 rounded-full px-3 py-1 text-xs text-safe font-medium backdrop-blur-sm">
          ☀️ Clear Zone
        </div>
        <div className="absolute bottom-16 left-4 bg-sky/20 border border-sky/30 rounded-full px-3 py-1 text-xs text-sky font-medium backdrop-blur-sm">
          🌧️ Rain Expected
        </div>
        <div className="absolute top-20 left-8 bg-warning/20 border border-warning/30 rounded-full px-3 py-1 text-xs text-warning font-medium backdrop-blur-sm">
          ⚠️ High Wind Area
        </div>

        {/* Scale */}
        <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs text-muted-foreground">
          <div className="w-16 h-0.5 bg-muted-foreground/40" />
          1 km
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { icon: <Layers className="w-5 h-5" />, label: "Total Area", value: "12.5 acres" },
          { icon: <Cloud className="w-5 h-5" />, label: "Weather Zone", value: "Semi-arid" },
          { icon: <Thermometer className="w-5 h-5" />, label: "Avg. Temp", value: "32°C" },
          { icon: <Droplets className="w-5 h-5" />, label: "Rainfall", value: "650mm/yr" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * i }}
            className="glass-card p-4 flex flex-col items-center text-center gap-2"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">{item.icon}</div>
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="font-display font-bold text-foreground text-sm">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Legend */}
      <div className="glass-card p-4">
        <h3 className="font-display font-semibold text-foreground text-sm mb-3">Map Legend</h3>
        <div className="flex flex-wrap gap-4">
          {[
            { color: "bg-safe", label: "Healthy Zone" },
            { color: "bg-warning", label: "Attention Needed" },
            { color: "bg-critical", label: "High Risk" },
            { color: "bg-sky", label: "Water/Rain Zone" },
          ].map((l) => (
            <div key={l.label} className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${l.color}`} />
              <span className="text-xs text-muted-foreground">{l.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
