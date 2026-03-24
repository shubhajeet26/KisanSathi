import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MessageSquare, Droplets, Heart, Thermometer, Zap } from "lucide-react";
import WeatherCard from "@/components/cards/WeatherCard";
import StatCard from "@/components/cards/StatCard";
import AlertCard from "@/components/cards/AlertCard";
import { actionAlerts, quickStats } from "@/lib/mock-data";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function Dashboard() {
  const { t } = useLanguage();

  const statLabels = {
    soilMoisture: t.statSoilMoisture,
    cropHealth: t.statCropHealth,
    waterUsage: t.statWaterUsage,
    temperature: t.statTemperature,
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">{t.dashGreeting}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t.dashSubtitle}</p>
      </div>

      <WeatherCard />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard label={statLabels.soilMoisture} value={quickStats.soilMoisture.value} unit={quickStats.soilMoisture.unit} status={quickStats.soilMoisture.status} icon={<Droplets className="w-5 h-5" />} delay={0.1} />
        <StatCard label={statLabels.cropHealth} value={quickStats.cropHealth.value} unit={quickStats.cropHealth.unit} status={quickStats.cropHealth.status} icon={<Heart className="w-5 h-5" />} delay={0.15} />
        <StatCard label={statLabels.waterUsage} value={quickStats.waterUsage.value} unit={quickStats.waterUsage.unit} status={quickStats.waterUsage.status} icon={<Zap className="w-5 h-5" />} delay={0.2} />
        <StatCard label={statLabels.temperature} value={quickStats.temperature.value} unit={quickStats.temperature.unit} status={quickStats.temperature.status} icon={<Thermometer className="w-5 h-5" />} delay={0.25} />
      </div>

      <div>
        <h2 className="text-lg font-display font-semibold text-foreground mb-3">{t.dashActionFeed}</h2>
        <div className="space-y-3">
          {actionAlerts.map((alert, i) => (
            <AlertCard key={alert.id} alert={alert} index={i} />
          ))}
        </div>
      </div>

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
