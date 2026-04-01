import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Tour Dates", href: "#events" },
  { label: "Tickets", href: "#tickets" },
  { label: "Gallery", href: "#gallery" },
  { label: "About", href: "#about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30"
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-4 md:px-8">
        <a href="#hero" className="text-gradient-gold font-display text-2xl font-black tracking-tight">
          BURNA BOY
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#tickets"
            className="bg-gradient-gold text-primary-foreground px-5 py-2.5 rounded-full text-sm font-bold hover:opacity-90 transition-opacity"
          >
            Get Tickets
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-card/95 backdrop-blur-xl border-t border-border/30"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-foreground text-lg font-medium hover:text-primary transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#tickets"
                onClick={() => setOpen(false)}
                className="bg-gradient-gold text-primary-foreground px-5 py-3 rounded-full text-center font-bold mt-2"
              >
                Get Tickets
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
