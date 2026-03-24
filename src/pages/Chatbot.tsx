import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Mic, Sparkles, MapPin, Leaf } from "lucide-react";
import { chatExamples } from "@/lib/mock-data";
import { useLanguage } from "@/lib/i18n/LanguageContext";

interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  time: string;
}

const aiResponses: Record<string, string> = {
  default: "Based on your farm's current conditions in Nashik — soil moisture at 42%, temperature 32°C — I'd recommend focusing on maintaining irrigation schedules. The weather forecast shows rain on Wednesday which will help. Would you like specific advice for your wheat or onion crops?",
  wheat: "For wheat sowing in your region, the ideal window is mid-November to mid-December. Current soil moisture of 42% is perfect. Make sure to use certified HD-2967 or WH-1105 varieties suited for Maharashtra. Seed rate: 40-50 kg/acre with row spacing of 20-22.5 cm.",
  yellow: "Yellow leaves on tomato plants can indicate several issues: 1) Nitrogen deficiency — apply urea @ 50kg/acre, 2) Overwatering — check drainage, 3) Early blight — apply Mancozeb spray. Given the current humidity of 68%, I'd suspect fungal infection. Can you upload a photo for better diagnosis?",
  fertilizer: "For rice cultivation in your region, I recommend: Basal dose: DAP 50kg + MOP 30kg/acre. First top dressing (21 days): Urea 25kg/acre. Second top dressing (42 days): Urea 25kg/acre. Also apply Zinc Sulphate 10kg/acre as your soil shows zinc deficiency.",
};

export default function Chatbot() {
  const { t } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Reset greeting when language changes
  useEffect(() => {
    setMessages([
      { id: "1", text: t.chatGreeting, sender: "ai", time: "Now" },
    ]);
  }, [t.chatGreeting]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const getAiResponse = (text: string): string => {
    const lower = text.toLowerCase();
    if (lower.includes("wheat") || lower.includes("sow")) return aiResponses.wheat;
    if (lower.includes("yellow") || lower.includes("leaves")) return aiResponses.yellow;
    if (lower.includes("fertilizer") || lower.includes("rice")) return aiResponses.fertilizer;
    return aiResponses.default;
  };

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), text, sender: "user", time: "Now" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: (Date.now() + 1).toString(), text: getAiResponse(text), sender: "ai", time: "Now" }]);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col h-[calc(100vh-8rem)] lg:h-[calc(100vh-5rem)]">
      <div className="glass-card p-4 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h2 className="font-display font-semibold text-foreground">{t.chatTitle}</h2>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="w-3 h-3" /> {t.farmName} • <Leaf className="w-3 h-3" /> {t.farmCrops}
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 px-1 pb-2">
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
                msg.sender === "user"
                  ? "gradient-primary text-primary-foreground rounded-br-md"
                  : "glass-card text-foreground rounded-bl-md"
              }`}>
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
            <div className="glass-card px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1.5">
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse-soft" />
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse-soft" style={{ animationDelay: "0.2s" }} />
              <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse-soft" style={{ animationDelay: "0.4s" }} />
            </div>
          </motion.div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length <= 1 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {chatExamples.map((ex) => (
            <button
              key={ex}
              onClick={() => sendMessage(ex)}
              className="text-xs bg-secondary text-secondary-foreground px-3 py-1.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>
      )}

      <div className="glass-card p-3 flex items-center gap-2">
        <button
          onClick={() => setIsRecording(!isRecording)}
          className={`p-2.5 rounded-full transition-colors flex-shrink-0 ${
            isRecording ? "bg-critical text-destructive-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"
          }`}
        >
          <Mic className="w-5 h-5" />
        </button>
        {isRecording ? (
          <div className="flex-1 flex items-center justify-center gap-1 py-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1 bg-critical rounded-full animate-waveform" style={{ animationDelay: `${i * 0.1}s` }} />
            ))}
            <span className="text-xs text-muted-foreground ml-3">{t.chatListening}</span>
          </div>
        ) : (
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder={t.chatPlaceholder}
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
          />
        )}
        <button
          onClick={() => sendMessage(input)}
          disabled={!input.trim() || isRecording}
          className="p-2.5 rounded-full gradient-primary text-primary-foreground disabled:opacity-40 flex-shrink-0 transition-opacity"
        >
          <Send className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
