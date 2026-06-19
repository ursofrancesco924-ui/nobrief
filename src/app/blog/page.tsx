import { getPosts, getCategories } from '@/lib/wordpress';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import type { Metadata } from 'next';

export const revalidate = 60;
export const metadata: Metadata = { title: 'Blog' };

interface Props {
  searchParams: Promise<{ page?: string; categoria?: string }>;
}

export default async function BlogPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Number(params.page || 1);

  let posts: Awaited<ReturnType<typeof getPosts>>['posts'] = [];
  let totalPages = 1;
  let categories: Awaited<ReturnType<typeof getCategories>> = [];

  try {
    const [data, cats] = await Promise.all([
      getPosts({ page, perPage: 9 }),
      getCategories(),
    ]);
    posts = data.posts;
    totalPages = data.totalPages;
    categories = cats;
  } catch {
    // silently show empty state
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      {/* Header */}
      <div className="text-center mb-16">
        <p
          className="text-xs tracking-[0.6em] uppercase mb-4"
          style={{ color: '#c9a84c', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
        >
          Magazine
        </p>
        <h1
          className="text-4xl font-bold"
          style={{ color: '#f0e8d8', fontFamily: 'Georgia, serif' }}
        >
          Blog
        </h1>
        <div className="flex items-center justify-center gap-4 mt-6 opacity-30">
          <div className="h-px w-20" style={{ background: '#c9a84c' }} />
          <span style={{ color: '#c9a84c' }}>♛</span>
          <div className="h-px w-20" style={{ background: '#c9a84c' }} />
        </div>
      </div>

      {/* Categories */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categoria/${cat.slug}`}
              className="text-xs tracking-widest uppercase px-4 py-2 transition-all"
              style={{
                color: '#7a6e5e',
                border: '1px solid #2a2520',
                fontFamily: 'Helvetica Neue, Arial, sans-serif',
              }}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      {/* Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-24">
          <span style={{ color: '#c9a84c', fontSize: 40 }}>♛</span>
          <p className="mt-4 text-sm" style={{ color: '#5a5045' }}>
            Nessun articolo trovato.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} baseUrl="/blog" />
    </div>
  );
}
