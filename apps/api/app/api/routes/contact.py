from fastapi import APIRouter, BackgroundTasks, Request, status

from app.api.deps import DbDep
from app.core.config import get_settings
from app.core.email import send_lead_notification
from app.core.limiter import limiter
from app.models.lead import ContactSubmission
from app.schemas.lead import ContactCreate, ContactRead

router = APIRouter(tags=["contact"])
settings = get_settings()


@router.post("/contact", response_model=ContactRead, status_code=status.HTTP_201_CREATED)
@limiter.limit(settings.contact_rate_limit)
async def submit_contact(
    request: Request, payload: ContactCreate, db: DbDep, background_tasks: BackgroundTasks
) -> ContactSubmission:
    submission = ContactSubmission(
        name=payload.name,
        email=payload.email,
        phone=payload.phone,
        company=payload.company,
        service_interest=payload.service_interest,
        message=payload.message,
        source_ip=request.client.host if request.client else None,
    )
    db.add(submission)
    await db.commit()
    await db.refresh(submission)
    background_tasks.add_task(send_lead_notification, submission)
    return submission
