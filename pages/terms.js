import LegalPageLayout from "../components/LegalPageLayout";

export default function Terms() {
  return (
    <LegalPageLayout title="Terms &amp; Conditions" updated="15 September 2026">
      <p className="italic text-ink-muted">
        This is a starting template, not legal advice — have it reviewed by a lawyer familiar with
        transport/logistics regulation in your state before relying on it for a real business.
      </p>

      <h2>1. About these terms</h2>
      <p>
        These terms govern your use of the Averra website and app and any cab booking made through
        them. By booking a ride, you agree to these terms.
      </p>

      <h2>2. Bookings</h2>
      <p>
        A booking request is a request for a cab, not a guaranteed confirmation — bookings are
        confirmed by a dispatcher after the request is received. Fares shown before booking are
        estimates based on the distance and cab type selected; the final fare may vary based on
        actual route taken, waiting time, tolls, and applicable taxes.
      </p>

      <h2>3. Rider responsibilities</h2>
      <p>
        You're responsible for providing accurate pickup, drop, and contact details. Averra and its
        driver partners aren't liable for delays or missed pickups caused by incorrect information
        provided at the time of booking.
      </p>

      <h2>4. Payment</h2>
      <p>
        Unless stated otherwise at booking, fares are payable to the driver at the end of the trip.
        Any advance payment terms will be clearly shown before you confirm a booking.
      </p>

      <h2>5. Cancellations</h2>
      <p>
        See our <a href="/cancellation-policy" className="text-brand underline">Cancellation Policy</a> for
        details on cancelling a confirmed booking.
      </p>

      <h2>6. Liability</h2>
      <p>
        Averra facilitates bookings between riders and independent driver partners. While we vet
        drivers and vehicles, Averra is not liable for incidents arising from a driver partner's
        conduct beyond what's required by applicable law.
      </p>

      <h2>7. Changes to these terms</h2>
      <p>
        We may update these terms from time to time. Continued use of the service after a change
        means you accept the updated terms.
      </p>

      <h2>8. Contact</h2>
      <p>
        Questions about these terms can be sent to <span className="text-ink-muted">[Averra.contact@gmail.com]</span> or
        via the <a href="/support" className="text-brand underline">Support</a> page.
      </p>
    </LegalPageLayout>
  );
}
