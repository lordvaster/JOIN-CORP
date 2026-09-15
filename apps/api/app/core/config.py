from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    environment: str = "development"

    database_url: str = "postgresql+asyncpg://join:join@db:5432/join"

    # Tanpa default sengaja: kalau SECRET_KEY tidak diset, aplikasi harus
    # gagal start (fail closed), bukan diam-diam pakai kunci yang sudah
    # publik di repo ini.
    secret_key: str
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 12

    cors_origins: list[str] = [
        "http://localhost:3000",
        "https://join.co.id",
        "https://www.join.co.id",
    ]

    contact_rate_limit: str = "5/minute"

    admin_email: str = "admin@join.co.id"

    # Notifikasi email saat ada lead baru dari form kontak. Kosong = fitur
    # nonaktif (dilewati diam-diam, tidak menggagalkan submission form).
    smtp_host: str = ""
    smtp_port: int = 587
    smtp_user: str = ""
    smtp_password: str = ""
    smtp_from: str = "JOIN Website <noreply@join.co.id>"
    notify_email_to: str = "corporate@join.co.id"


@lru_cache
def get_settings() -> Settings:
    return Settings()
