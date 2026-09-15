# ADR-003: Monorepo untuk frontend, backend, dan infra

## Status
Diterima

## Konteks
Tim yang mengerjakan proyek ini kecil (solo founder pada tahap awal).

## Keputusan
Satu repository Git berisi:
```
join-website/
├── apps/
│   ├── web/     # Next.js (App Router, Tailwind, shadcn/ui, Framer Motion, React Hook Form)
│   └── api/     # FastAPI + SQLAlchemy async + Alembic
├── infra/       # Caddyfile, backup.sh
├── docs/adr/    # catatan keputusan arsitektur
├── docker-compose.yml
└── .env.example
```

## Alternatif yang dipertimbangkan
- **Multi-repo** (repo terpisah untuk web dan api) — cocok untuk tim besar
  dengan siklus rilis independen, tapi menambah overhead (dua CI, dua
  tempat review) yang tidak sepadan untuk tim kecil saat ini.

## Konsekuensi
- (+) Satu `git clone`, satu tempat untuk `docker compose up`, review PR
  lintas frontend/backend lebih mudah.
- (-) Riwayat commit frontend dan backend tercampur; bisa dipecah ke
  multi-repo nanti jika tim/skala membesar (YAGNI untuk saat ini).
