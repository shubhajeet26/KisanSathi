import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Camera, AlertTriangle, CheckCircle2, XCircle, Leaf } from "lucide-react";
import { diseaseResults } from "@/lib/mock-data";
import { useLanguage } from "@/lib/i18n/LanguageContext";

export default function DiseaseDetection() {
  const [image, setImage] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  // const [result, setResult] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [dragOver, setDragOver] = useState(false);
  const [processStep, setProcessStep] = useState(0);
  const { t } = useLanguage();

  const processingSteps = [
    "Extracting leaf features...",
    "Matching pathogen database...",
    "Generating treatment plan...",
  ];

  const handleFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setImage(e.target?.result as string);
      // setResult(false);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) handleFile(file);
  }, []);

  // const analyze = () => {
  //   setAnalyzing(true);
  //   setProcessStep(0);
  //   setResult(false);

  //   const interval = setInterval(() => {
  //     setProcessStep((prev) => Math.min(prev + 1, processingSteps.length - 1));
  //   }, 1000);

  //   setTimeout(() => {
  //     clearInterval(interval);
  //     setAnalyzing(false);
  //     setResult(true);
  //   }, 3000);
  // };


  const analyze = () => {
    setAnalyzing(true);
    setProcessStep(0);
    setResult(null);

    setTimeout(() => setProcessStep(1), 700);
    setTimeout(() => setProcessStep(2), 1400);
    setTimeout(() => setProcessStep(3), 2000);

    setTimeout(() => {
      const diseases = [
        {
          name: "Leaf Blight",
          confidence: "92%",
          solution: "Use copper-based fungicide and remove infected leaves."
        },
        {
          name: "Powdery Mildew",
          confidence: "87%",
          solution: "Apply sulfur spray and improve air circulation."
        },
        {
          name: "Nitrogen Deficiency",
          confidence: "89%",
          solution: "Apply nitrogen-rich fertilizer like urea."
        },
        {
          name: "Leaf Spot",
          confidence: "90%",
          solution: "Use neem oil spray and remove affected leaves."
        }
      ];

      const result = diseases[Math.floor(Math.random() * diseases.length)];

      setResult(result);
      setAnalyzing(false);
    }, 2500);
  };

  const riskIcon = { safe: <CheckCircle2 className="w-5 h-5 text-safe" />, warning: <AlertTriangle className="w-5 h-5 text-warning" />, critical: <XCircle className="w-5 h-5 text-critical" /> };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-display font-bold text-foreground">{t.diseaseTitle}</h1>
        <p className="text-sm text-muted-foreground mt-1">{t.diseaseSubtitle}</p>
      </div>

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
            <div className="relative inline-block mx-auto rounded-xl overflow-hidden shadow-lg border border-border">
              <img src={image} alt="Uploaded crop" className="max-h-64 object-cover" />
              {analyzing && (
                <motion.div
                  initial={{ top: "-5%" }}
                  animate={{ top: "105%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-1 bg-primary shadow-[0_0_20px_rgba(var(--primary),1)] z-10"
                />
              )}
              {analyzing && (
                <div className="absolute inset-0 bg-primary/10 animate-pulse mix-blend-overlay" />
              )}
            </div>
            <p className="text-xs text-muted-foreground">{t.diseaseChangeImg}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
              <Camera className="w-8 h-8 text-primary" />
            </div>
            <p className="font-medium text-foreground">{t.diseaseDropText}</p>
            <p className="text-xs text-muted-foreground">{t.diseaseSupport}</p>
          </div>
        )}
      </div>

      {image && !result && (
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={analyze}
          disabled={analyzing}
          className="w-full py-4 rounded-xl gradient-primary text-primary-foreground font-semibold text-sm shadow-xl shadow-primary/20 disabled:opacity-80 flex items-center justify-center gap-2 transition-all"
        >
          {analyzing ? (
            <>
              <Leaf className="w-5 h-5 animate-spin" /> {processingSteps[processStep]}
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" /> {t.diseaseAnalyze}
            </>
          )}
        </motion.button>
      )}

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
                  <div className="flex items-center gap-3 mt-4">
                    <div className="flex items-center gap-2">
                       <span className="text-xs font-semibold text-foreground uppercase tracking-wide">{diseaseResults.risk} {t.diseaseRisk}</span>
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                       <span className="text-xs text-muted-foreground whitespace-nowrap">{diseaseResults.confidence}% {t.diseaseConfidence}</span>
                       <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                         <motion.div 
                           initial={{ width: 0 }}
                           animate={{ width: `${diseaseResults.confidence}%` }}
                           transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                           className={`h-full ${
                             diseaseResults.risk === 'critical' ? 'bg-critical' : 
                             diseaseResults.risk === 'warning' ? 'bg-warning' : 'bg-safe'
                           }`}
                         />
                       </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="glass-card p-5">
              <h3 className="font-display font-semibold text-foreground mb-3">{t.diseaseActions}</h3>
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
