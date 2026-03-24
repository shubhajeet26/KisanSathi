import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, IndianRupee, BarChart3, Wheat } from "lucide-react";
import { cropOptions } from "@/lib/mock-data";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function ProfitEstimator() {
  const { t } = useLanguage();
  const [selectedCrop, setSelectedCrop] = useState(cropOptions[0].value);
  const [landArea, setLandArea] = useState(5);
  const [marketPrice, setMarketPrice] = useState<number>(0);

  const crop = cropOptions.find((c) => c.value === selectedCrop)!;

  // When market price is 0, use the default MSP (pricePerQuintal converted to per-kg)
  const effectiveMarketPricePerKg = marketPrice > 0 ? marketPrice : crop.pricePerQuintal / 100;
  const totalCost = crop.costPerAcre * landArea;
  const totalYield = crop.yieldPerAcre * landArea; // in quintals
  const totalYieldKg = totalYield * 100; // convert to kg
  const totalRevenue = totalYieldKg * effectiveMarketPricePerKg;
  const profit = totalRevenue - totalCost;
  const profitMargin = totalRevenue > 0 ? ((profit / totalRevenue) * 100).toFixed(1) : "0.0";

  // Update market price when crop changes
  const handleCropChange = (value: string) => {
    setSelectedCrop(value);
    setMarketPrice(0);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">{t.profitTitle}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t.profitSubtitle}</p>
      </div>

      {/* Inputs */}
      <div className="glass-card p-5 space-y-5">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">{t.profitCropType}</label>
          <select
            value={selectedCrop}
            onChange={(e) => handleCropChange(e.target.value)}
            className="w-full bg-secondary text-secondary-foreground rounded-xl px-4 py-3 text-sm border-0 focus:ring-2 focus:ring-primary"
          >
            {cropOptions.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">{t.profitLandArea}: {landArea} {t.profitAcres}</label>
          <input
            type="range"
            min={1}
            max={50}
            value={landArea}
            onChange={(e) => setLandArea(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1 {t.profitAcres}</span><span>50 {t.profitAcres}</span>
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">{t.profitMarketPrice}</label>
          <input
            type="number"
            min={0}
            step={0.5}
            value={marketPrice || ""}
            onChange={(e) => setMarketPrice(Number(e.target.value))}
            placeholder={`${t.profitMSP}: ₹${(crop.pricePerQuintal / 100).toFixed(1)}/kg`}
            className="w-full bg-secondary text-secondary-foreground rounded-xl px-4 py-3 text-sm border-0 focus:ring-2 focus:ring-primary placeholder:text-muted-foreground"
          />
          <p className="text-xs text-muted-foreground mt-1">
            {t.profitMSP}: ₹{crop.pricePerQuintal}{t.profitPerQuintal} (₹{(crop.pricePerQuintal / 100).toFixed(1)}/kg)
          </p>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: t.profitTotalCost, value: `₹${totalCost.toLocaleString("en-IN")}`, icon: <IndianRupee className="w-5 h-5" />, color: "text-critical" },
          { label: t.profitExpYield, value: `${totalYield} qtl`, icon: <Wheat className="w-5 h-5" />, color: "text-accent" },
          { label: t.profitEstRevenue, value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: <BarChart3 className="w-5 h-5" />, color: "text-sky" },
          { label: t.profitNetProfit, value: `₹${profit.toLocaleString("en-IN")}`, icon: <TrendingUp className="w-5 h-5" />, color: profit > 0 ? "text-safe" : "text-critical" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 }}
            className="glass-card p-4"
          >
            <div className={`w-10 h-10 rounded-xl bg-muted flex items-center justify-center ${item.color} mb-2`}>{item.icon}</div>
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-lg font-display font-bold text-foreground mt-0.5">{item.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`glass-card-elevated p-5 border-l-4 ${profit > 0 ? "border-l-safe" : "border-l-critical"}`}
      >
        <h3 className="font-display font-semibold text-foreground">{t.profitSummary}</h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          {t.profitGrowing} <strong>{crop.label}</strong> {t.profitOn} <strong>{landArea} {t.profitAcres}</strong> {t.profitCostText}{" "}
          <strong>₹{totalCost.toLocaleString("en-IN")}</strong> {t.profitRevenueText}{" "}
          <strong>₹{totalRevenue.toLocaleString("en-IN")}</strong>, {t.profitOf}{" "}
          <strong className={profit > 0 ? "text-safe" : "text-critical"}>
            {profit > 0 ? t.profitResultProfit : t.profitResultLoss} ₹{Math.abs(profit).toLocaleString("en-IN")}
          </strong>{" "}
          ({profitMargin}% {t.profitMargin}). {t.profitMSP}: ₹{crop.pricePerQuintal}{t.profitPerQuintal}.
        </p>
      </motion.div>
    </div>
  );
}
