import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, Droplets, Heart, Thermometer, Zap } from "lucide-react";
import WeatherCard from "@/components/cards/WeatherCard";
import StatCard from "@/components/cards/StatCard";
import AlertCard from "@/components/cards/AlertCard";
import { actionAlerts, quickStats } from "@/lib/mock-data";

export default function Dashboard() {
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Good Morning! 🌾</h1>
        <p className="text-sm text-muted-foreground mt-1">Here's what's happening on your farm today</p>
      </div>

      {/* Weather */}
      <WeatherCard />

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label={quickStats.soilMoisture.label} value={quickStats.soilMoisture.value} unit={quickStats.soilMoisture.unit} status={quickStats.soilMoisture.status} icon={<Droplets className="w-5 h-5" />} delay={0.1} />
        <StatCard label={quickStats.cropHealth.label} value={quickStats.cropHealth.value} unit={quickStats.cropHealth.unit} status={quickStats.cropHealth.status} icon={<Heart className="w-5 h-5" />} delay={0.15} />
        <StatCard label={quickStats.waterUsage.label} value={quickStats.waterUsage.value} unit={quickStats.waterUsage.unit} status={quickStats.waterUsage.status} icon={<Zap className="w-5 h-5" />} delay={0.2} />
        <StatCard label={quickStats.temperature.label} value={quickStats.temperature.value} unit={quickStats.temperature.unit} status={quickStats.temperature.status} icon={<Thermometer className="w-5 h-5" />} delay={0.25} />
      </div>

      {/* Action Feed */}
      <div>
        <h2 className="text-lg font-display font-semibold text-foreground mb-3">🚨 Action Feed</h2>
        <div className="space-y-3">
          {actionAlerts.map((alert, i) => (
            <AlertCard key={alert.id} alert={alert} index={i} />
          ))}
        </div>
      </div>

      {/* FAB */}
      <Link to="/chatbot">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-24 lg:bottom-8 right-6 w-14 h-14 rounded-full gradient-primary shadow-lg flex items-center justify-center z-30 cursor-pointer"
        >
          <MessageSquare className="w-6 h-6 text-primary-foreground" />
        </motion.div>
      </Link>
    </div>
  );
}
