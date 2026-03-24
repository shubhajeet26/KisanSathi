import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Leaf, Mail, ArrowLeft } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/i18n/LanguageContext";

const teamMembers = [
  { name: "Shubhajeet Saha", role: "Team Leader", email: "shubhajeetsaha26@gmail.com", initials: "SS" },
  { name: "Shreyasi Das", role: "Member", email: "", initials: "SD" },
  { name: "Shubhajeet Saha", role: "Member", email: "", initials: "SS" },
  { name: "Shubhajeet Saha", role: "Member", email: "", initials: "SS" },
];

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl gradient-primary flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-foreground">KisanSathi</span>
          </Link>
          <Button variant="outline" size="sm" asChild>
            <Link to="/"><ArrowLeft className="w-4 h-4 mr-1" /> {t.aboutBackHome}</Link>
          </Button>
        </div>
      </header>

      {/* Team Logo & Name */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-6 shadow-lg"
          >
            <Leaf className="w-10 h-10 text-primary-foreground" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3"
          >
            {t.aboutTeamName}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-muted-foreground max-w-md mx-auto"
          >
            {t.aboutTeamDesc}
          </motion.p>
        </div>
      </section>

      {/* Team Members */}
      <section className="pb-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
                className="glass-card p-6 text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <Avatar className="w-16 h-16 mx-auto mb-4 bg-primary/10">
                  <AvatarFallback className="text-lg font-display font-bold text-primary bg-primary/10">
                    {member.initials}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-display font-semibold text-foreground text-base">{member.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{member.role}</p>
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="inline-flex items-center gap-1 text-xs text-primary hover:underline mt-3"
                  >
                    <Mail className="w-3 h-3" />
                    {member.email}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <p className="text-center text-sm text-muted-foreground font-medium">Team EcoMind</p>
      </footer>
    </div>
  );
}
