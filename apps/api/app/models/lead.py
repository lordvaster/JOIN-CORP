from sqlalchemy import Boolean, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.db.base import Base, TimestampMixin


class ContactSubmission(Base, TimestampMixin):
    __tablename__ = "contact_submissions"

    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    name: Mapped[str] = mapped_column(String(150))
    email: Mapped[str] = mapped_column(String(200), index=True)
    phone: Mapped[str | None] = mapped_column(String(50), nullable=True)
    company: Mapped[str | None] = mapped_column(String(200), nullable=True)
    service_interest: Mapped[str | None] = mapped_column(String(150), nullable=True)
    message: Mapped[str] = mapped_column(Text)
    source_ip: Mapped[str | None] = mapped_column(String(64), nullable=True)
    is_handled: Mapped[bool] = mapped_column(Boolean, default=False)
