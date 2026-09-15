#!/usr/bin/env bash
# Siapkan swapfile untuk VPS RAM kecil (mis. 512MB) sebagai jaring pengaman
# dari OOM killer. Aman dijalankan berulang (idempotent) — dilewati kalau
# swap sudah ada.
#
# Pemakaian: sudo ./setup-swap.sh [ukuran-dalam-MB, default 1024]

set -euo pipefail

SWAP_SIZE_MB="${1:-1024}"
SWAPFILE="/swapfile"

if [ "$(id -u)" -ne 0 ]; then
  echo "Jalankan sebagai root (sudo)." >&2
  exit 1
fi

if swapon --show | grep -q "$SWAPFILE"; then
  echo "Swapfile $SWAPFILE sudah aktif, tidak melakukan apa-apa."
  exit 0
fi

if [ -f "$SWAPFILE" ]; then
  echo "File $SWAPFILE sudah ada tapi belum aktif sebagai swap — mengaktifkan."
else
  echo "Membuat swapfile ${SWAP_SIZE_MB}MB di $SWAPFILE ..."
  fallocate -l "${SWAP_SIZE_MB}M" "$SWAPFILE" 2>/dev/null || dd if=/dev/zero of="$SWAPFILE" bs=1M count="$SWAP_SIZE_MB"
  chmod 600 "$SWAPFILE"
  mkswap "$SWAPFILE"
fi

swapon "$SWAPFILE"

if ! grep -q "$SWAPFILE" /etc/fstab; then
  echo "$SWAPFILE none swap sw 0 0" >> /etc/fstab
  echo "Ditambahkan ke /etc/fstab agar aktif lagi setelah reboot."
fi

# swappiness rendah: pakai swap hanya kalau RAM benar-benar habis, bukan
# untuk cache biasa — lebih penting di VPS kecil biar tidak lambat terus.
sysctl -w vm.swappiness=10
if ! grep -q "vm.swappiness" /etc/sysctl.conf 2>/dev/null; then
  echo "vm.swappiness=10" >> /etc/sysctl.conf
fi

echo "Selesai. Status swap saat ini:"
swapon --show
free -h
