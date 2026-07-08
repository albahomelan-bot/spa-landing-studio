import { motion } from "framer-motion";

export default function Philosophy() {
  return (
    <section id="philosophy" className="py-24 md:py-32 px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-2 md:order-1 relative"
          >
            <div className="aspect-square max-w-md mx-auto overflow-hidden">
              <img 
                src="/images/gallery-1.png" 
                alt="Spa Atmosphere" 
                className="w-full h-full object-cover"
                data-testid="img-philosophy"
              />
            </div>
            {/* Decorative block */}
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-background -z-10 hidden md:block" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="order-1 md:order-2 flex flex-col"
          >
            <span className="text-sm uppercase tracking-[3px] font-semibold text-accent mb-4" data-testid="text-philosophy-subtitle">
              Філософія
            </span>
            <h2 className="text-4xl md:text-5xl font-light font-serif text-primary mb-8" data-testid="text-philosophy-title">
              Місце, де час зупиняється
            </h2>
            <div className="space-y-6 text-foreground font-light leading-relaxed">
              <p>
                Ми створили цей простір для тих, хто втомився від шаленого ритму сучасного міста. Наша студія — це не просто масажний салон, це справжній храм відновлення, де кожна деталь продумана для вашого комфорту.
              </p>
              <p>Тепле світло, натуральні матеріали, авторські арома композиції та руки справжніх майстрів своєї справи допоможуть вам повернутися до себе, відпустити напругу та знайти внутрішній баланс.</p>
            </div>
            
            <div className="mt-10 pt-10 border-t border-border flex items-center space-x-12">
              <div>
                <span className="block text-3xl font-serif text-primary mb-1">10+</span>
                <span className="text-xs uppercase tracking-wider text-accent font-medium">років досвіду</span>
              </div>
              <div>
                <span className="block text-3xl font-serif text-primary mb-1">5</span>
                <span className="text-xs uppercase tracking-wider text-accent font-medium">авторських технік</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
