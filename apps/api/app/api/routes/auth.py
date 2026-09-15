from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy import select

from app.api.deps import DbDep
from app.core.security import create_access_token, verify_password
from app.models.admin import AdminUser
from app.schemas.auth import Token

router = APIRouter(prefix="/auth", tags=["auth"])


@router.post("/token", response_model=Token)
async def login(
    db: DbDep,
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
) -> Token:
    result = await db.execute(select(AdminUser).where(AdminUser.email == form_data.username))
    admin = result.scalar_one_or_none()
    if admin is None or not admin.is_active or not verify_password(form_data.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email atau password salah",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return Token(access_token=create_access_token(subject=admin.email))
