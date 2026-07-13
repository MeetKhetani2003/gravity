import { company } from "@/lib/site-data";

export function FloatingWhatsApp() {
  const whatsappNumber = company.whatsapp.replace(/[^0-9]/g, "");
  
  return (
    <a
      href={`https://wa.me/${whatsappNumber}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 ring-4 ring-background transition-transform hover:scale-110 hover:shadow-xl hover:shadow-black/30"
      aria-label="Chat with us on WhatsApp"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-8 w-8"
      >
        <path d="M12.012 2c-5.506 0-9.98 4.478-9.98 9.985 0 1.764.457 3.483 1.332 5.006L2 22l5.168-1.353c1.46.802 3.107 1.226 4.84 1.227h.004c5.503 0 9.979-4.477 9.979-9.984C21.99 6.386 17.519 2 12.012 2zm-.004 18.243h-.002c-1.492 0-2.956-.401-4.24-1.161l-.304-.18-3.155.827.842-3.076-.197-.314c-.835-1.328-1.275-2.868-1.275-4.457 0-4.606 3.75-8.358 8.36-8.358 4.61 0 8.356 3.754 8.356 8.359.001 4.607-3.746 8.36-8.385 8.36zm4.587-6.26c-.25-.125-1.488-.735-1.718-.819-.23-.083-.399-.125-.568.125-.168.25-.65 1.002-.8 1.21-.15.208-.3.23-.55.105-1.127-.563-2.072-1.04-2.898-2.18-.215-.296.216-.273.7-.847.083-.125.042-.23-.021-.354-.063-.125-.568-1.371-.777-1.877-.204-.492-.412-.426-.568-.434-.15-.008-.323-.008-.492-.008-.168 0-.441.063-.672.314-.23.25-.881.861-.881 2.1s.902 2.433 1.028 2.6c.125.167 1.774 2.709 4.298 3.799 1.84.795 2.502.668 3.003.585.568-.094 1.488-.609 1.7-1.198.21-.59.21-1.096.15-1.21-.063-.105-.23-.167-.48-.292z" />
      </svg>
    </a>
  );
}
