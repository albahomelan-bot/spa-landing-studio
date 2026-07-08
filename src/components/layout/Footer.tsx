export default function Footer() {
  return (
    <footer className="bg-white py-12 px-6 border-t border-border">
      <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="font-serif text-2xl tracking-wide text-primary">
          RELAX STUDIO
        </div>

        <div className="flex items-center gap-6">
          <a href="#" className="text-foreground hover:text-accent transition-colors" aria-label="Instagram">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
          </a>
          <a href="#" className="text-foreground hover:text-accent transition-colors" aria-label="Facebook">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
          </a>
        </div>

        <div className="text-sm font-light text-foreground/70 text-center md:text-right">
          © {new Date().getFullYear()} Студія преміум релаксу. Всі права захищено.<br/>
          Розроблено з турботою.
        </div>
      </div>
    </footer>
  );
}
