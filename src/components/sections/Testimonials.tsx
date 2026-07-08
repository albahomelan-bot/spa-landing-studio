import { motion } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Олена К.",
    role: "Маркетолог",
    text: "Після сеансу стоун-терапії я ніби народилася заново. Атмосфера салону дійсно допомагає повністю відключитися від робочих чатів і турбот. Сервіс на найвищому рівні."
  },
  {
    id: 2,
    name: "Дмитро М.",
    role: "Підприємець",
    text: "Довго шукав місце, де глибокий масаж спини поєднувався б з преміальним комфортом. Тут я знайшов ідеальний баланс. Приходжу щотижня і рекомендую всім колегам."
  },
  {
    id: 3,
    name: "Анастасія В.",
    role: "Дизайнер",
    text: "Кожна деталь — від запаху при вході до текстури рушників — свідчить про любов до клієнтів. Аромамасаж був неймовірним. Це справжня інвестиція у своє ментальне здоров'я."
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32 px-6 bg-white">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="text-sm uppercase tracking-[3px] font-semibold text-accent mb-4 block" data-testid="text-testimonials-subtitle">
            Відгуки
          </span>
          <h2 className="text-4xl md:text-5xl font-light font-serif text-primary mb-6" data-testid="text-testimonials-title">
            Слова наших гостей
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              className="p-8 md:p-10 bg-background border border-border/50 relative"
              data-testid={`card-testimonial-${item.id}`}
            >
              {/* Quote mark icon */}
              <div className="text-accent/20 mb-6">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M14.017 21L16.41 14.904C16.6418 14.364 16.8122 13.8447 16.9212 13.3458C17.0302 12.8468 17.0847 12.3551 17.0847 11.8706V3H22V11.8706C22 13.1416 21.8475 14.3409 21.5424 15.4687C21.2373 16.5964 20.7303 17.7011 20.0282 18.7828C19.3262 19.8645 18.3953 20.887 17.2354 21.8504L14.017 21ZM5.01695 21L7.40955 14.904C7.64181 14.364 7.81224 13.8447 7.92124 13.3458C8.03024 12.8468 8.08475 12.3551 8.08475 11.8706V3H13V11.8706C13 13.1416 12.8475 14.3409 12.5424 15.4687C12.2373 16.5964 11.7303 17.7011 11.0282 18.7828C10.3262 19.8645 9.39529 20.887 8.23541 21.8504L5.01695 21Z" />
                </svg>
              </div>
              <p className="text-foreground font-light leading-relaxed mb-8 italic">
                "{item.text}"
              </p>
              <div>
                <div className="font-serif text-primary text-lg">{item.name}</div>
                <div className="text-xs uppercase tracking-wider text-accent mt-1">{item.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
