import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, MapPin, Sprout, ChevronRight, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { FarmerProfile } from "@/hooks/useOnboarding";

const CROP_OPTIONS = [
  "Rice", "Wheat", "Cotton", "Sugarcane", "Tomato", "Onion",
  "Potato", "Maize", "Soybean", "Mustard",
];

interface OnboardingFormProps {
  onComplete: (profile: FarmerProfile) => void;
}

export default function OnboardingForm({ onComplete }: OnboardingFormProps) {
  const { t } = useLanguage();
  const [location, setLocation] = useState("");
  const [selectedCrops, setSelectedCrops] = useState<string[]>([]);
  const [locationStatus, setLocationStatus] = useState<"requesting" | "granted" | "denied">("requesting");

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationStatus("denied");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation("Auto-detected Location");
        setLocationStatus("granted");
      },
      (error) => {
        console.warn("Geolocation denied or error:", error);
        setLocationStatus("denied");
      },
      { timeout: 10000 }
    );
  }, []);

  const toggleCrop = (crop: string) => {
    setSelectedCrops((prev) =>
      prev.includes(crop) ? prev.filter((c) => c !== crop) : [...prev, crop]
    );
  };

  const handleSubmit = () => {
    if (location.trim() && selectedCrops.length > 0) {
      onComplete({ location: location.trim(), crops: selectedCrops });
    }
  };

  const isValid = location.trim().length > 0 && selectedCrops.length > 0 && locationStatus !== "requesting";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.4, type: "spring" }}
        className="w-full max-w-md glass-card p-6 md:p-8 space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-14 h-14 rounded-2xl gradient-primary flex items-center justify-center mx-auto"
          >
            <Leaf className="w-7 h-7 text-primary-foreground" />
          </motion.div>
          <h2 className="text-xl font-display font-bold text-foreground">{t.onboardingTitle}</h2>
          <p className="text-sm text-muted-foreground">{t.onboardingSubtitle}</p>
        </div>

        {/* Location Section */}
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5 text-sm font-medium">
            <MapPin className="w-4 h-4 text-primary" />
            {t.onboardingLocation}
          </Label>
          
          {locationStatus === "requesting" && (
            <div className="flex items-center gap-2 p-3 bg-accent/50 rounded-lg border border-border text-sm text-muted-foreground animate-pulse">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              Detecting your location...
            </div>
          )}
          
          {locationStatus === "granted" && (
            <div className="flex items-center gap-2 p-3 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg border border-emerald-500/20 text-sm font-medium">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              Location auto-detected successfully
            </div>
          )}
          
          {locationStatus === "denied" && (
            <Input
              placeholder={t.onboardingLocationPlaceholder}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-11"
            />
          )}
        </div>

        {/* Crop Selection */}
        <div className="space-y-2">
          <Label className="flex items-center gap-1.5 text-sm font-medium">
            <Sprout className="w-4 h-4 text-primary" />
            {t.onboardingCrops}
          </Label>
          <div className="flex flex-wrap gap-2">
            {CROP_OPTIONS.map((crop) => (
              <Badge
                key={crop}
                variant={selectedCrops.includes(crop) ? "default" : "outline"}
                className={`cursor-pointer transition-all text-sm py-1.5 px-3 ${
                  selectedCrops.includes(crop)
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "hover:bg-accent"
                }`}
                onClick={() => toggleCrop(crop)}
              >
                {crop}
              </Badge>
            ))}
          </div>
        </div>

        {/* Submit */}
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className="w-full h-11 gradient-primary text-primary-foreground font-semibold"
        >
          {t.onboardingStart}
          <ChevronRight className="w-4 h-4 ml-1" />
        </Button>
      </motion.div>
    </div>
  );
}
