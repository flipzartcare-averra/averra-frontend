import LegalPageLayout from "../components/LegalPageLayout";

export default function PrivacyPolicy() {
  return (
    <LegalPageLayout title="Privacy Policy" updated="15 September 2026">
      <p className="italic text-ink-muted">
        This is a starting template, not legal advice — for a real deployment, have it reviewed
        against applicable data protection law (e.g. India's DPDP Act) for your jurisdiction.
      </p>

      <h2>1. What we collect</h2>
      <p>
        When you make a booking, we collect your name, mobile number, pickup address, and trip
        details (pickup/drop location, date, cab type). This information is used to fulfil your
        booking and let you look up its status.
      </p>

      <h2>2. How we use it</h2>
      <p>
        Your details are shared with the driver assigned to your trip so they can contact you and
        complete the pickup. We don't sell your personal information to third parties.
      </p>

      <h2>3. Push notifications</h2>
      <p>
        If you use the Averra app and grant notification permission, we use your device's
        notification token to send you updates about your booking status (confirmed, cancelled,
        completed). You can disable notifications in your device settings at any time.
      </p>

      <h2>4. Looking up your bookings</h2>
      <p>
        Your booking history can be looked up using the mobile number you booked with, on the
        website or in the app — no account or password is required. Keep this in mind: anyone who
        knows your booking mobile number can look up that number's bookings.
      </p>

      <h2>5. Data retention</h2>
      <p>
        Booking records are retained to support customer service and dispute resolution. Contact us
        if you'd like a past booking record removed.
      </p>

      <h2>6. Cookies and analytics</h2>
      <p>
        Our website uses standard analytics (Google Analytics, Google Tag Manager) to understand
        how the site is used, and may show ads via Google AdSense. These services may set cookies
        in your browser — see Google's own privacy policy for how they handle that data.
      </p>

      <h2>7. Contact</h2>
      <p>
        Questions about this policy or a request to access/delete your data can be sent to{" "}
        <span className="text-ink-muted">[Averra.contact@gmail.com]</span> or via the{" "}
        <a href="/support" className="text-brand underline">Support</a> page.
      </p>
    </LegalPageLayout>
  );
}
