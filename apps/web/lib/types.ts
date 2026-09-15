export type Service = {
  id: number;
  slug: string;
  title: string;
  summary: string;
  description: string;
  icon: string;
  order: number;
};

export type PortfolioItem = {
  id: number;
  slug: string;
  title: string;
  client_name: string | null;
  summary: string;
  description: string;
  cover_image_url: string | null;
  tags: string;
  order: number;
};

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image_url: string | null;
  author_name: string;
};

export type TeamMember = {
  id: number;
  name: string;
  role: string;
  photo_url: string | null;
  bio: string;
  order: number;
};

export type Testimonial = {
  id: number;
  author_name: string;
  author_role: string;
  quote: string;
  order: number;
};

export type AboutContent = {
  heading: string;
  intro: string;
};
