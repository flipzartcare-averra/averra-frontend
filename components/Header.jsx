export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-md bg-brand flex items-center justify-center font-display font-bold text-surface text-sm">
            A
          </span>
          <span className="font-display font-bold text-ink text-lg tracking-tight">
            Averra<span className="text-brand">Tours & Travels</span>
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 font-body text-sm font-medium text-ink-muted">
          <a href="#book" className="hover:text-brand transition-colors">
            Book a cab
          </a>
          <a href="#fleet" className="hover:text-brand transition-colors">
            Fleet &amp; fares
          </a>
          <a href="#routes" className="hover:text-brand transition-colors">
            Routes
          </a>
          <a href="#packages" className="hover:text-brand transition-colors">
            Packages
          </a>
          <a href="#faq" className="hover:text-brand transition-colors">
            FAQ
          </a>
        </nav>

        <a
          href="#book"
          className="font-body text-sm font-semibold bg-accent text-surface px-5 py-2.5 rounded-md hover:bg-accent-dark transition-colors shadow-sm shadow-accent/30"
        >
          Book now
        </a>
      </div>
    </header>
  );
}
