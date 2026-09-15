import logging
import smtplib
from email.message import EmailMessage

from app.core.config import get_settings
from app.models.lead import ContactSubmission

logger = logging.getLogger(__name__)


def send_lead_notification(lead: ContactSubmission) -> None:
    """Kirim email ke admin saat ada lead baru. Dipanggil sebagai background
    task dari endpoint /api/contact — kalau SMTP belum dikonfigurasi atau
    pengiriman gagal, cukup dicatat di log, tidak menggagalkan apa pun bagi
    pengunjung (lead tetap sudah tersimpan di database).
    """
    settings = get_settings()
    if not settings.smtp_host:
        return

    message = EmailMessage()
    message["Subject"] = f"Lead baru dari join.co.id: {lead.name}"
    message["From"] = settings.smtp_from
    message["To"] = settings.notify_email_to
    message["Reply-To"] = lead.email

    lines = [
        f"Nama: {lead.name}",
        f"Email: {lead.email}",
        f"Telepon: {lead.phone or '-'}",
        f"Perusahaan: {lead.company or '-'}",
        f"Layanan diminati: {lead.service_interest or '-'}",
        "",
        "Pesan:",
        lead.message,
        "",
        "--",
        "Balas email ini langsung untuk merespons ke pengirim, atau buka",
        "https://join.co.id/admin/leads",
    ]
    message.set_content("\n".join(lines))

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=10) as smtp:
            smtp.starttls()
            if settings.smtp_user:
                smtp.login(settings.smtp_user, settings.smtp_password)
            smtp.send_message(message)
    except Exception:
        logger.exception("Gagal mengirim notifikasi email untuk lead id=%s", lead.id)
