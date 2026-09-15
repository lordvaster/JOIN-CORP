# ADR-001: PostgreSQL sebagai satu-satunya sumber konten (tanpa Sanity)

## Status
Diterima

## Konteks
Rencana awal menggunakan Sanity.io sebagai headless CMS terpisah dari
FastAPI+PostgreSQL. Pemilik proyek memutuskan untuk melewati Sanity demi
menyederhanakan infrastruktur (satu database, satu tempat backup, tanpa
ketergantungan pada layanan pihak ketiga).

## Keputusan
Seluruh konten editorial (services, portfolio_items, blog_posts,
team_members, testimonials) dan data transaksional (contact_submissions,
admin_users) disimpan di PostgreSQL yang sama, diakses lewat FastAPI.
Pengelolaan konten dilakukan melalui endpoint admin (`/api/admin/*`) yang
dilindungi JWT, bukan lewat editor visual siap pakai.

## Alternatif yang dipertimbangkan
- **Sanity.io terpisah** — editor visual lebih matang, tapi menambah sistem
  kedua yang perlu disinkronkan dan dipantau, plus ketergantungan vendor.
- **CMS headless open-source self-host (mis. Strapi)** — tetap menambah
  service terpisah; tidak sepadan untuk skala company profile saat ini.

## Konsekuensi
- (+) Satu database untuk semua backup/migrasi, arsitektur lebih sederhana.
- (+) Tidak ada biaya/kuota vendor CMS pihak ketiga.
- (-) Tidak ada editor rich-text visual; pembaruan konten lewat form admin
  atau langsung lewat `seed.py` / SQL sampai UI admin dashboard dibangun.
- (-) Jika kelak dibutuhkan editor yang lebih kaya, migrasi ke CMS terpisah
  berarti menulis ulang layer pengambilan konten di frontend.
