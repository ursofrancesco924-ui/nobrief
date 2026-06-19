import { getPosts, getCategories } from '@/lib/wordpress';
import PostCard from '@/components/PostCard';
import Pagination from '@/components/Pagination';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ page?: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories().catch(() => []);
  const cat = categories.find((c) => c.slug === slug);
  return { title: cat?.name || 'Categoria' };
}

export default async function CategoriaPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const sp = await searchParams;
  const page = Number(sp.page || 1);

  const categories = await getCategories().catch(() => []);
  const cat = categories.find((c) => c.slug === slug);
  if (!cat) notFound();

  const { posts, totalPages } = await getPosts({
    page,
    perPage: 9,
    categoryId: cat.id,
  }).catch(() => ({ posts: [], totalPages: 1, total: 0 }));

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <p
          className="text-xs tracking-[0.6em] uppercase mb-4"
          style={{ color: '#c9a84c', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
        >
          Categoria
        </p>
        <h1
          className="text-4xl font-bold"
          style={{ color: '#f0e8d8', fontFamily: 'Georgia, serif' }}
        >
          {cat.name}
        </h1>
        <div className="flex items-center justify-center gap-4 mt-6 opacity-30">
          <div className="h-px w-20" style={{ background: '#c9a84c' }} />
          <span style={{ color: '#c9a84c' }}>♛</span>
          <div className="h-px w-20" style={{ background: '#c9a84c' }} />
        </div>
      </div>

      {posts.length === 0 ? (
        <p className="text-center text-sm" style={{ color: '#5a5045' }}>
          Nessun articolo in questa categoria.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((p) => (
            <PostCard key={p.id} post={p} />
          ))}
        </div>
      )}

      <Pagination currentPage={page} totalPages={totalPages} baseUrl={`/categoria/${slug}`} />
    </div>
  );
}
