import { motion } from "framer-motion";
import { useState } from "react";
import { useCreateBooking } from "@workspace/api-client-react";
import { Phone, MapPin, Clock } from "lucide-react";

export default function Booking() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    preferredDate: "",
  });

  const mutation = useCreateBooking();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({
      data: {
        name: form.name,
        phone: form.phone,
        ...(form.service ? { service: form.service } : {}),
        ...(form.preferredDate ? { preferredDate: form.preferredDate } : {}),
      },
    });
  };

  const isSuccess = mutation.isSuccess;
  const isSubmitting = mutation.isPending;

  return (
    <section id="booking" className="py-24 md:py-32 px-6 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
        <img src="/images/service-1.png" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="container mx-auto max-w-5xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm uppercase tracking-[3px] font-semibold text-accent mb-4 block" data-testid="text-booking-subtitle">
              Ваш візит
            </span>
            <h2 className="text-4xl md:text-5xl font-light font-serif mb-6" data-testid="text-booking-title">
              Час для себе
            </h2>
            <p className="font-light leading-relaxed text-white/80 mb-10">
              Залиште свої контактні дані, і наш адміністратор зв'яжеться з вами найближчим часом для підтвердження ідеального часу вашого сеансу.
            </p>

            <div className="space-y-6 text-white/80 font-light">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-accent">
                  <Phone size={18} />
                </div>
                <span>+38 (044) 123 45 67</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-accent">
                  <MapPin size={18} />
                </div>
                <span>м. Київ, вул. Шовковична, 10</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center text-accent">
                  <Clock size={18} />
                </div>
                <span>Щодня 10:00 – 21:00</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white text-foreground p-8 md:p-10 shadow-2xl"
          >
            {isSuccess ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12" data-testid="msg-booking-success">
                <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center text-accent mb-6">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="text-2xl font-serif text-primary mb-2">Дякуємо за заявку!</h3>
                <p className="font-light">Наш адміністратор зв'яжеться з вами найближчим часом.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" data-testid="form-booking">
                {mutation.isError && (
                  <p className="text-red-600 text-sm" data-testid="msg-booking-error">
                    Помилка відправки. Спробуйте ще раз.
                  </p>
                )}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2 text-primary">Ваше ім'я</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:border-accent transition-colors"
                    placeholder="Ім'я"
                    data-testid="input-booking-name"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2 text-primary">Номер телефону</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:border-accent transition-colors"
                    placeholder="+38 (000) 000 00 00"
                    data-testid="input-booking-phone"
                  />
                </div>
                <div>
                  <label htmlFor="service" className="block text-sm font-medium mb-2 text-primary">Бажана послуга</label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:border-accent transition-colors appearance-none"
                    data-testid="select-booking-service"
                  >
                    <option value="">Оберіть послугу (необов'язково)</option>
                    <option value="aroma">Аромамасаж усього тіла</option>
                    <option value="stone">Стоун-терапія</option>
                    <option value="face">Релакс масаж обличчя</option>
                    <option value="deep">Глибокий масаж тканин</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="preferredDate" className="block text-sm font-medium mb-2 text-primary">Бажана дата</label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    value={form.preferredDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-border bg-background focus:outline-none focus:border-accent transition-colors text-foreground"
                    data-testid="input-booking-date"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary text-primary-foreground text-sm font-medium tracking-[1px] uppercase transition-all duration-300 hover:bg-accent disabled:opacity-70 disabled:cursor-not-allowed mt-4"
                  data-testid="button-booking-submit"
                >
                  {isSubmitting ? "Відправка..." : "Надіслати заявку"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
