const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

/**
 * Fixed floating WhatsApp button, shown on every page. Renders nothing
 * until NEXT_PUBLIC_WHATSAPP_NUMBER is set — same gated pattern as
 * AdSense/AdMob/Firebase elsewhere in this project, so it's safe to ship
 * without a real number configured yet.
 */
export default function WhatsAppButton() {
  if (!WHATSAPP_NUMBER) return null;

  const message = encodeURIComponent("Hi, I'd like to book a cab.");
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-40 w-14 h-14 rounded-full bg-[#25D366] hover:bg-[#1EBE5A] shadow-lg shadow-black/20 flex items-center justify-center transition-colors"
    >
      <svg viewBox="0 0 32 32" className="w-7 h-7 fill-white">
        <path d="M16.001 3C9.373 3 4 8.373 4 15.001c0 2.386.699 4.61 1.902 6.479L4 29l7.694-1.87A11.94 11.94 0 0 0 16.001 27C22.629 27 28 21.627 28 15.001 28 8.373 22.629 3 16.001 3zm6.977 17.03c-.297.833-1.469 1.529-2.407 1.729-.641.135-1.478.243-4.294-.921-3.601-1.492-5.918-5.147-6.099-5.386-.176-.239-1.455-1.938-1.455-3.696 0-1.758.914-2.622 1.238-2.982.324-.36.706-.451.941-.451.235 0 .47.002.674.012.216.011.507-.082.793.605.297.71.994 2.448 1.081 2.626.088.178.146.386.029.622-.117.235-.176.382-.352.588-.176.206-.37.46-.529.618-.176.176-.359.367-.154.719.206.352.914 1.508 1.963 2.442 1.349 1.203 2.487 1.575 2.839 1.751.352.176.558.147.764-.088.206-.235.881-1.028 1.117-1.38.235-.352.47-.294.793-.176.323.117 2.06.971 2.413 1.147.352.176.587.264.674.412.088.147.088.852-.209 1.685z" />
      </svg>
    </a>
  );
}
