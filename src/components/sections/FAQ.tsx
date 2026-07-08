import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Чи потрібно готуватися до сеансу масажу?",
    answer: "Спеціальної підготовки не потрібно. Рекомендуємо прийняти теплий душ перед візитом та не вживати важку їжу за 1.5-2 години до сеансу."
  },
  {
    question: "Які олії ви використовуєте під час процедур?",
    answer: "Ми використовуємо лише 100% натуральні органічні базові та ефірні олії преміум класу, які підбираються індивідуально перед кожним сеансом враховуючи ваш стан та побажання."
  },
  {
    question: "Чи є у вас подарункові сертифікати?",
    answer: "Так, ви можете придбати електронний або фізичний подарунковий сертифікат на будь-яку суму або конкретну послугу. Він стане ідеальним подарунком для близької людини."
  },
  {
    question: "За скільки часу потрібно приходити на сеанс?",
    answer: "Будь ласка, приходьте за 10-15 хвилин до початку вашого часу. Це дозволить вам спокійно переодягнутися, випити чаю та налаштуватися на відпочинок без поспіху."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 md:py-32 px-6 bg-background">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16 md:mb-20">
          <span className="text-sm uppercase tracking-[3px] font-semibold text-accent mb-4 block" data-testid="text-faq-subtitle">
            Довідка
          </span>
          <h2 className="text-4xl md:text-5xl font-light font-serif text-primary" data-testid="text-faq-title">
            Часті запитання
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-border bg-white"
            >
              <button
                className="w-full px-6 py-5 text-left flex justify-between items-center focus:outline-none"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                data-testid={`button-faq-${index}`}
              >
                <span className="font-serif text-lg text-primary">{faq.question}</span>
                <ChevronDown 
                  className={`text-accent transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""}`}
                />
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 text-foreground font-light leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
