import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import heroConcert from "@/assets/hero-concert.jpg";

const NEXT_CONCERT_DATE = new Date("2026-08-15T20:00:00");

const useCountdown = (targetDate: Date) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetDate.getTime() - Date.now());
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  return timeLeft;
};

const HeroSection = () => {
  const { days, hours, minutes, seconds } = useCountdown(NEXT_CONCERT_DATE);
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroConcert}
          alt="Burna Boy performing live"
          className="w-full h-full object-cover"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center pt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-primary font-medium tracking-[0.3em] uppercase text-sm md:text-base mb-4"
        >
          No Sign of Weakness World Tour 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-gradient-gold font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tighter mb-6 glow-text"
        >
          BURNA
          <br />
          BOY
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto mb-10"
        >
          The African Giant returns. Experience the electrifying energy of Burna Boy live — a night you'll never forget.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#tickets"
            className="bg-gradient-gold text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity glow-gold"
          >
            Buy Tickets Now
          </a>
          <a
           href="#events"
             className="border border-primary/40 text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-primary/10 transition-colors"
           >
             View Tour Dates
           </a>
         </motion.div>

         {/* Countdown Timer */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 1.3 }}
           className="mt-12"
         >
           <p className="text-muted-foreground text-sm tracking-widest uppercase mb-4">Lagos — Aug 15, 2026</p>
           <div className="flex justify-center gap-3 sm:gap-5">
             {[
               { value: days, label: "Days" },
               { value: hours, label: "Hours" },
               { value: minutes, label: "Mins" },
               { value: seconds, label: "Secs" },
             ].map((unit) => (
               <div key={unit.label} className="glass-card rounded-xl px-4 py-3 sm:px-6 sm:py-4 min-w-[70px] sm:min-w-[85px]">
                 <span className="text-gradient-gold font-display text-2xl sm:text-4xl font-black block">
                   {String(unit.value).padStart(2, "0")}
                 </span>
                 <span className="text-muted-foreground text-xs uppercase tracking-wider">{unit.label}</span>
               </div>
             ))}
           </div>
         </motion.div>

         {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 rounded-full border-2 border-primary/40 flex items-start justify-center p-1.5">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.8, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
