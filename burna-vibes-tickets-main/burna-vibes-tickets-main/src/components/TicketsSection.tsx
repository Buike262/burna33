import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Star, Crown, Zap, X, ArrowLeft, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import SeatMap, { sections, type Section } from "./SeatMap";

const tiers = [
  {
    id: "general",
    name: "General Admission",
    price: 85,
    icon: Zap,
    features: ["Standing area access", "Official wristband", "Digital ticket"],
    gradient: "from-muted to-secondary",
    popular: false,
  },
  {
    id: "vip",
    name: "VIP Experience",
    price: 250,
    icon: Star,
    features: ["Premium seated area", "Exclusive merch pack", "Early entry", "Complimentary drinks", "Meet & Greet photo"],
    gradient: "from-primary to-accent",
    popular: true,
  },
  {
    id: "platinum",
    name: "Platinum Elite",
    price: 500,
    icon: Crown,
    features: ["Front row access", "Backstage pass", "Signed merch", "Private lounge", "After-party invite", "Personal concierge"],
    gradient: "from-accent to-ember",
    popular: false,
  },
];

type CheckoutStep = "seats" | "payment";

const TicketsSection = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>("seats");
  const [selectedSection, setSelectedSection] = useState<string | null>(null);

  const handleBuy = (tierId: string) => {
    setSelectedTier(tierId);
    setCheckoutStep("seats");
    setSelectedSection(null);
    setShowCheckout(true);
  };

  const handleSectionSelect = (section: Section) => {
    const tier = tiers.find((t) => t.id === selectedTier);
    if (tier && section.tier === tier.id) {
      setSelectedSection(section.id);
    } else {
      const correctTier = tiers.find((t) => t.id === section.tier);
      if (correctTier) {
        setSelectedTier(correctTier.id);
        setSelectedSection(section.id);
      }
    }
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    const tier = tiers.find((t) => t.id === selectedTier);
    const section = sections.find((s) => s.id === selectedSection);
    toast.success(`🎉 Tickets confirmed! ${quantity}x ${tier?.name} — ${section?.name}`, {
      description: `Total: $${(tier?.price || 0) * quantity}. Check your email for confirmation & e-tickets.`,
      duration: 5000,
    });
    setShowCheckout(false);
    setSelectedTier(null);
    setSelectedSection(null);
    setQuantity(1);
  };

  const closeCheckout = () => {
    setShowCheckout(false);
    setSelectedTier(null);
    setSelectedSection(null);
    setQuantity(1);
  };

  return (
    <section id="tickets" className="py-24 md:py-32 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(40_100%_60%/0.04),transparent_70%)]" />
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-medium mb-3">Choose Your Experience</p>
          <h2 className="text-gradient-gold font-display text-4xl md:text-6xl font-black">Get Your Tickets</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className={`relative glass-card rounded-2xl p-6 md:p-8 ticket-shimmer transition-all duration-300 hover:scale-[1.02] ${
                tier.popular ? "ring-2 ring-primary glow-gold" : ""
              }`}
            >
              {tier.popular && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-gold text-primary-foreground text-xs font-bold px-4 py-1 rounded-full">
                  Most Popular
                </span>
              )}
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${tier.gradient} flex items-center justify-center mb-5`}>
                <tier.icon size={22} className={tier.popular ? "text-primary-foreground" : "text-foreground"} />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-1">{tier.name}</h3>
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-gradient-gold font-display text-4xl font-black">${tier.price}</span>
                <span className="text-muted-foreground text-sm">/ person</span>
              </div>
              <ul className="space-y-3 mb-8">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-secondary-foreground">
                    <Check size={16} className="text-primary flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleBuy(tier.id)}
                className={`w-full py-3 rounded-full font-bold text-sm transition-all ${
                  tier.popular
                    ? "bg-gradient-gold text-primary-foreground hover:opacity-90"
                    : "border border-primary/40 text-primary hover:bg-primary/10"
                }`}
              >
                Select & Buy
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Checkout modal */}
      <AnimatePresence>
        {showCheckout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-deep/80 backdrop-blur-sm"
            onClick={closeCheckout}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card rounded-2xl p-6 md:p-8 w-full max-w-lg border border-primary/20 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {checkoutStep === "seats" ? "Select Your Seats" : "Checkout"}
                </h3>
                <button onClick={closeCheckout} className="text-muted-foreground hover:text-foreground">
                  <X size={20} />
                </button>
              </div>

              {/* Step indicator */}
              <div className="flex items-center gap-2 mb-6">
                {["seats", "payment"].map((step, i) => (
                  <div key={step} className="flex items-center gap-2 flex-1">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${
                      checkoutStep === step ? "bg-gradient-gold text-primary-foreground" :
                      (checkoutStep === "payment" && i === 0) ? "bg-primary/30 text-primary" : "bg-muted text-muted-foreground"
                    }`}>
                      {i + 1}
                    </div>
                    <span className={`text-xs ${checkoutStep === step ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {step === "seats" ? "Seats" : "Payment"}
                    </span>
                    {i === 0 && <div className="flex-1 h-px bg-border" />}
                  </div>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {checkoutStep === "seats" ? (
                  <motion.div
                    key="seats"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                  >
                    <p className="text-muted-foreground text-sm mb-4 text-center">
                      Tap a section to select — highlighted areas match your <span className="text-primary font-medium">{tiers.find(t => t.id === selectedTier)?.name}</span> tier
                    </p>
                    <SeatMap onSelect={handleSectionSelect} selectedId={selectedSection} />
                    <button
                      onClick={() => setCheckoutStep("payment")}
                      disabled={!selectedSection}
                      className={`w-full mt-5 py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-all ${
                        selectedSection
                          ? "bg-gradient-gold text-primary-foreground hover:opacity-90"
                          : "bg-muted text-muted-foreground cursor-not-allowed"
                      }`}
                    >
                      Continue to Payment <ArrowRight size={16} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="payment"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    {(() => {
                      const tier = tiers.find((t) => t.id === selectedTier);
                      const section = sections.find((s) => s.id === selectedSection);
                      if (!tier) return null;
                      return (
                        <form onSubmit={handlePayment} className="space-y-4">
                          <div className="glass-card rounded-xl p-4 space-y-2">
                            <div className="flex justify-between items-center">
                              <div>
                                <p className="font-bold text-foreground">{tier.name}</p>
                                <p className="text-xs text-muted-foreground">{section?.name} · ${tier.price} each</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-8 h-8 rounded-full border border-border text-foreground hover:border-primary">−</button>
                                <span className="font-bold text-foreground w-6 text-center">{quantity}</span>
                                <button type="button" onClick={() => setQuantity(Math.min(10, quantity + 1))} className="w-8 h-8 rounded-full border border-border text-foreground hover:border-primary">+</button>
                              </div>
                            </div>
                          </div>

                          <input type="text" placeholder="Full Name" required className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none" />
                          <input type="email" placeholder="Email Address" required className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none" />
                          <input type="text" placeholder="Card Number" required pattern="[\d ]{16,19}" className="w-full bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none" />
                          <div className="grid grid-cols-2 gap-3">
                            <input type="text" placeholder="MM/YY" required className="bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none" />
                            <input type="text" placeholder="CVV" required className="bg-input border border-border rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:ring-2 focus:ring-primary outline-none" />
                          </div>

                          <div className="flex justify-between items-center pt-2 border-t border-border">
                            <span className="text-muted-foreground">Total</span>
                            <span className="text-gradient-gold font-display text-3xl font-black">${tier.price * quantity}</span>
                          </div>

                          <button type="submit" className="w-full bg-gradient-gold text-primary-foreground py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity glow-gold">
                            Pay ${tier.price * quantity}
                          </button>
                          <button type="button" onClick={() => setCheckoutStep("seats")} className="w-full text-center text-sm text-muted-foreground hover:text-foreground flex items-center justify-center gap-1">
                            <ArrowLeft size={14} /> Change seats
                          </button>
                          <p className="text-center text-xs text-muted-foreground">🔒 Secure payment · Instant e-ticket delivery</p>
                        </form>
                      );
                    })()}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default TicketsSection;
