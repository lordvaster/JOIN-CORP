# ADR-002: Self-host semua layanan di satu VPS via Docker Compose + Cloudflare Tunnel

## Status
Diterima

## Konteks
Domain `join.co.id` sudah dikelola lewat akun Cloudflare milik pemilik.
VPS yang tersedia (mesin tempat proyek ini dikembangkan) dikonfirmasi
dedicated untuk hosting jangka panjang, dengan syarat mudah dipindah bila
suatu saat diperlukan. Saat pengecekan awal, VPS hanya membuka port 22
(SSH) ke publik — tidak ada port 80/443 yang terbuka.

## Keputusan
Semua layanan (Next.js, FastAPI, PostgreSQL, reverse proxy Caddy) berjalan
sebagai container Docker Compose di VPS yang sama. Koneksi ke Cloudflare
memakai **Cloudflare Tunnel** (`cloudflared`), bukan A-record langsung ke
IP VPS:

- `join.co.id`, `www.join.co.id` → Tunnel → Caddy → `web` (Next.js)
- `api.join.co.id` → Tunnel → Caddy → `api` (FastAPI)

Layanan `cloudflared` didaftarkan di bawah Compose profile `prod`
(`docker compose --profile prod up -d`) agar tidak crash-loop sebelum
`CLOUDFLARE_TUNNEL_TOKEN` diisi.

## Alternatif yang dipertimbangkan
- **A-record langsung ke IP VPS** — mengharuskan membuka port 80/443 di
  firewall level provider, menambah permukaan serangan, dan merepotkan
  jika VPS pernah berpindah IP.
- **Vercel (frontend) + VPS (backend)** — DX Next.js lebih baik, tapi
  pemilik memilih satu tempat (self-host penuh) demi kesederhanaan dan
  portabilitas.

## Portabilitas (syarat dari pemilik proyek)
Karena seluruh definisi infrastruktur ada sebagai kode
(`docker-compose.yml`, `Caddyfile`, migrasi Alembic) dan data hanya hidup
di volume `db_data`, pindah ke VPS lain cukup dengan:
1. `pg_dump` dari VPS lama, `pg_restore`/`psql` di VPS baru (lihat
   `infra/backup.sh`).
2. Clone repo, isi ulang `.env`, `docker compose build && docker compose up -d`.
3. Alihkan Cloudflare Tunnel ke VPS baru (tidak perlu ganti DNS record).

## Konsekuensi
- (+) Tidak perlu membuka port publik apa pun selain SSH.
- (+) Pindah VPS tidak mengharuskan perubahan DNS (tunnel yang dialihkan).
- (-) Bergantung pada uptime Cloudflare Tunnel; jika token hilang/expired,
  situs tidak bisa diakses publik sampai token diperbarui.
- (-) Tidak ada load-balancing/auto-scaling; cukup untuk skala company
  profile, perlu revisit jika trafik naik signifikan.
