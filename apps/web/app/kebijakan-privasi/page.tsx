import type { Metadata } from "next";

import { FadeIn } from "@/components/site/fade-in";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi PT Jofael Inovasi Nusantara (JOIN) mengenai data pribadi yang dikumpulkan lewat join.co.id.",
};

const LAST_UPDATED = "15 September 2026";

export default function PrivacyPolicyPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-20">
      <FadeIn>
        <span className="text-sm font-medium tracking-wide text-primary uppercase">
          Kebijakan Privasi
        </span>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">
          Kebijakan Privasi JOIN
        </h1>
        <p className="mt-4 text-sm text-muted-foreground">
          Terakhir diperbarui: {LAST_UPDATED}
        </p>

        <div className="glass mt-8 space-y-8 rounded-2xl p-8 text-sm leading-relaxed text-foreground/90 sm:text-base">
          <p>
            PT Jofael Inovasi Nusantara (&ldquo;<strong>JOIN</strong>&rdquo;,
            &ldquo;kami&rdquo;) menghormati privasi setiap pengunjung situs
            join.co.id (&ldquo;<strong>Situs</strong>&rdquo;). Kebijakan ini
            menjelaskan data pribadi apa saja yang kami kumpulkan, untuk apa
            data tersebut digunakan, dan hak Anda atas data itu, sesuai
            Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data
            Pribadi (UU PDP).
          </p>

          <div>
            <h2 className="text-lg font-medium text-foreground">
              1. Data yang Kami Kumpulkan
            </h2>
            <p className="mt-2">
              Kami hanya mengumpulkan data pribadi yang Anda berikan sendiri
              secara sukarela lewat formulir kontak di Situs, yaitu: nama,
              alamat email, nomor telepon/WhatsApp (opsional), nama
              perusahaan (opsional), layanan yang diminati, dan isi pesan
              Anda. Kami juga mencatat alamat IP pengirim secara otomatis
              sebagai bagian dari pencegahan penyalahgunaan formulir
              (spam).
            </p>
            <p className="mt-2">
              Situs tidak menggunakan cookie pelacakan pihak ketiga.
              Preferensi tampilan (mode terang/gelap) disimpan di
              browser Anda sendiri (localStorage) dan tidak pernah
              dikirim ke server kami.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-foreground">
              2. Tujuan Penggunaan Data
            </h2>
            <p className="mt-2">Data yang Anda kirimkan digunakan untuk:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Menghubungi Anda kembali terkait pertanyaan atau permintaan konsultasi;</li>
              <li>Menyiapkan penawaran layanan sesuai kebutuhan yang Anda sampaikan;</li>
              <li>Mencegah penyalahgunaan/spam pada formulir kontak.</li>
            </ul>
            <p className="mt-2">
              Kami tidak menjual, menyewakan, atau membagikan data pribadi
              Anda kepada pihak ketiga untuk kepentingan pemasaran mereka.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-foreground">
              3. Penyimpanan &amp; Keamanan Data
            </h2>
            <p className="mt-2">
              Data disimpan di server basis data milik JOIN dengan akses
              dibatasi hanya untuk staf berwenang lewat autentikasi
              terproteksi. Situs berjalan di balik Cloudflare, yang
              menyediakan lapisan keamanan tambahan (proteksi DDoS &amp;
              enkripsi lalu lintas HTTPS) untuk seluruh komunikasi antara
              browser Anda dan server kami. Kami melakukan pencadangan
              (backup) data secara berkala.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-foreground">
              4. Berapa Lama Data Disimpan
            </h2>
            <p className="mt-2">
              Data pesan kontak disimpan selama diperlukan untuk keperluan
              komunikasi bisnis dengan Anda, atau sampai Anda meminta
              penghapusan sebagaimana dijelaskan pada bagian Hak Anda di
              bawah.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-foreground">
              5. Hak Anda Berdasarkan UU PDP
            </h2>
            <p className="mt-2">Sebagai pemilik data, Anda berhak untuk:</p>
            <ul className="mt-2 list-disc space-y-1 pl-5">
              <li>Meminta salinan data pribadi Anda yang kami simpan;</li>
              <li>Meminta koreksi atas data yang tidak akurat;</li>
              <li>Meminta penghapusan data pribadi Anda;</li>
              <li>Menarik persetujuan penggunaan data Anda kapan saja.</li>
            </ul>
            <p className="mt-2">
              Untuk menggunakan hak-hak di atas, silakan hubungi kami lewat
              email di bawah — kami akan menindaklanjuti permintaan Anda
              dalam waktu yang wajar.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-foreground">
              6. Perubahan Kebijakan
            </h2>
            <p className="mt-2">
              Kebijakan ini dapat kami perbarui dari waktu ke waktu.
              Perubahan akan ditandai lewat tanggal &ldquo;Terakhir
              diperbarui&rdquo; di atas.
            </p>
          </div>

          <div>
            <h2 className="text-lg font-medium text-foreground">7. Kontak</h2>
            <p className="mt-2">
              Pertanyaan seputar kebijakan privasi ini atau permintaan
              terkait data pribadi Anda dapat dikirim ke{" "}
              <a href="mailto:corporate@join.co.id" className="text-primary hover:underline">
                corporate@join.co.id
              </a>
              .
            </p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
