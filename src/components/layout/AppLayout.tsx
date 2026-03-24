import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home, LayoutDashboard, MessageSquare, Calendar, Camera, Map, TrendingUp,
  Bell, Sprout, Menu, X, Leaf, Globe
} from "lucide-react";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { languageLabels, type Language } from "@/lib/i18n/translations";
import { useOnboarding } from "@/hooks/useOnboarding";
import OnboardingForm from "@/components/OnboardingForm";

const navKeys = [
  { path: "/", key: "navHome" as const, icon: Home },
  { path: "/dashboard", key: "navDashboard" as const, icon: LayoutDashboard },
  { path: "/chatbot", key: "navAskAI" as const, icon: MessageSquare },
  { path: "/calendar", key: "navCalendar" as const, icon: Calendar },
  { path: "/disease-detection", key: "navDisease" as const, icon: Camera },
  { path: "/map", key: "navMap" as const, icon: Map },
  { path: "/profit", key: "navProfit" as const, icon: TrendingUp },
  { path: "/reminders", key: "navReminders" as const, icon: Bell },
  { path: "/soil", key: "navSoil" as const, icon: Sprout },
];

const mobileNavKeys = navKeys.slice(0, 5);

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { profile, needsOnboarding, saveProfile, isLoading } = useOnboarding();

  if (isLoading) return null;

  const navItems = navKeys.map((n) => ({ ...n, label: t[n.key] }));
  const mobileNavItems = mobileNavKeys.map((n) => ({ ...n, label: t[n.key] }));

  return (
      {needsOnboarding && <OnboardingForm onComplete={saveProfile} />}
    <div className="min-h-screen flex bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-64 bg-sidebar border-r border-sidebar-border fixed h-full z-30">
        <div className="p-5 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
            <Leaf className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-display font-bold text-sidebar-foreground">{t.appName}</h1>
            <p className="text-xs text-sidebar-foreground/60">{t.appTagline}</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-sidebar-accent text-sidebar-primary"
                    : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 mx-3 mb-4 rounded-xl bg-sidebar-accent/50 border border-sidebar-border">
          <p className="text-xs text-sidebar-foreground/60">{t.farmLocation}</p>
          <p className="text-sm font-medium text-sidebar-foreground">{profile?.location || t.farmName}</p>
          <p className="text-xs text-sidebar-foreground/50 mt-1">
            {profile ? `Crops: ${profile.crops.join(", ")}` : t.farmCrops}
          </p>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-72 bg-sidebar z-50 lg:hidden shadow-2xl"
            >
              <div className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
                    <Leaf className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h1 className="text-lg font-display font-bold text-sidebar-foreground">{t.appName}</h1>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="text-sidebar-foreground/70">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="px-3 py-2 space-y-1">
                {navItems.map((item) => {
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                        active
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50"
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen pb-20 lg:pb-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-20 bg-background/80 backdrop-blur-lg border-b border-border px-4 lg:px-6 h-14 flex items-center justify-between">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-foreground">
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2 lg:hidden">
            <Leaf className="w-5 h-5 text-primary" />
            <span className="font-display font-bold text-foreground">{t.appName}</span>
          </div>
          <div className="hidden lg:block">
            <h2 className="text-sm font-medium text-muted-foreground">
              {navItems.find((n) => n.path === location.pathname)?.label || t.navDashboard}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="appearance-none bg-secondary text-secondary-foreground text-xs px-3 py-1.5 rounded-lg pr-7 cursor-pointer border-0 focus:ring-1 focus:ring-primary"
              >
                {(Object.keys(languageLabels) as Language[]).map((lang) => (
                  <option key={lang} value={lang}>{languageLabels[lang]}</option>
                ))}
              </select>
              <Globe className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground pointer-events-none" />
            </div>
            <Link to="/reminders" className="relative p-2 rounded-full hover:bg-muted transition-colors">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-critical rounded-full" />
            </Link>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Footer */}
        <footer className="py-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground font-medium">Team EcoMind</p>
        </footer>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-lg border-t border-border lg:hidden z-30">
        <div className="flex items-center justify-around py-2">
          {mobileNavItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg transition-colors ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
