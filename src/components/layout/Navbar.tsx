import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Про нас", href: "#philosophy" },
    { name: "Послуги", href: "#services" },
    { name: "Атмосфера", href: "#gallery" },
    { name: "Відгуки", href: "#testimonials" },
    { name: "Запис", href: "#booking" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-background/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <a href="#" className="font-serif text-2xl tracking-wide text-primary" data-testid="link-logo">
          RELAX STUDIO
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium tracking-wider text-foreground hover:text-accent transition-colors"
              data-testid={`link-nav-${link.href.replace('#', '')}`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#booking"
            className="px-6 py-2 bg-primary text-primary-foreground text-sm font-medium tracking-wider hover:bg-accent transition-colors duration-300"
            data-testid="button-nav-book"
          >ЗАПИСАТИСЯ</a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          data-testid="button-mobile-menu"
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-t border-border shadow-lg py-6 px-6 flex flex-col space-y-4 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-base font-medium text-foreground hover:text-accent transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`link-mobile-nav-${link.href.replace('#', '')}`}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-4 px-6 py-3 bg-primary text-primary-foreground text-center text-sm font-medium tracking-wider hover:bg-accent transition-colors duration-300"
              data-testid="button-mobile-nav-book"
            >
              ЗАПИСАТИСЬ
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
