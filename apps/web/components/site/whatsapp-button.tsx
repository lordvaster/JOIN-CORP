import Link from "next/link";
import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
const DEFAULT_MESSAGE = "Halo JOIN, saya ingin bertanya tentang layanan Anda.";

export function WhatsappButton() {
  if (!WHATSAPP_NUMBER) return null;

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat lewat WhatsApp"
      className="glow-primary fixed right-5 bottom-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" fill="currentColor" strokeWidth={0} />
    </Link>
  );
}
