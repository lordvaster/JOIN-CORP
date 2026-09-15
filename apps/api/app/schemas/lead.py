from datetime import datetime

from pydantic import BaseModel, ConfigDict, EmailStr, field_validator


class ContactCreate(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    name: str
    email: EmailStr
    phone: str | None = None
    company: str | None = None
    service_interest: str | None = None
    message: str

    @field_validator("name")
    @classmethod
    def name_not_empty(cls, v: str) -> str:
        if len(v) < 2:
            raise ValueError("Nama minimal 2 karakter")
        return v

    @field_validator("message")
    @classmethod
    def message_length(cls, v: str) -> str:
        if len(v) < 10:
            raise ValueError("Pesan minimal 10 karakter")
        if len(v) > 5000:
            raise ValueError("Pesan terlalu panjang")
        return v


class ContactRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    email: EmailStr
    phone: str | None
    company: str | None
    service_interest: str | None
    message: str
    is_handled: bool
    created_at: datetime
