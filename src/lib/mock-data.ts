export const weatherData = {
  location: "Nashik, Maharashtra",
  temperature: 32,
  humidity: 68,
  windSpeed: 12,
  condition: "Partly Cloudy",
  forecast: [
    { day: "Mon", temp: 32, icon: "☀️" },
    { day: "Tue", temp: 30, icon: "⛅" },
    { day: "Wed", temp: 28, icon: "🌧️" },
    { day: "Thu", temp: 29, icon: "⛅" },
    { day: "Fri", temp: 31, icon: "☀️" },
  ],
};

export type AlertLevel = "safe" | "warning" | "critical";

export interface ActionAlert {
  id: string;
  title: string;
  description: string;
  level: AlertLevel;
  time: string;
  icon: string;
  category: string;
}

export const actionAlerts: ActionAlert[] = [
  { id: "1", title: "Heavy Rainfall Expected", description: "Postpone fertilizer application. Rain expected in next 6 hours with 45mm precipitation.", level: "critical", time: "2 min ago", icon: "🌧️", category: "Weather" },
  { id: "2", title: "Pest Alert: Aphids Detected", description: "Neighboring farms report aphid infestation. Apply neem oil spray as preventive measure.", level: "warning", time: "15 min ago", icon: "🐛", category: "Pest Control" },
  { id: "3", title: "Optimal Sowing Window", description: "Soil moisture at 42% — ideal for wheat sowing. Temperature and humidity are favorable.", level: "safe", time: "1 hour ago", icon: "🌱", category: "Sowing" },
  { id: "4", title: "Irrigation Needed", description: "Soil moisture dropped below 30% in Block B. Schedule drip irrigation within 12 hours.", level: "warning", time: "2 hours ago", icon: "💧", category: "Irrigation" },
  { id: "5", title: "Market Price Update", description: "Tomato prices rose 15% at Nashik APMC. Good time to sell current harvest.", level: "safe", time: "3 hours ago", icon: "📈", category: "Market" },
  { id: "6", title: "Frost Warning", description: "Temperature may drop to 4°C tonight. Cover young saplings and sensitive crops.", level: "critical", time: "4 hours ago", icon: "❄️", category: "Weather" },
  { id: "7", title: "Fertilizer Schedule", description: "NPK 10:26:26 application due for wheat crop in Field A. Apply early morning.", level: "safe", time: "5 hours ago", icon: "🧪", category: "Nutrients" },
  { id: "8", title: "Harvest Ready", description: "Onion crop in Block C has reached maturity. Plan harvest within 5 days.", level: "safe", time: "6 hours ago", icon: "🧅", category: "Harvest" },
];

export const quickStats = {
  soilMoisture: { value: 42, unit: "%", status: "good" as const, label: "Soil Moisture" },
  cropHealth: { value: 87, unit: "%", status: "good" as const, label: "Crop Health" },
  waterUsage: { value: 2400, unit: "L", status: "average" as const, label: "Water Usage" },
  temperature: { value: 32, unit: "°C", status: "average" as const, label: "Temperature" },
};

export const calendarTasks = [
  { id: "1", title: "Sow Wheat Seeds", date: "2026-03-24", type: "sowing" as const, status: "completed" as const, field: "Field A" },
  { id: "2", title: "Apply NPK Fertilizer", date: "2026-03-25", type: "fertilizing" as const, status: "pending" as const, field: "Field A" },
  { id: "3", title: "Drip Irrigation Check", date: "2026-03-25", type: "irrigation" as const, status: "pending" as const, field: "Block B" },
  { id: "4", title: "Pest Inspection", date: "2026-03-26", type: "inspection" as const, status: "upcoming" as const, field: "All Fields" },
  { id: "5", title: "Harvest Onions", date: "2026-03-28", type: "harvest" as const, status: "upcoming" as const, field: "Block C" },
  { id: "6", title: "Soil Testing", date: "2026-03-29", type: "inspection" as const, status: "upcoming" as const, field: "Field A" },
  { id: "7", title: "Spray Neem Oil", date: "2026-03-30", type: "fertilizing" as const, status: "upcoming" as const, field: "Block B" },
  { id: "8", title: "Market Visit", date: "2026-04-01", type: "harvest" as const, status: "upcoming" as const, field: "APMC Nashik" },
];

export const diseaseResults = {
  name: "Late Blight (Phytophthora infestans)",
  confidence: 94,
  risk: "critical" as AlertLevel,
  description: "Fungal disease causing brown/black lesions on leaves and stems. Spreads rapidly in humid conditions.",
  suggestions: [
    "Apply Mancozeb 75% WP @ 2.5g/L immediately",
    "Remove and destroy infected plant parts",
    "Improve air circulation between plants",
    "Avoid overhead irrigation",
    "Monitor neighboring plants for 2 weeks",
  ],
};

export const cropOptions = [
  { value: "rice", label: "Rice (Paddy)", costPerAcre: 18000, yieldPerAcre: 25, pricePerQuintal: 2040 },
  { value: "wheat", label: "Wheat", costPerAcre: 15000, yieldPerAcre: 20, pricePerQuintal: 2125 },
  { value: "cotton", label: "Cotton", costPerAcre: 22000, yieldPerAcre: 8, pricePerQuintal: 6080 },
  { value: "sugarcane", label: "Sugarcane", costPerAcre: 35000, yieldPerAcre: 350, pricePerQuintal: 315 },
  { value: "tomato", label: "Tomato", costPerAcre: 45000, yieldPerAcre: 120, pricePerQuintal: 1200 },
  { value: "onion", label: "Onion", costPerAcre: 30000, yieldPerAcre: 100, pricePerQuintal: 1800 },
];

export const reminders = [
  { id: "1", title: "Apply Fertilizer – Field A", time: "Tomorrow, 6:00 AM", enabled: true, type: "fertilizer" },
  { id: "2", title: "Irrigation Check – Block B", time: "Tomorrow, 8:00 AM", enabled: true, type: "water" },
  { id: "3", title: "Pest Spray – Block B", time: "Mar 26, 7:00 AM", enabled: false, type: "pest" },
  { id: "4", title: "Harvest Onions – Block C", time: "Mar 28, 6:00 AM", enabled: true, type: "harvest" },
  { id: "5", title: "Soil Test Collection", time: "Mar 29, 10:00 AM", enabled: true, type: "soil" },
  { id: "6", title: "Market Visit – APMC", time: "Apr 1, 8:00 AM", enabled: false, type: "market" },
];

export const soilSuggestions: Record<string, { status: string; color: string; suggestions: string[] }> = {
  acidic: { status: "Acidic Soil", color: "critical", suggestions: ["Apply agricultural lime (2-4 tons/acre)", "Add wood ash to increase pH", "Use comite organic matter", "Test again after 3 months"] },
  neutral: { status: "Neutral Soil (Ideal)", color: "safe", suggestions: ["Maintain current practices", "Add organic compost regularly", "Rotate crops seasonally", "Monitor moisture levels"] },
  alkaline: { status: "Alkaline Soil", color: "warning", suggestions: ["Add elemental sulfur", "Use acidifying fertilizers (ammonium sulfate)", "Increase organic matter", "Consider gypsum application"] },
};

export const chatExamples = [
  "When should I sow wheat this season?",
  "My tomato leaves are turning yellow. What should I do?",
  "What fertilizer is best for rice crop?",
  "Is it safe to irrigate before the rain?",
  "How can I improve my soil health?",
  "What's the best crop for sandy soil?",
];
