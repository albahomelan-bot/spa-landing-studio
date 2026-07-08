import { motion } from "framer-motion";

const services = [
  {
    id: 1,
    title: "Аромамасаж усього тіла",
    description: "М'яка техніка з використанням індивідуально підібраних ефірних олій. Глибоко розслабляє нервову систему та знімає стрес.",
    duration: "60 / 90 хв",
    price: "1800 / 2400 ₴",
    image: "/images/service-1.png"
  },
  {
    id: 2,
    title: "Стоун-терапія",
    description: "Масаж гарячими базальтовими каменями. Прогріває м'язи на глибокому рівні, покращує кровообіг та енергетичний баланс.",
    duration: "90 хв",
    price: "2600 ₴",
    image: "/images/service-2.png"
  },
  {
    id: 3,
    title: "Релакс масаж обличчя",
    description: "Комплексний догляд, що включає очищення, масаж обличчя, шиї та зони декольте, а також зволожуючу маску.",
    duration: "45 хв",
    price: "1500 ₴",
    image: "/images/service-3.png"
  },
  {
    id: 4,
    title: "Глибокий масаж тканин",
    description: "Інтенсивний вплив на м'язи та фасції для зняття хронічної напруги, спазмів та відновлення рухливості.",
    duration: "60 / 90 хв",
    price: "2000 / 2700 ₴",
    image: "/images/hero.png" // using hero as fallback for 4th
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 md:py-32 px-6 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-center max-w-2xl mx-auto mb-16 md:mb-24">
          <span className="text-sm uppercase tracking-[3px] font-semibold text-accent mb-4 block" data-testid="text-services-subtitle">
            Ритуали
          </span>
          <h2 className="text-4xl md:text-5xl font-light font-serif text-primary mb-6" data-testid="text-services-title">
            Наші послуги
          </h2>
          <p className="text-foreground font-light leading-relaxed">
            Оберіть свій ідеальний ритуал відновлення. Кожен сеанс адаптується під ваші індивідуальні потреби та побажання.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {services.map((service, index) => (
            <motion.div 
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group bg-white p-6 sm:p-8 flex flex-col sm:flex-row gap-6 items-start hover:shadow-lg transition-shadow duration-500"
              data-testid={`card-service-${service.id}`}
            >
              <div className="w-full sm:w-1/3 aspect-square overflow-hidden shrink-0">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="flex flex-col flex-grow h-full justify-between">
                <div>
                  <h3 className="text-2xl font-serif text-primary mb-3">{service.title}</h3>
                  <p className="text-sm text-foreground font-light leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                  <span className="text-xs uppercase tracking-wider text-accent font-medium">{service.duration}</span>
                  <span className="text-lg font-serif text-primary">{service.price}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a 
            href="#booking" 
            className="inline-flex items-center justify-center px-8 py-3 border border-primary text-primary text-sm font-medium tracking-wider uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
            data-testid="button-services-book"
          >Записатися онлайн</a>
        </div>
      </div>
    </section>
  );
}
