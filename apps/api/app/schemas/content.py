from pydantic import BaseModel, ConfigDict


class ServiceRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    title: str
    summary: str
    description: str
    icon: str
    order: int
    is_published: bool


class ServiceWrite(BaseModel):
    slug: str
    title: str
    summary: str
    description: str
    icon: str = "sparkles"
    order: int = 0
    is_published: bool = True


class PortfolioItemRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    title: str
    client_name: str | None
    summary: str
    description: str
    cover_image_url: str | None
    tags: str
    order: int
    is_published: bool


class PortfolioItemWrite(BaseModel):
    slug: str
    title: str
    client_name: str | None = None
    summary: str
    description: str
    cover_image_url: str | None = None
    tags: str = ""
    order: int = 0
    is_published: bool = True


class BlogPostRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    title: str
    excerpt: str
    content: str
    cover_image_url: str | None
    author_name: str
    is_published: bool


class BlogPostWrite(BaseModel):
    slug: str
    title: str
    excerpt: str
    content: str
    cover_image_url: str | None = None
    author_name: str = "Tim JOIN"
    is_published: bool = False


class TeamMemberRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    role: str
    photo_url: str | None
    bio: str
    order: int
    is_published: bool


class TestimonialRead(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    author_name: str
    author_role: str
    quote: str
    order: int
