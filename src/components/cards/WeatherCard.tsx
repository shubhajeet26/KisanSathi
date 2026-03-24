import { motion } from "framer-motion";
import { Cloud, Droplets, Wind, MapPin } from "lucide-react";
import { weatherData } from "@/lib/mock-data";

export default function WeatherCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl p-5 bg-gradient-to-br from-primary to-primary/70 text-primary-foreground relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-foreground/5 rounded-full -translate-y-8 translate-x-8" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary-foreground/5 rounded-full translate-y-8 -translate-x-8" />

      <div className="relative z-10">
        <div className="flex items-center gap-1.5 text-primary-foreground/80 text-xs mb-3">
          <MapPin className="w-3.5 h-3.5" />
          {weatherData.location}
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-5xl font-display font-bold">{weatherData.temperature}°</p>
            <p className="text-sm text-primary-foreground/80 mt-1">{weatherData.condition}</p>
          </div>
          <div className="space-y-1.5 text-xs text-primary-foreground/70">
            <div className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5" /> {weatherData.humidity}%
            </div>
            <div className="flex items-center gap-1.5">
              <Wind className="w-3.5 h-3.5" /> {weatherData.windSpeed} km/h
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-primary-foreground/15">
          {weatherData.forecast.map((f) => (
            <div key={f.day} className="flex flex-col items-center gap-1 flex-1">
              <span className="text-[10px] text-primary-foreground/60">{f.day}</span>
              <span className="text-base">{f.icon}</span>
              <span className="text-xs font-medium">{f.temp}°</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
