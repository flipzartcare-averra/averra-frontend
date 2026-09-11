export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-5 py-3">
        <a href="#top" className="flex items-center gap-2.5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/brand/logo-mark.svg" alt="Averra" className="w-9 h-9" />
          <span className="font-display font-bold text-ink text-xl tracking-tight">
            Averra
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-7 font-body text-sm font-medium text-ink-muted">
          <a href="/#book" className="hover:text-brand transition-colors">
            Book a cab
          </a>
          <a href="/#fleet" className="hover:text-brand transition-colors">
            Fleet &amp; fares
          </a>
          <a href="/#routes" className="hover:text-brand transition-colors">
            Routes
          </a>
          <a href="/#packages" className="hover:text-brand transition-colors">
            Packages
          </a>
          <a href="/my-bookings" className="hover:text-brand transition-colors">
            My bookings
          </a>
          <a href="/#faq" className="hover:text-brand transition-colors">
            FAQ
          </a>
        </nav>

        <a
          href="/#book"
          className="font-body text-sm font-semibold bg-accent text-surface px-5 py-2.5 rounded-md hover:bg-accent-dark transition-colors shadow-sm shadow-accent/30"
        >
          Check Booking Status
      
      </div>
    </header>
  );
}
