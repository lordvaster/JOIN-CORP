import Link from "next/link";

import { Logo } from "@/components/site/logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background/60">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 md:grid-cols-4">
        <div className="sm:col-span-2 md:col-span-1">
          <Logo />
          <p className="mt-3 text-sm text-muted-foreground">
            PT Jofael Inovasi Nusantara — mitra pengembangan aplikasi
            e-commerce &amp; blockchain Anda.
          </p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-foreground">Perusahaan</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/tentang" className="hover:text-foreground">Tentang Kami</Link></li>
            <li><Link href="/portfolio" className="hover:text-foreground">Portfolio</Link></li>
            <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium text-foreground">Layanan</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/layanan" className="hover:text-foreground">E-Commerce</Link></li>
            <li><Link href="/layanan" className="hover:text-foreground">Blockchain</Link></li>
            <li><Link href="/layanan" className="hover:text-foreground">Aplikasi Custom</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium text-foreground">Kontak</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>Jl. Kalibata VIII No. 18, Palangka Raya</li>
            <li>
              <a href="mailto:corporate@join.co.id" className="hover:text-foreground">
                corporate@join.co.id
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border py-6 text-center text-xs text-muted-foreground">
        © {year} PT Jofael Inovasi Nusantara. Seluruh hak cipta dilindungi.
      </div>
    </footer>
  );
}
