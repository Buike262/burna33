import { motion } from "framer-motion";
import artistPortrait from "@/assets/artist-portrait.jpg";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden glow-gold">
              <img src={artistPortrait} alt="Burna Boy" loading="lazy" width={800} height={1000} className="w-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -right-4 bg-gradient-gold rounded-xl px-6 py-3">
              <p className="font-display font-black text-primary-foreground text-lg">Grammy Winner</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary tracking-[0.3em] uppercase text-sm font-medium mb-3">The African Giant</p>
            <h2 className="text-gradient-gold font-display text-4xl md:text-5xl font-black mb-6">About Burna Boy</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Damini Ebunoluwa Ogulu, known as Burna Boy, is a Nigerian singer, songwriter, and record producer. 
                Born in Port Harcourt, he rose to prominence in 2012 and has since become one of the biggest 
                Afrobeats artists in the world.
              </p>
              <p>
                With a Grammy Award for Best Global Music Album and multiple BET Awards, Burna Boy has solidified 
                his position as the African Giant. His music blends Afrobeats, dancehall, reggae, and pop, 
                creating a unique sound that resonates globally.
              </p>
              <p>
                From sold-out shows at Madison Square Garden to headlining major festivals, Burna Boy's live 
                performances are legendary — a powerful fusion of energy, culture, and unforgettable music.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              {[
                { stat: "15M+", label: "Monthly Listeners" },
                { stat: "50+", label: "Countries Toured" },
                { stat: "2B+", label: "Streams" },
              ].map((s) => (
                <div key={s.label} className="glass-card rounded-xl p-4 text-center">
                  <p className="text-gradient-gold font-display text-2xl md:text-3xl font-black">{s.stat}</p>
                  <p className="text-muted-foreground text-xs mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
