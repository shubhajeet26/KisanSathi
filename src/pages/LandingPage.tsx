import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CloudSun, Camera, Calendar, TrendingUp, MessageSquare,
  Leaf, ArrowRight, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";

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
    <div className="min-h-screen bg-gradient-to-br from-primary/8 via-background to-accent/6 relative">
      {/* Nature background overlay */}
      <div
        className="fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23228B22' fill-opacity='0.6'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-background/70 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center shadow-md">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">KisanSathi</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
            <button onClick={scrollToFeatures} className="hover:text-foreground transition-colors">
              {t.landingFeatures}
            </button>
            <Link to="/about" className="hover:text-foreground transition-colors">
              {t.landingAbout}
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/about" className="md:hidden text-sm text-muted-foreground hover:text-foreground">
              {t.landingAbout}
            </Link>
            <Button asChild className="shadow-md">
              <Link to="/dashboard">{t.landingGetStarted}</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent/12 rounded-full blur-[80px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />

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
              className="w-18 h-18 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-8 shadow-lg shadow-primary/25 w-[72px] h-[72px]"
            >
              <Leaf className="w-9 h-9 text-primary-foreground" />
            </motion.div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4 drop-shadow-sm">
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
                className="rounded-xl px-8 text-base shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 hover:scale-105 transition-all duration-300"
              >
                <Link to="/dashboard">
                  {t.landingGetStarted} <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="rounded-xl px-8 text-base shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 bg-background/50 backdrop-blur-sm"
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="glass-card p-6 hover:shadow-xl hover:-translate-y-1.5 hover:scale-[1.02] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300 shadow-sm">
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
      <footer className="py-8 border-t border-border/50 relative z-10">
        <p className="text-center text-sm text-muted-foreground font-medium">Team EcoMind</p>
      </footer>
    </div>
  );
}
