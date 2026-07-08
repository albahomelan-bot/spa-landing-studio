import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[100dvh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden bg-background">
      <div className="container mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16 items-center">
        
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
          className="flex flex-col items-start text-left z-10"
        >
          <span className="text-sm uppercase tracking-[3px] font-semibold text-accent mb-6" data-testid="text-hero-subtitle">
            Студія преміум релаксу
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl leading-[1.15] font-light font-serif text-primary mb-6 tracking-tight" data-testid="text-hero-title">
            Гармонія вашого тіла та розуму
          </h1>
          <p className="text-lg md:text-xl text-foreground font-light leading-relaxed mb-10 max-w-xl" data-testid="text-hero-description">Відновіть сили за допомогою авторських технік масажу, витончених арома олій та затишної атмосфери повного спокою.</p>
          
          <div className="flex flex-wrap gap-4">
            <a 
              href="#booking" 
              className="inline-flex items-center justify-center px-9 py-4 bg-primary text-primary-foreground border border-primary text-sm font-medium tracking-[1px] uppercase transition-all duration-400 hover:bg-accent hover:border-accent hover:text-white"
              data-testid="button-hero-primary"
            >Записатися на сеанс</a>
            <a 
              href="#services" 
              className="inline-flex items-center justify-center px-9 py-4 bg-transparent text-primary border border-primary text-sm font-medium tracking-[1px] uppercase transition-all duration-400 hover:bg-primary hover:text-primary-foreground"
              data-testid="button-hero-secondary"
            >
              Наші послуги
            </a>
          </div>
        </motion.div>

        {/* Visual Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.25, 1, 0.5, 1], delay: 0.2 }}
          className="w-full flex justify-center lg:justify-end"
        >
          <div className="w-full max-w-[500px] aspect-[4/5] overflow-hidden relative shadow-[0_20px_40px_rgba(0,0,0,0.08)] group">
            <img 
              src="/images/hero.png" 
              alt="Premium Spa Interior" 
              className="w-full h-full object-cover transition-transform duration-[800ms] cubic-bezier(0.25, 1, 0.5, 1) group-hover:scale-105"
              data-testid="img-hero"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
