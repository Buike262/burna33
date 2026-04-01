import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock, ArrowRight } from "lucide-react";

const events = [
  { id: 1, city: "Lagos", venue: "Eko Convention Centre", date: "Aug 15, 2026", time: "8:00 PM", status: "On Sale", price: "₦25,000" },
  { id: 2, city: "London", venue: "The O2 Arena", date: "Sep 5, 2026", time: "7:30 PM", status: "On Sale", price: "£75" },
  { id: 3, city: "New York", venue: "Madison Square Garden", date: "Sep 20, 2026", time: "8:00 PM", status: "Almost Sold Out", price: "$120" },
  { id: 4, city: "Paris", venue: "Accor Arena", date: "Oct 3, 2026", time: "8:00 PM", status: "On Sale", price: "€90" },
  { id: 5, city: "Toronto", venue: "Scotiabank Arena", date: "Oct 18, 2026", time: "7:30 PM", status: "On Sale", price: "CA$110" },
  { id: 6, city: "Accra", venue: "Independence Square", date: "Nov 1, 2026", time: "7:00 PM", status: "Coming Soon", price: "GH₵200" },
];

const EventsSection = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="events" className="py-24 md:py-32 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-medium mb-3">World Tour 2026</p>
          <h2 className="text-gradient-gold font-display text-4xl md:text-6xl font-black">Tour Dates</h2>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-3">
          {events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              onMouseEnter={() => setHoveredId(event.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={`glass-card rounded-xl p-5 md:p-6 cursor-pointer transition-all duration-300 group ${
                hoveredId === event.id ? "glow-gold border-primary/40" : ""
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h3 className="font-display text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {event.city}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-muted-foreground text-sm">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={14} className="text-primary" />
                      {event.venue}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-primary" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} className="text-primary" />
                      {event.time}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      event.status === "Almost Sold Out"
                        ? "bg-destructive/20 text-destructive"
                        : event.status === "Coming Soon"
                        ? "bg-muted text-muted-foreground"
                        : "bg-primary/20 text-primary"
                    }`}
                  >
                    {event.status}
                  </span>
                  <span className="font-display font-bold text-foreground text-lg">
                    {event.price}
                  </span>
                  <a
                    href="#tickets"
                    className="bg-gradient-gold text-primary-foreground px-5 py-2 rounded-full text-sm font-bold flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                  >
                    Tickets <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
