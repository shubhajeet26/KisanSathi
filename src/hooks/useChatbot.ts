import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  time: string;
}

// Rule-based categories and their keywords
const INTENT_RULES = [
  {
    category: "disease",
    keywords: ["disease", "pest", "yellow", "spots", "wilt", "blight", "rot", "insects", "aphids", "bugs", "worms", "fungus"],
    responses: [
      "For pest and disease issues, it's best to act fast. If you notice yellowing or spots, consider applying Neem oil spray as a first organic defense. If it's a severe fungal issue like blight, Mancozeb can be effective.",
      "Check the underside of leaves for aphids or insects. Removing heavily infected plants helps stop the spread. A generic garlic and chilly extract spray works great for early pest control.",
      "Ensure proper spacing between crops to improve air circulation, which prevents fungal diseases. If you suspect pests, installing yellow sticky traps can help monitor the infestation level.",
    ],
  },
  {
    category: "fertilizer",
    keywords: ["fertilizer", "urea", "dap", "npk", "compost", "manure", "nutrition", "grow", "yield", "nutrient"],
    responses: [
      "A balanced NPK fertilizer is crucial during the early growth stage. For better yields, consider adding organic compost or farmyard manure to improve overall soil structure.",
      "Don't over-apply Urea as excessive nitrogen can make plants susceptible to pests. Split your nitrogen application into two or three doses for maximum root efficiency.",
      "Applying micronutrients like Zinc or Boron can significantly improve crop health. Always do a soil test before major fertilizer applications to avoid degrading the soil balance.",
    ],
  },
  {
    category: "irrigation",
    keywords: ["water", "irrigation", "dry", "moisture", "drip", "sprinkler", "rain", "drought"],
    responses: [
      "Maintain consistent soil moisture. Drip irrigation is highly recommended to save water and prevent weed growth. Avoid waterlogging as it restricts root oxygen.",
      "Water crops early in the morning or late in the evening to minimize evaporation losses. If the soil feels powdery 2 inches below the surface, it's time to irrigate.",
      "Overwatering can lead to immediate root rot. Ensure your field has proper drainage channels dug out, especially leading into the monsoon season.",
    ],
  },
  {
    category: "soil",
    keywords: ["soil", "ph", "health", "acidic", "alkaline", "sand", "clay", "loam", "earth"],
    responses: [
      "Healthy soil makes healthy crops. If your soil is too acidic, applying agricultural lime helps. If it's heavily alkaline, adding organic matter or gypsum can balance the pH.",
      "Crop rotation and planting legumes (like moong or soybean) naturally replenishes soil nitrogen. Avoid leaving the soil completely bare to prevent topsoil erosion.",
      "Adding vermicompost increases the water-holding capacity of sandy soils and substantially improves drainage in heavy clay soils.",
    ],
  },
  {
    category: "weather",
    keywords: ["weather", "temperature", "cold", "frost", "heat", "hot", "sun", "cloud", "monsoon", "climate"],
    responses: [
      "Extreme temperatures stress plants. During intense heat, light frequent irrigation prevents wilting. In case of frost, cover sensitive crops or maintain light soil moisture overnight.",
      "Always keep an eye on the local forecast! Delay synthetic fertilizer application if heavy rain is expected within 24 hours to prevent chemical runoff.",
      "High humidity combined with warm temperatures is the ultimate breeding ground for fungal diseases. Keep a preventive fungicide ready during such rapid weather shifts.",
    ],
  }
];

const FALLBACK_RESPONSE = "I’m here to help with farming advice. Please provide more details about your issue.";

const getRandomResponse = (responses: string[]) => responses[Math.floor(Math.random() * responses.length)];

const intents = {
  irrigation: ["water", "irrigation", "dry", "watering"],
  disease: ["yellow", "spots", "disease", "infection"],
  fertilizer: ["fertilizer", "urea", "nutrient", "compost"],
  weather: ["rain", "temperature", "climate", "weather"],
  pest: ["insect", "pest", "bugs", "worms"]
};

const detectIntent = (message: string) => {
  message = message.toLowerCase();

  for (let key in intents) {
    if (intents[key].some(word => message.includes(word))) {
      return key;
    }
  }
  return "fallback";
};

const responses = {
  irrigation: [
    "💧 Ensure proper irrigation but avoid overwatering.",
    "💧 Water crops early morning or evening.",
    "💧 Check soil moisture before irrigating."
  ],
  disease: [
    "🌱 Yellow leaves may indicate nitrogen deficiency.",
    "🌱 This could be a fungal infection. Consider pesticide use.",
    "🌱 Inspect leaves for spots or unusual patterns."
  ],
  fertilizer: [
    "🌾 Use nitrogen-rich fertilizers like urea.",
    "🌾 Organic compost improves soil health.",
    "🌾 Apply fertilizer based on soil condition."
  ],
  weather: [
    "🌦️ Monitor rainfall before planning irrigation.",
    "🌦️ Avoid farming activities during extreme heat.",
    "🌦️ Check weather forecasts regularly."
  ],
  pest: [
    "🐛 Use eco-friendly pesticides like neem oil.",
    "🐛 Regularly inspect crops for pest attacks.",
    "🐛 Maintain field hygiene to prevent infestation."
  ],
  fallback: [
    "🤖 I can help with crops, irrigation, pests, and fertilizers.",
    "🤖 Please provide more details about your farming issue.",
    "🤖 Try asking about crop health or weather conditions."
  ]
};

export function useChatbot() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setMessages([
      { id: "1", text: t.chatGreeting, sender: "ai", time: "Now" },
    ]);
  }, [t.chatGreeting]);

  const generateOfflineResponse = (text: string): string => {
    const lowerText = text.toLowerCase();
    
    // Scan through all rules to find matching keywords
    const matchedRule = INTENT_RULES.find((rule) => 
      rule.keywords.some((keyword) => lowerText.includes(keyword))
    );

    if (matchedRule) {
      return getRandomResponse(matchedRule.responses);
    }
    
    // If no intents match intelligently, supply the fallback
    return FALLBACK_RESPONSE;
  };

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text, sender: "user", time: "Now" };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    // Provide a smooth typing delay so it feels conversational and UI has time to auto-scroll
    setTimeout(() => {
      setIsTyping(false);
      //const reply = generateOfflineResponse(text);
      const intent = detectIntent(text);
      const replyList = responses[intent] || responses["fallback"];  
      const reply = replyList[Math.floor(Math.random() * replyList.length)];
      setMessages((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), text: reply, sender: "ai", time: "Now" }
      ]);
    }, 1500);
  };

  return {
    messages,
    isTyping,
    sendMessage,
  };
}
