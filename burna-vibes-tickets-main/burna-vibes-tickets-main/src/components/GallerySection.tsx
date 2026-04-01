import { motion } from "framer-motion";
import artistPortrait from "@/assets/artist-portrait.jpg";
import crowdShot from "@/assets/crowd-shot.jpg";
import concertWide from "@/assets/concert-wide.jpg";

const images = [
  { src: artistPortrait, alt: "Burna Boy portrait", span: "md:col-span-1 md:row-span-2" },
  { src: crowdShot, alt: "Concert crowd energy", span: "md:col-span-1" },
  { src: concertWide, alt: "Burna Boy live concert wide shot", span: "md:col-span-1" },
];

const GallerySection = () => {
  return (
    <section id="gallery" className="py-24 md:py-32 bg-gradient-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-primary tracking-[0.3em] uppercase text-sm font-medium mb-3">Moments</p>
          <h2 className="text-gradient-gold font-display text-4xl md:text-6xl font-black">Gallery</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl group ${img.span}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover min-h-[250px] md:min-h-[300px] group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>

        {/* Video embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 max-w-3xl mx-auto"
        >
          <div className="relative rounded-2xl overflow-hidden aspect-video glass-card">
            <iframe
              src="https://www.youtube.com/embed/MCAiBhLhBPQ"
              title="Burna Boy - City Boys"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;
