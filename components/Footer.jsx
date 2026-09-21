export default function Footer() {
  return (
    <footer className="bg-road mt-20">
      <div className="max-w-6xl mx-auto px-5 py-10 grid sm:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/brand/logo-mark.svg" alt="Averra" className="w-7 h-7" />
            <p className="font-display text-paper text-sm">Averra</p>
          </div>
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
          <a href="#" className="hover:text-accent">
            Driver partners
          </a>
          <a href="/support" className="hover:text-accent">
            Support
          </a>
          <a href="/blog" className="hover:text-accent">
            Blog
          </a>
          <a href="/gallery" className="hover:text-accent">
            Gallery
          </a>
        </div>
        <div className="font-mono text-xs text-steel uppercase tracking-widest flex flex-col gap-2">
          <span className="text-accent normal-case font-body text-sm mb-1">
            Legal
          </span>
          <a href="/terms" className="hover:text-accent">
            Terms
          </a>
          <a href="/privacy-policy" className="hover:text-accent">
            Privacy
          </a>
          <a href="/cancellation-policy" className="hover:text-accent">
            Cancellation policy
          </a>
        </div>
        <div className="font-mono text-xs text-steel uppercase tracking-widest flex flex-col gap-2">
          <span className="text-accent normal-case font-body text-sm mb-1">
            Popular routes
          </span>
          <a href="/taxi/chandigarh-to-delhi-taxi" className="hover:text-accent">
            Chandigarh → Delhi
          </a>
          <a href="/taxi/chandigarh-to-shimla-taxi" className="hover:text-accent">
            Chandigarh → Shimla
          </a>
          <a href="/taxi/chandigarh-to-manali-taxi" className="hover:text-accent">
            Chandigarh → Manali
          </a>
          <a href="/taxi" className="hover:text-accent">
            All routes
          </a>
        </div>
      </div>
      <div className="text-center font-mono text-[10px] text-steel/70 pb-6">
        © {new Date().getFullYear()} Averra. All rights reserved. Averra is a registered trademark of Averra Travel Private Limited. We are a licensed taxi
        booking service.
      </div>
    </footer>
  );
}
