"""Seed data awal: admin user + konten dasar JOIN.

Jalankan sekali setelah migrasi: `docker compose exec api python seed.py`
Aman dijalankan berulang kali (idempotent per slug/email).
"""

import asyncio
import os

from sqlalchemy import select

from app.core.security import hash_password
from app.db.session import AsyncSessionLocal
from app.models.admin import AdminUser
from app.models.content import AboutContent, Service, TeamMember


async def seed() -> None:
    async with AsyncSessionLocal() as db:
        admin_email = os.environ.get("SEED_ADMIN_EMAIL", "admin@join.co.id")
        admin_password = os.environ.get("SEED_ADMIN_PASSWORD", "ubah-password-ini")

        existing_admin = await db.execute(select(AdminUser).where(AdminUser.email == admin_email))
        if existing_admin.scalar_one_or_none() is None:
            db.add(
                AdminUser(
                    email=admin_email,
                    hashed_password=hash_password(admin_password),
                    full_name="Admin JOIN",
                )
            )
            print(f"Admin user dibuat: {admin_email}")
        else:
            print(f"Admin user sudah ada: {admin_email}")

        services = [
            Service(
                slug="pengembangan-ecommerce",
                title="Pengembangan Aplikasi E-Commerce",
                summary="Platform jual-beli online yang cepat, aman, dan siap skala.",
                description=(
                    "Kami merancang dan membangun aplikasi e-commerce custom—dari "
                    "storefront, manajemen produk, pembayaran, hingga integrasi logistik."
                ),
                icon="shopping-bag",
                order=1,
            ),
            Service(
                slug="solusi-blockchain",
                title="Solusi Berbasis Blockchain",
                summary="Aplikasi terdesentralisasi dan smart contract yang andal.",
                description=(
                    "Pengembangan smart contract, integrasi wallet, dan aplikasi "
                    "berbasis teknologi blockchain untuk kebutuhan bisnis modern."
                ),
                icon="link",
                order=2,
            ),
            Service(
                slug="pengembangan-aplikasi-custom",
                title="Pengembangan Aplikasi Custom",
                summary="Software sesuai kebutuhan spesifik bisnis Anda.",
                description=(
                    "Dari konsultasi kebutuhan, desain UX, hingga pengembangan dan "
                    "maintenance aplikasi web maupun mobile."
                ),
                icon="code",
                order=3,
            ),
        ]
        for service in services:
            existing = await db.execute(select(Service).where(Service.slug == service.slug))
            if existing.scalar_one_or_none() is None:
                db.add(service)
                print(f"Service ditambahkan: {service.slug}")

        founder = await db.execute(select(TeamMember).where(TeamMember.name == "Founder JOIN"))
        if founder.scalar_one_or_none() is None:
            db.add(
                TeamMember(
                    name="Founder JOIN",
                    role="Founder",
                    bio="Pendiri PT Jofael Inovasi Nusantara (JOIN).",
                    order=1,
                )
            )
            print("Team member founder ditambahkan")

        about = await db.get(AboutContent, 1)
        if about is None:
            db.add(
                AboutContent(
                    id=1,
                    heading="PT Jofael Inovasi Nusantara",
                    intro=(
                        "JOIN adalah perseroan perorangan yang berdiri di Palangka Raya, "
                        "Kalimantan Tengah, dengan fokus pada dua bidang: pengembangan "
                        "aplikasi e-commerce dan solusi berbasis teknologi blockchain. "
                        "Kami percaya teknologi yang tepat guna dapat membantu bisnis dari "
                        "berbagai skala untuk bertumbuh secara digital."
                    ),
                )
            )
            print("About content dibuat")

        await db.commit()


if __name__ == "__main__":
    asyncio.run(seed())
