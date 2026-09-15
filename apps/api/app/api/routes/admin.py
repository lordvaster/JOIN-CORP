from fastapi import APIRouter, HTTPException, status
from sqlalchemy import select

from app.api.deps import DbDep
from app.core.security import CurrentAdmin
from app.models.content import AboutContent, BlogPost, PortfolioItem, Service, TeamMember, Testimonial
from app.models.lead import ContactSubmission
from app.schemas.content import (
    AboutContentRead,
    AboutContentWrite,
    BlogPostRead,
    BlogPostWrite,
    PortfolioItemRead,
    PortfolioItemWrite,
    ServiceRead,
    ServiceWrite,
    TeamMemberRead,
    TeamMemberWrite,
    TestimonialRead,
    TestimonialWrite,
)
from app.schemas.lead import ContactRead

router = APIRouter(prefix="/admin", tags=["admin"])


# --- Services -----------------------------------------------------------
@router.get("/services", response_model=list[ServiceRead])
async def admin_list_services(db: DbDep, _admin: CurrentAdmin) -> list[Service]:
    result = await db.execute(select(Service).order_by(Service.order))
    return list(result.scalars().all())


@router.post("/services", response_model=ServiceRead, status_code=status.HTTP_201_CREATED)
async def admin_create_service(payload: ServiceWrite, db: DbDep, _admin: CurrentAdmin) -> Service:
    service = Service(**payload.model_dump())
    db.add(service)
    await db.commit()
    await db.refresh(service)
    return service


@router.put("/services/{service_id}", response_model=ServiceRead)
async def admin_update_service(
    service_id: int, payload: ServiceWrite, db: DbDep, _admin: CurrentAdmin
) -> Service:
    service = await db.get(Service, service_id)
    if service is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Layanan tidak ditemukan")
    for field, value in payload.model_dump().items():
        setattr(service, field, value)
    await db.commit()
    await db.refresh(service)
    return service


@router.delete("/services/{service_id}", status_code=status.HTTP_204_NO_CONTENT)
async def admin_delete_service(service_id: int, db: DbDep, _admin: CurrentAdmin) -> None:
    service = await db.get(Service, service_id)
    if service is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Layanan tidak ditemukan")
    await db.delete(service)
    await db.commit()


# --- Portfolio ------------------------------------------------------------
@router.get("/portfolio", response_model=list[PortfolioItemRead])
async def admin_list_portfolio(db: DbDep, _admin: CurrentAdmin) -> list[PortfolioItem]:
    result = await db.execute(select(PortfolioItem).order_by(PortfolioItem.order))
    return list(result.scalars().all())


@router.post("/portfolio", response_model=PortfolioItemRead, status_code=status.HTTP_201_CREATED)
async def admin_create_portfolio(
    payload: PortfolioItemWrite, db: DbDep, _admin: CurrentAdmin
) -> PortfolioItem:
    item = PortfolioItem(**payload.model_dump())
    db.add(item)
    await db.commit()
    await db.refresh(item)
    return item


@router.put("/portfolio/{item_id}", response_model=PortfolioItemRead)
async def admin_update_portfolio(
    item_id: int, payload: PortfolioItemWrite, db: DbDep, _admin: CurrentAdmin
) -> PortfolioItem:
    item = await db.get(PortfolioItem, item_id)
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Portfolio tidak ditemukan")
    for field, value in payload.model_dump().items():
        setattr(item, field, value)
    await db.commit()
    await db.refresh(item)
    return item


@router.delete("/portfolio/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def admin_delete_portfolio(item_id: int, db: DbDep, _admin: CurrentAdmin) -> None:
    item = await db.get(PortfolioItem, item_id)
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Portfolio tidak ditemukan")
    await db.delete(item)
    await db.commit()


# --- Blog -------------------------------------------------------------
@router.get("/blog", response_model=list[BlogPostRead])
async def admin_list_blog(db: DbDep, _admin: CurrentAdmin) -> list[BlogPost]:
    result = await db.execute(select(BlogPost).order_by(BlogPost.created_at.desc()))
    return list(result.scalars().all())


@router.post("/blog", response_model=BlogPostRead, status_code=status.HTTP_201_CREATED)
async def admin_create_blog(payload: BlogPostWrite, db: DbDep, _admin: CurrentAdmin) -> BlogPost:
    post = BlogPost(**payload.model_dump())
    db.add(post)
    await db.commit()
    await db.refresh(post)
    return post


@router.put("/blog/{post_id}", response_model=BlogPostRead)
async def admin_update_blog(
    post_id: int, payload: BlogPostWrite, db: DbDep, _admin: CurrentAdmin
) -> BlogPost:
    post = await db.get(BlogPost, post_id)
    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Artikel tidak ditemukan")
    for field, value in payload.model_dump().items():
        setattr(post, field, value)
    await db.commit()
    await db.refresh(post)
    return post


@router.delete("/blog/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def admin_delete_blog(post_id: int, db: DbDep, _admin: CurrentAdmin) -> None:
    post = await db.get(BlogPost, post_id)
    if post is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Artikel tidak ditemukan")
    await db.delete(post)
    await db.commit()


# --- Testimonials ----------------------------------------------------
@router.get("/testimonials", response_model=list[TestimonialRead])
async def admin_list_testimonials(db: DbDep, _admin: CurrentAdmin) -> list[Testimonial]:
    result = await db.execute(select(Testimonial).order_by(Testimonial.order))
    return list(result.scalars().all())


@router.post("/testimonials", response_model=TestimonialRead, status_code=status.HTTP_201_CREATED)
async def admin_create_testimonial(
    payload: TestimonialWrite, db: DbDep, _admin: CurrentAdmin
) -> Testimonial:
    testimonial = Testimonial(**payload.model_dump())
    db.add(testimonial)
    await db.commit()
    await db.refresh(testimonial)
    return testimonial


@router.put("/testimonials/{testimonial_id}", response_model=TestimonialRead)
async def admin_update_testimonial(
    testimonial_id: int, payload: TestimonialWrite, db: DbDep, _admin: CurrentAdmin
) -> Testimonial:
    testimonial = await db.get(Testimonial, testimonial_id)
    if testimonial is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Testimoni tidak ditemukan")
    for field, value in payload.model_dump().items():
        setattr(testimonial, field, value)
    await db.commit()
    await db.refresh(testimonial)
    return testimonial


@router.delete("/testimonials/{testimonial_id}", status_code=status.HTTP_204_NO_CONTENT)
async def admin_delete_testimonial(testimonial_id: int, db: DbDep, _admin: CurrentAdmin) -> None:
    testimonial = await db.get(Testimonial, testimonial_id)
    if testimonial is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Testimoni tidak ditemukan")
    await db.delete(testimonial)
    await db.commit()


# --- About page (singleton) ----------------------------------------------
@router.get("/about", response_model=AboutContentRead)
async def admin_get_about(db: DbDep, _admin: CurrentAdmin) -> AboutContent:
    about = await db.get(AboutContent, 1)
    if about is None:
        about = AboutContent(id=1, heading="PT Jofael Inovasi Nusantara", intro="")
        db.add(about)
        await db.commit()
        await db.refresh(about)
    return about


@router.put("/about", response_model=AboutContentRead)
async def admin_update_about(
    payload: AboutContentWrite, db: DbDep, _admin: CurrentAdmin
) -> AboutContent:
    about = await db.get(AboutContent, 1)
    if about is None:
        about = AboutContent(id=1, **payload.model_dump())
        db.add(about)
    else:
        for field, value in payload.model_dump().items():
            setattr(about, field, value)
    await db.commit()
    await db.refresh(about)
    return about


# --- Team members ----------------------------------------------------
@router.get("/team", response_model=list[TeamMemberRead])
async def admin_list_team(db: DbDep, _admin: CurrentAdmin) -> list[TeamMember]:
    result = await db.execute(select(TeamMember).order_by(TeamMember.order))
    return list(result.scalars().all())


@router.post("/team", response_model=TeamMemberRead, status_code=status.HTTP_201_CREATED)
async def admin_create_team_member(
    payload: TeamMemberWrite, db: DbDep, _admin: CurrentAdmin
) -> TeamMember:
    member = TeamMember(**payload.model_dump())
    db.add(member)
    await db.commit()
    await db.refresh(member)
    return member


@router.put("/team/{member_id}", response_model=TeamMemberRead)
async def admin_update_team_member(
    member_id: int, payload: TeamMemberWrite, db: DbDep, _admin: CurrentAdmin
) -> TeamMember:
    member = await db.get(TeamMember, member_id)
    if member is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Anggota tim tidak ditemukan")
    for field, value in payload.model_dump().items():
        setattr(member, field, value)
    await db.commit()
    await db.refresh(member)
    return member


@router.delete("/team/{member_id}", status_code=status.HTTP_204_NO_CONTENT)
async def admin_delete_team_member(member_id: int, db: DbDep, _admin: CurrentAdmin) -> None:
    member = await db.get(TeamMember, member_id)
    if member is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Anggota tim tidak ditemukan")
    await db.delete(member)
    await db.commit()


# --- Leads (contact submissions) -----------------------------------------
@router.get("/leads", response_model=list[ContactRead])
async def admin_list_leads(db: DbDep, _admin: CurrentAdmin) -> list[ContactSubmission]:
    result = await db.execute(select(ContactSubmission).order_by(ContactSubmission.created_at.desc()))
    return list(result.scalars().all())


@router.patch("/leads/{lead_id}/handled", response_model=ContactRead)
async def admin_mark_lead_handled(lead_id: int, db: DbDep, _admin: CurrentAdmin) -> ContactSubmission:
    lead = await db.get(ContactSubmission, lead_id)
    if lead is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Lead tidak ditemukan")
    lead.is_handled = True
    await db.commit()
    await db.refresh(lead)
    return lead
