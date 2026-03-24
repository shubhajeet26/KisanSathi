import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, IndianRupee, BarChart3, Wheat } from "lucide-react";
import { cropOptions } from "@/lib/mock-data";

export default function ProfitEstimator() {
  const [selectedCrop, setSelectedCrop] = useState(cropOptions[0].value);
  const [landArea, setLandArea] = useState(5);

  const crop = cropOptions.find((c) => c.value === selectedCrop)!;
  const totalCost = crop.costPerAcre * landArea;
  const totalYield = crop.yieldPerAcre * landArea;
  const totalRevenue = totalYield * crop.pricePerQuintal;
  const profit = totalRevenue - totalCost;
  const profitMargin = ((profit / totalRevenue) * 100).toFixed(1);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Profit Estimator 💰</h1>
        <p className="text-sm text-muted-foreground mt-1">Calculate expected returns for your crop</p>
      </div>

      {/* Inputs */}
      <div className="glass-card p-5 space-y-5">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Crop Type</label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            className="w-full bg-secondary text-secondary-foreground rounded-xl px-4 py-3 text-sm border-0 focus:ring-2 focus:ring-primary"
          >
            {cropOptions.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Land Area: {landArea} acres</label>
          <input
            type="range"
            min={1}
            max={50}
            value={landArea}
            onChange={(e) => setLandArea(Number(e.target.value))}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>1 acre</span><span>50 acres</span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: "Total Cost", value: `₹${totalCost.toLocaleString("en-IN")}`, icon: <IndianRupee className="w-5 h-5" />, color: "text-critical" },
          { label: "Expected Yield", value: `${totalYield} qtl`, icon: <Wheat className="w-5 h-5" />, color: "text-accent" },
          { label: "Est. Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: <BarChart3 className="w-5 h-5" />, color: "text-sky" },
          { label: "Net Profit", value: `₹${profit.toLocaleString("en-IN")}`, icon: <TrendingUp className="w-5 h-5" />, color: profit > 0 ? "text-safe" : "text-critical" },
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
        <h3 className="font-display font-semibold text-foreground">Summary</h3>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Growing <strong>{crop.label}</strong> on <strong>{landArea} acres</strong> is estimated to cost{" "}
          <strong>₹{totalCost.toLocaleString("en-IN")}</strong> and generate revenue of{" "}
          <strong>₹{totalRevenue.toLocaleString("en-IN")}</strong>, resulting in a{" "}
          <strong className={profit > 0 ? "text-safe" : "text-critical"}>
            {profit > 0 ? "profit" : "loss"} of ₹{Math.abs(profit).toLocaleString("en-IN")}
          </strong>{" "}
          ({profitMargin}% margin). MSP: ₹{crop.pricePerQuintal}/quintal.
        </p>
      </motion.div>
    </div>
  );
}
