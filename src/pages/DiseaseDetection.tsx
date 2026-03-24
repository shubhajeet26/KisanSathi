import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, AlertTriangle, CheckCircle2, XCircle, Leaf } from "lucide-react";
import { diseaseResults } from "@/lib/mock-data";

export default function DiseaseDetection() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      setResult(false);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  }, []);

  const analyze = () => {
    setAnalyzing(true);
    setTimeout(() => {
      setAnalyzing(false);
      setResult(true);
    }, 2500);
  };

  const riskIcon = { safe: <CheckCircle2 className="w-5 h-5 text-safe" />, warning: <AlertTriangle className="w-5 h-5 text-warning" />, critical: <XCircle className="w-5 h-5 text-critical" /> };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">Disease Detection 📸</h1>
        <p className="text-sm text-muted-foreground mt-1">Upload a photo of your crop to detect diseases</p>
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`glass-card border-2 border-dashed p-8 text-center transition-colors cursor-pointer ${
          dragOver ? "border-primary bg-primary/5" : "border-border"
        }`}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
        {image ? (
          <div className="space-y-4">
            <img src={image} alt="Uploaded crop" className="max-h-64 mx-auto rounded-xl object-cover" />
            <p className="text-xs text-muted-foreground">Click to change image</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Camera className="w-8 h-8 text-primary" />
            </div>
            <p className="font-medium text-foreground">Drop image here or click to upload</p>
            <p className="text-xs text-muted-foreground">Supports JPG, PNG up to 10MB</p>
          </div>
        )}
      </div>

      {image && !result && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={analyze}
          disabled={analyzing}
          className="w-full py-3 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm disabled:opacity-60 flex items-center justify-center gap-2"
        >
          {analyzing ? (
            <>
              <Leaf className="w-5 h-5 animate-spin" /> Analyzing...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" /> Analyze Image
            </>
          )}
        </motion.button>
      )}

      {/* Results */}
      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="glass-card-elevated p-5 border-l-4 border-l-critical">
              <div className="flex items-start gap-3">
                {riskIcon[diseaseResults.risk]}
                <div className="flex-1">
                  <h3 className="font-display font-semibold text-foreground">{diseaseResults.name}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{diseaseResults.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="bg-critical/10 text-critical text-xs font-semibold px-2.5 py-0.5 rounded-full">
                      {diseaseResults.risk.toUpperCase()} RISK
                    </div>
                    <span className="text-xs text-muted-foreground">{diseaseResults.confidence}% confidence</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-foreground mb-3">Recommended Actions</h3>
              <ul className="space-y-2.5">
                {diseaseResults.suggestions.map((s, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                    <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
