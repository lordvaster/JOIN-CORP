import type { AboutContent, Service, TeamMember } from "@/lib/types";

/**
 * Konten cadangan yang tampil jika FastAPI belum bisa diakses (mis. saat
 * build pertama sebelum backend di-deploy/seed). Nilainya sengaja disamakan
 * dengan apps/api/seed.py agar tidak terasa berbeda begitu API sudah aktif.
 */
export const fallbackServices: Service[] = [
  {
    id: 1,
    slug: "pengembangan-ecommerce",
    title: "Pengembangan Aplikasi E-Commerce",
    summary: "Platform jual-beli online yang cepat, aman, dan siap skala.",
    description:
      "Kami merancang dan membangun aplikasi e-commerce custom—dari storefront, manajemen produk, pembayaran, hingga integrasi logistik.",
    icon: "shopping-bag",
    order: 1,
  },
  {
    id: 2,
    slug: "solusi-blockchain",
    title: "Solusi Berbasis Blockchain",
    summary: "Aplikasi terdesentralisasi dan smart contract yang andal.",
    description:
      "Pengembangan smart contract, integrasi wallet, dan aplikasi berbasis teknologi blockchain untuk kebutuhan bisnis modern.",
    icon: "link",
    order: 2,
  },
  {
    id: 3,
    slug: "pengembangan-aplikasi-custom",
    title: "Pengembangan Aplikasi Custom",
    summary: "Software sesuai kebutuhan spesifik bisnis Anda.",
    description:
      "Dari konsultasi kebutuhan, desain UX, hingga pengembangan dan maintenance aplikasi web maupun mobile.",
    icon: "code",
    order: 3,
  },
];

export const fallbackTeam: TeamMember[] = [];

export const fallbackAbout: AboutContent = {
  heading: "PT Jofael Inovasi Nusantara",
  intro:
    "JOIN adalah perseroan perorangan yang berdiri di Palangka Raya, Kalimantan Tengah, dengan fokus pada dua bidang: pengembangan aplikasi e-commerce dan solusi berbasis teknologi blockchain. Kami percaya teknologi yang tepat guna dapat membantu bisnis dari berbagai skala untuk bertumbuh secara digital.",
};
