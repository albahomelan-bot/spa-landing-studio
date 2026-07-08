import { motion } from "framer-motion";

const images = [
  "/images/gallery-1.png",
  "/images/hero.png",
  "/images/service-1.png",
  "/images/service-2.png"
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 px-6 bg-white overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-sm uppercase tracking-[3px] font-semibold text-accent mb-4 block" data-testid="text-gallery-subtitle">
            Простір
          </span>
          <h2 className="text-4xl md:text-5xl font-light font-serif text-primary" data-testid="text-gallery-title">
            Атмосфера студії
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`overflow-hidden relative ${idx === 0 || idx === 3 ? "md:mt-12" : ""}`}
            >
              <div className="aspect-[3/4] group">
                <img 
                  src={src} 
                  alt="Gallery image" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  loading="lazy"
                  data-testid={`img-gallery-${idx}`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
