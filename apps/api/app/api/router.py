from fastapi import APIRouter

from app.api.routes import admin, auth, contact, public

api_router = APIRouter(prefix="/api")
api_router.include_router(public.router)
api_router.include_router(contact.router)
api_router.include_router(auth.router)
api_router.include_router(admin.router)
