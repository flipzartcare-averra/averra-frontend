import LegalPageLayout from "../components/LegalPageLayout";

export default function CancellationPolicy() {
  return (
    <LegalPageLayout title="Cancellation Policy" updated="15 September 2026">
      <p className="italic text-ink-muted">
        This is a starting template — adjust the actual cancellation windows/charges to match your
        real operating policy before publishing.
      </p>

      <h2>1. How to cancel</h2>
      <p>
        A booking can be cancelled by contacting support with your booking details (the mobile
        number you booked with, and the pickup city/date) — see the{" "}
        <a href="/support" className="text-brand underline">Support</a> page. You can check a
        booking's current status any time on{" "}
        <a href="/my-bookings" className="text-brand underline">My bookings</a>.
      </p>

      <h2>2. Free cancellation window</h2>
      <p>
        Bookings can be cancelled free of charge up to 6 hours before the scheduled pickup time.
      </p>

      <h2>3. Late cancellations</h2>
      <p>
        Cancelling within 6 hours of pickup, or after a driver has already been dispatched, may
        incur a cancellation charge to cover the driver's time and fuel — this will be communicated
        to you at the time of cancellation.
      </p>

      <h2>4. No-shows</h2>
      <p>
        If the driver arrives at the pickup location and is unable to reach you or you're not
        present within a reasonable wait time, the trip may be marked as a no-show and charged
        accordingly.
      </p>

      <h2>5. Cancellations by Averra</h2>
      <p>
        In rare cases (driver unavailability, safety concerns, incorrect booking details) we may
        need to cancel a confirmed booking. We'll try to notify you as early as possible and help
        arrange an alternative where we can.
      </p>

      <h2>6. Refunds</h2>
      <p>
        Since most fares are paid to the driver at the end of the trip rather than in advance,
        cancellations typically don't involve a refund. If an advance payment was taken for your
        booking, refund timing and method will be shown at the time of cancellation.
      </p>
    </LegalPageLayout>
  );
}
