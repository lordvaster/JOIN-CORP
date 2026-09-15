from functools import lru_cache

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    environment: str = "development"

    database_url: str = "postgresql+asyncpg://join:join@db:5432/join"

    secret_key: str = "change-me-in-.env"
    algorithm: str = "HS256"
    access_token_expire_minutes: int = 60 * 12

    cors_origins: list[str] = [
        "http://localhost:3000",
        "https://join.co.id",
        "https://www.join.co.id",
    ]

    contact_rate_limit: str = "5/minute"

    admin_email: str = "admin@join.co.id"


@lru_cache
def get_settings() -> Settings:
    return Settings()
