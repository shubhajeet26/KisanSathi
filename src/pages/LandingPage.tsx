import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CloudSun, Camera, Calendar, TrendingUp, MessageSquare,
  Leaf, ArrowRight, ChevronDown, Droplets, Sun, Wind
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import heroBg from "@/assets/hero-bg.jpg";

const features = [
  { icon: CloudSun, key: "featWeather" as const, descKey: "featWeatherDesc" as const },
  { icon: Camera, key: "featDisease" as const, descKey: "featDiseaseDesc" as const },
  { icon: Calendar, key: "featCalendar" as const, descKey: "featCalendarDesc" as const },
  { icon: TrendingUp, key: "featProfit" as const, descKey: "featProfitDesc" as const },
  { icon: MessageSquare, key: "featAI" as const, descKey: "featAIDesc" as const },
];

export default function LandingPage() {
  const { t } = useLanguage();

  const scrollToFeatures = () => {
    document.getElementById("features")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden">
      {/* Full-page blurred background image */}
      <div className="fixed inset-0 z-0">
        <img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover blur-[2px] scale-105"
          width={1920}
          height={1080}
        />
        {/* Gradient overlay: green → off-white → earthy */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-background/85 to-accent/30" />
        <div className="absolute inset-0 bg-background/50" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-background/40 backdrop-blur-2xl border-b border-border/30 shadow-sm">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-lg shadow-primary/25">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">KisanSathi</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <button onClick={scrollToFeatures} className="hover:text-foreground transition-colors duration-200">
              {t.landingFeatures}
            </button>
            <Link to="/about" className="hover:text-foreground transition-colors duration-200">
              {t.landingAbout}
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/about" className="md:hidden text-sm text-muted-foreground hover:text-foreground">
              {t.landingAbout}
            </Link>
            <Button asChild className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300">
              <Link to="/dashboard">{t.landingGetStarted}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10">
        {/* Floating nature icons */}
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-24 left-[8%] hidden md:block"
        >
          <div className="w-12 h-12 rounded-2xl bg-primary/10 backdrop-blur-xl border border-primary/20 flex items-center justify-center shadow-lg">
            <Sun className="w-6 h-6 text-primary" />
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 right-[10%] hidden md:block"
        >
          <div className="w-10 h-10 rounded-xl bg-accent/15 backdrop-blur-xl border border-accent/20 flex items-center justify-center shadow-lg">
            <Droplets className="w-5 h-5 text-accent-foreground" />
          </div>
        </motion.div>
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-32 left-[15%] hidden lg:block"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 backdrop-blur-xl border border-primary/15 flex items-center justify-center shadow-lg">
            <Wind className="w-5 h-5 text-primary" />
          </div>
        </motion.div>

        {/* Glow orbs */}
        <div className="absolute top-20 right-10 w-80 h-80 bg-primary/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-accent/15 rounded-full blur-[80px]" />

        <div className="container mx-auto px-4 py-28 md:py-40 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl mx-auto text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="w-[76px] h-[76px] rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-8 shadow-xl shadow-primary/30"
            >
              <Leaf className="w-10 h-10 text-primary-foreground" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 drop-shadow-md">
              {t.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl font-display text-primary font-semibold mb-4 drop-shadow-sm">
              {t.heroTagline}
            </p>
            <p className="text-muted-foreground text-base md:text-lg mb-12 max-w-lg mx-auto leading-relaxed">
              {t.heroDescription}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="rounded-xl px-8 text-base shadow-xl shadow-primary/25 hover:shadow-2xl hover:shadow-primary/35 hover:scale-105 active:scale-100 transition-all duration-300"
              >
                <Link to="/dashboard">
                  {t.landingGetStarted} <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl px-8 text-base bg-background/40 backdrop-blur-xl border-border/50 shadow-lg hover:shadow-xl hover:bg-background/60 hover:scale-105 active:scale-100 transition-all duration-300"
                onClick={scrollToFeatures}
              >
                {t.landingExplore} <ChevronDown className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3 drop-shadow-sm">
              {t.landingFeatures}
            </h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              {t.landingFeaturesSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feat, i) => (
              <motion.div
                key={feat.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.45 }}
                className="bg-card/50 backdrop-blur-2xl border border-border/40 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="w-13 h-13 w-[52px] h-[52px] rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 shadow-sm">
                  <feat.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display font-semibold text-foreground text-lg mb-2">
                  {t[feat.key]}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {t[feat.descKey]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border/30 relative z-10 bg-background/30 backdrop-blur-xl">
        <p className="text-center text-sm text-muted-foreground font-medium">Team EcoMind</p>
      </footer>
    </div>
  );
}
