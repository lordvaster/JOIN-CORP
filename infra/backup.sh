#!/usr/bin/env bash
# Backup PostgreSQL milik JOIN ke file .sql.gz lokal, retensi 14 hari.
# Jadwalkan lewat cron, mis.: 0 2 * * * /root/web/infra/backup.sh >> /var/log/join-backup.log 2>&1
#
# PENTING: file di BACKUP_DIR sebaiknya juga disinkronkan ke penyimpanan
# off-site (mis. rclone ke object storage) agar tetap aman jika VPS ini
# bermasalah. Skrip ini baru menangani bagian "dump lokal".

set -euo pipefail

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
BACKUP_DIR="${BACKUP_DIR:-$PROJECT_DIR/backups}"
RETENTION_DAYS="${RETENTION_DAYS:-14}"
TIMESTAMP="$(date +%Y%m%d-%H%M%S)"

mkdir -p "$BACKUP_DIR"
cd "$PROJECT_DIR"

set -a
source .env
set +a

docker compose exec -T db pg_dump -U "${POSTGRES_USER}" "${POSTGRES_DB}" \
  | gzip > "$BACKUP_DIR/join-db-$TIMESTAMP.sql.gz"

find "$BACKUP_DIR" -name "join-db-*.sql.gz" -mtime "+$RETENTION_DAYS" -delete

echo "Backup selesai: $BACKUP_DIR/join-db-$TIMESTAMP.sql.gz"
