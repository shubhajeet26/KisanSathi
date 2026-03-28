import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cloud, Droplets, CloudRain, MapPin, Loader2 } from "lucide-react";
import { weatherData } from "@/lib/mock-data";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function WeatherCard() {
  const { t } = useLanguage();

  const fallbackWeather = {
    ...weatherData,
    rainfall: 0,
  };

  const [currentWeather, setCurrentWeather] = useState(fallbackWeather);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    if (!apiKey) {
      console.warn("OpenWeather API key (VITE_WEATHER_API_KEY) is missing. Using fallback data.");
      return;
    }

    if (!navigator.geolocation) {
      console.warn("Geolocation is not supported by your browser");
      return;
    }

    const fetchWeather = async (lat: number, lon: number) => {
      setLoading(true);
      try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);
        if (!res.ok) throw new Error("Failed to fetch weather data");
        const data = await res.json();
        
        setCurrentWeather({
          location: data.name,
          temperature: Math.round(data.main.temp),
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          rainfall: data.rain ? (data.rain["1h"] || 0) : 0,
          condition: data.weather[0].main,
          forecast: weatherData.forecast, // keep mock forecast
        });
      } catch (err) {
        console.error("OpenWeather API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        fetchWeather(position.coords.latitude, position.coords.longitude);
      },
      (geoError) => {
        console.error("Geolocation Error:", geoError);
      }
    );
  }, []);

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
        <div className="flex items-center justify-between text-primary-foreground/80 text-xs mb-3">
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5" />
            {currentWeather.location || t.farmName}
          </div>
          {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-5xl font-display font-bold">{currentWeather.temperature}°</p>
            <p className="text-sm text-primary-foreground/80 mt-1">{currentWeather.condition || t.weatherCondition}</p>
          </div>
          <div className="space-y-1.5 text-xs text-primary-foreground/70">
            <div className="flex items-center gap-1.5">
              <Droplets className="w-3.5 h-3.5" /> {currentWeather.humidity}%
            </div>
            <div className="flex items-center gap-1.5">
              <CloudRain className="w-3.5 h-3.5" /> {currentWeather.rainfall} mm
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-4 pt-3 border-t border-primary-foreground/15">
          {currentWeather.forecast.map((f) => (
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
