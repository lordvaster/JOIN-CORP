from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select

from app.api.deps import DbDep
from app.models.content import AboutContent, BlogPost, PortfolioItem, Service, TeamMember, Testimonial
from app.schemas.content import (
    AboutContentRead,
    BlogPostRead,
    PortfolioItemRead,
    ServiceRead,
    TeamMemberRead,
    TestimonialRead,
)

router = APIRouter(tags=["public"])

DEFAULT_ABOUT_HEADING = "PT Jofael Inovasi Nusantara"
DEFAULT_ABOUT_INTRO = (
    "JOIN adalah perseroan perorangan yang berdiri di Palangka Raya, "
    "Kalimantan Tengah, dengan fokus pada dua bidang: pengembangan "
    "aplikasi e-commerce dan solusi berbasis teknologi blockchain. "
    "Kami percaya teknologi yang tepat guna dapat membantu bisnis dari "
    "berbagai skala untuk bertumbuh secara digital."
)


@router.get("/about", response_model=AboutContentRead)
async def get_about_content(db: DbDep) -> AboutContent | AboutContentRead:
    about = await db.get(AboutContent, 1)
    if about is None:
        return AboutContentRead(heading=DEFAULT_ABOUT_HEADING, intro=DEFAULT_ABOUT_INTRO)
    return about


@router.get("/services", response_model=list[ServiceRead])
async def list_services(db: DbDep) -> list[Service]:
    result = await db.execute(
        select(Service).where(Service.is_published.is_(True)).order_by(Service.order)
    )
    return list(result.scalars().all())


@router.get("/services/{slug}", response_model=ServiceRead)
async def get_service(slug: str, db: DbDep) -> Service:
    result = await db.execute(
        select(Service).where(Service.slug == slug, Service.is_published.is_(True))
    )
    service = result.scalar_one_or_none()
    if service is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Layanan tidak ditemukan")
    return service


@router.get("/portfolio", response_model=list[PortfolioItemRead])
async def list_portfolio(db: DbDep) -> list[PortfolioItem]:
    result = await db.execute(
        select(PortfolioItem)
        .where(PortfolioItem.is_published.is_(True))
        .order_by(PortfolioItem.order)
    )
    return list(result.scalars().all())


@router.get("/portfolio/{slug}", response_model=PortfolioItemRead)
async def get_portfolio_item(slug: str, db: DbDep) -> PortfolioItem:
    result = await db.execute(
        select(PortfolioItem).where(
            PortfolioItem.slug == slug, PortfolioItem.is_published.is_(True)
        )
    )
    item = result.scalar_one_or_none()
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Portfolio tidak ditemukan")
    return item


@router.get("/blog", response_model=list[BlogPostRead])
async def list_blog_posts(db: DbDep) -> list[BlogPost]:
    result = await db.execute(
        select(BlogPost)
        .where(BlogPost.is_published.is_(True))
        .order_by(BlogPost.created_at.desc())
    )
    return list(result.scalars().all())


@router.get("/blog/{slug}", response_model=BlogPostRead)
async def get_blog_post(slug: str, db: DbDep) -> BlogPost:
    result = await db.execute(
        select(BlogPost).where(BlogPost.slug == slug, BlogPost.is_published.is_(True))
    )
    post = result.scalar_one_or_none()
    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Artikel tidak ditemukan")
    return post


@router.get("/team", response_model=list[TeamMemberRead])
async def list_team(db: DbDep) -> list[TeamMember]:
    result = await db.execute(
        select(TeamMember)
        .where(TeamMember.is_published.is_(True))
        .order_by(TeamMember.order)
    )
    return list(result.scalars().all())


@router.get("/testimonials", response_model=list[TestimonialRead])
async def list_testimonials(db: DbDep) -> list[Testimonial]:
    result = await db.execute(
        select(Testimonial)
        .where(Testimonial.is_published.is_(True))
        .order_by(Testimonial.order)
    )
    return list(result.scalars().all())
