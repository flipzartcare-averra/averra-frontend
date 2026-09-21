import LegalPageLayout from "../components/LegalPageLayout";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

export default function Support() {
  return (
    <LegalPageLayout title="Support">
      <p>
        Need help with a booking, a cancellation, or anything else? Reach us through any of the
        options below.
      </p>

      <div className={`grid ${WHATSAPP_NUMBER ? "sm:grid-cols-3" : "sm:grid-cols-2"} gap-4 my-4`}>
        <div className="border border-line rounded-lg p-5">
          <p className="font-display font-bold text-ink text-sm mb-1">Call</p>
          <p className="font-mono text-ink-muted text-sm">[your support phone number]</p>
          <p className="font-body text-ink-muted text-xs mt-1">Daily, 7am – 11pm IST</p>
        </div>
        <div className="border border-line rounded-lg p-5">
          <p className="font-display font-bold text-ink text-sm mb-1">Email</p>
          <p className="font-mono text-ink-muted text-sm">[your support email]</p>
          <p className="font-body text-ink-muted text-xs mt-1">We reply within 24 hours</p>
        </div>
        {WHATSAPP_NUMBER && (
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi, I need help with a booking.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-line rounded-lg p-5 hover:border-brand/50 transition-colors"
          >
            <p className="font-display font-bold text-ink text-sm mb-1">WhatsApp</p>
            <p className="font-mono text-ink-muted text-sm">Chat with us</p>
            <p className="font-body text-ink-muted text-xs mt-1">Usually fastest for quick questions</p>
          </a>
        )}
      </div>

      <h2>Check your booking status yourself</h2>
      <p>
        Before reaching out, you can look up your booking's current status on{" "}
        <a href="/my-bookings" className="text-brand underline">My bookings</a> using the mobile
        number you booked with — it's often the fastest way to get an answer.
      </p>

      <h2>Common questions</h2>
      <p>
        Fare structure, cancellation windows, and other frequently asked questions are covered on
        the <a href="/#faq" className="text-brand underline">homepage FAQ</a>.
      </p>

      <h2>Cancelling a booking</h2>
      <p>
        See the <a href="/cancellation-policy" className="text-brand underline">Cancellation Policy</a> for
        how cancellations work, then contact us using the details above with your booking's mobile
        number and pickup date.
      </p>
    </LegalPageLayout>
  );
}
