const WP_URL = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://tuosito.wordpress.com';

export interface WPPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  date: string;
  modified: string;
  featured_media: number;
  _embedded?: {
    'wp:featuredmedia'?: Array<{
      source_url: string;
      alt_text: string;
      media_details?: { sizes?: { medium_large?: { source_url: string } } };
    }>;
    'wp:term'?: Array<Array<{ id: number; name: string; slug: string }>>;
    author?: Array<{ name: string; avatar_urls?: Record<string, string> }>;
  };
}

export interface WPCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  description: string;
}

export interface WPPage {
  id: number;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
}

async function fetchWP<T>(path: string): Promise<T> {
  const res = await fetch(`${WP_URL}/wp-json/wp/v2${path}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`WordPress API error: ${res.status} ${path}`);
  return res.json();
}

export async function getPosts(params?: {
  page?: number;
  perPage?: number;
  categoryId?: number;
  search?: string;
}): Promise<{ posts: WPPost[]; total: number; totalPages: number }> {
  const { page = 1, perPage = 9, categoryId, search } = params || {};
  const qs = new URLSearchParams({
    _embed: '1',
    per_page: String(perPage),
    page: String(page),
    ...(categoryId ? { categories: String(categoryId) } : {}),
    ...(search ? { search } : {}),
  });
  const res = await fetch(`${WP_URL}/wp-json/wp/v2/posts?${qs}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`WordPress API error: ${res.status}`);
  const posts: WPPost[] = await res.json();
  const total = Number(res.headers.get('X-WP-Total') || 0);
  const totalPages = Number(res.headers.get('X-WP-TotalPages') || 1);
  return { posts, total, totalPages };
}

export async function getPost(slug: string): Promise<WPPost | null> {
  const posts = await fetchWP<WPPost[]>(`/posts?slug=${slug}&_embed=1`);
  return posts[0] || null;
}

export async function getCategories(): Promise<WPCategory[]> {
  return fetchWP<WPCategory[]>('/categories?per_page=20&hide_empty=true');
}

export async function getPage(slug: string): Promise<WPPage | null> {
  const pages = await fetchWP<WPPage[]>(`/pages?slug=${slug}`);
  return pages[0] || null;
}

export function getFeaturedImageUrl(post: WPPost): string {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  return (
    media?.media_details?.sizes?.medium_large?.source_url ||
    media?.source_url ||
    '/placeholder.jpg'
  );
}

export function getPostCategories(post: WPPost) {
  return post._embedded?.['wp:term']?.[0] || [];
}

export function getAuthorName(post: WPPost): string {
  return post._embedded?.author?.[0]?.name || 'Cult & Crown';
}

export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('it-IT', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}
