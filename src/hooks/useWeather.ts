import { useEffect, useState } from "react";

export const useWeather = (lat: number, lon: number) => {
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    if (!lat || !lon) return;

    const fetchWeather = async () => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}&units=metric`
        );

        const data = await res.json();
        setWeather(data);
      } catch (err) {
        console.error("Weather fetch error:", err);
      }
    };

    fetchWeather();
  }, [lat, lon]);

  return weather;
};