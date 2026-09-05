export default function Footer() {
  return (
    <footer className="bg-road mt-20">
      <div className="max-w-6xl mx-auto px-5 py-10 grid sm:grid-cols-3 gap-8">
        <div>
          <p className="font-display text-paper text-sm mb-2">Averra<span className="text-accent"> Tour & Travel</span></p>
          <p className="font-body text-steel text-sm leading-relaxed">
            Outstation, local and airport cabs across North India. Booked
            online, confirmed by a real dispatcher.
          </p>
        </div>
        <div className="font-mono text-xs text-steel uppercase tracking-widest flex flex-col gap-2">
          <span className="text-accent normal-case font-body text-sm mb-1">
            Company
          </span>
          <a href="#" className="hover:text-accent">
            About
          </a>
          <a href="tel:+917889247126" className="hover:text-accent">
            Driver partners
          </a>
          <a href="tel:+917889247126" className="hover:text-accent">
            Support
          </a>
        </div>
        <div className="font-mono text-xs text-steel uppercase tracking-widest flex flex-col gap-2">
          <span className="text-accent normal-case font-body text-sm mb-1">
            Legal
          </span>
          <a href="#" className="hover:text-accent">
            Terms
          </a>
          <a href="#" className="hover:text-accent">
            Privacy
          </a>
          <a href="#" className="hover:text-accent">
            Cancellation policy
          </a>
        </div>
      </div>
      <div className="text-center font-mono text-[10px] text-steel/70 pb-6">
        © {new Date().getFullYear()} Averra Tour & Travel. All rights reserved.
        booking service.
      </div>
    </footer>
  );
}
