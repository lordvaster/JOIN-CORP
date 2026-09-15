# Deploy ke VPS RAM kecil (1 vCPU / 512MB)

Panduan ini untuk kondisi VPS yang **berbeda** dari VPS produksi utama
(yang sekarang dipakai untuk join.co.id, spek jauh lebih besar). Dipakai
kalau suatu saat perlu pindah/menduplikasi ke mesin yang lebih kecil.

Inti masalah di VPS 512MB: proses **build** Next.js (`next build`) butuh
memori jauh lebih besar dari 512MB dan kemungkinan besar gagal (OOM) kalau
dijalankan langsung di VPS tersebut. Solusinya: **build image di tempat
lain, VPS kecil cukup `pull` image jadi.**

## 1. Build otomatis lewat GitHub Actions

`.github/workflows/build-and-push.yml` sudah dikonfigurasi: setiap push ke
`main`, image `web` dan `api` di-build lalu didorong ke GitHub Container
Registry (GHCR):

- `ghcr.io/lordvaster/join-corp-web:latest`
- `ghcr.io/lordvaster/join-corp-api:latest`

Tidak perlu setup tambahan — `GITHUB_TOKEN` bawaan Actions sudah cukup
untuk push ke GHCR pada repo yang sama.

**Sekali saja**, atur visibility package di GitHub: Settings repo →
Packages (atau buka package-nya langsung di tab **Packages** akun/berkas)
→ pastikan `join-corp-web` dan `join-corp-api` diset **Private** (default)
dan link ke repo `JOIN-CORP` supaya gampang dikelola.

## 2. Siapkan VPS kecil

```bash
# di VPS 512MB, sebagai root
apt-get update && apt-get install -y docker.io docker-compose-plugin git

# swap wajib — tanpa ini banyak proses gampang OOM
curl -fsSL https://raw.githubusercontent.com/lordvaster/JOIN-CORP/main/infra/low-memory/setup-swap.sh -o setup-swap.sh
chmod +x setup-swap.sh
./setup-swap.sh 1024   # swap 1GB

git clone git@github.com:lordvaster/JOIN-CORP.git
cd JOIN-CORP
cp .env.example .env   # isi semua nilai (lihat README utama)
```

## 3. Login ke GHCR (image private butuh autentikasi walau untuk pull)

Buat **Personal Access Token (classic)** di GitHub dengan scope
`read:packages` saja (Settings → Developer settings → Personal access
tokens), lalu di VPS:

```bash
echo "<PAT_ANDA>" | docker login ghcr.io -u <username-github> --password-stdin
```

## 4. Pull image jadi (bukan build)

```bash
docker compose -f docker-compose.yml -f infra/low-memory/docker-compose.override.yml pull db caddy cloudflared
docker compose -f docker-compose.yml -f infra/low-memory/docker-compose.override.yml pull web api
```

`db`, `caddy`, `cloudflared` memang selalu image publik (bukan hasil
build sendiri) jadi pull-nya ringan; `web` dan `api` pull dari GHCR hasil
build GitHub Actions.

## 5. Jalankan dengan batas memori

```bash
docker compose -f docker-compose.yml -f infra/low-memory/docker-compose.override.yml up -d db api web caddy

docker compose exec api alembic upgrade head
docker compose exec api python seed.py
```

`infra/low-memory/docker-compose.override.yml` memasang `mem_limit` per
service (total ~440MB dari 512MB) supaya kalau salah satu container
lonjak memori, yang di-restart cuma container itu — bukan seluruh VPS
macet. Detail nilainya ada komentarnya di file tersebut, sesuaikan lagi
kalau setelah dipakai ternyata ada service yang sering ke-OOM-kill
(`docker compose logs <service>` akan menunjukkan `OOMKilled` di
`docker inspect` kalau ini terjadi).

## 6. Cloudflare Tunnel

Sama seperti panduan di README utama — buat tunnel baru khusus untuk VPS
ini (atau arahkan tunnel yang sama ke VPS baru kalau ini pengganti VPS
lama), isi `CLOUDFLARE_TUNNEL_TOKEN` di `.env`, lalu:

```bash
docker compose -f docker-compose.yml -f infra/low-memory/docker-compose.override.yml --profile prod up -d cloudflared
```

## 7. Update berikutnya

Setiap kali ada perubahan kode yang sudah di-push ke `main` (GitHub
Actions otomatis build ulang), tinggal:

```bash
docker compose -f docker-compose.yml -f infra/low-memory/docker-compose.override.yml pull web api
docker compose -f docker-compose.yml -f infra/low-memory/docker-compose.override.yml up -d web api
```

Tidak ada proses build sama sekali di VPS ini.

## Ekspektasi yang realistis

Bahkan dengan swap dan batas memori, 512MB/1 vCPU tetap pas-pasan untuk
production sungguhan — cukup untuk trafik rendah (company profile dengan
pengunjung tidak terlalu ramai bersamaan), tapi tanpa ruang tumbuh. Kalau
ke depannya trafik naik, upgrade ke **1 vCPU / 1GB RAM** akan jauh lebih
aman dan tidak butuh perubahan apa pun di luar spek VPS-nya.
