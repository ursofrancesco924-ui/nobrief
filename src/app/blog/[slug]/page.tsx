import { getPost, getPostCategories, getAuthorName, formatDate, getFeaturedImageUrl } from '@/lib/wordpress';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

export const revalidate = 60;

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug).catch(() => null);
  if (!post) return { title: 'Articolo non trovato' };
  return {
    title: post.title.rendered.replace(/<[^>]+>/g, ''),
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug).catch(() => null);
  if (!post) notFound();

  const imageUrl = getFeaturedImageUrl(post);
  const categories = getPostCategories(post);
  const author = getAuthorName(post);

  return (
    <article>
      {/* Hero image */}
      <div className="relative w-full" style={{ height: 480, background: '#12100c' }}>
        {imageUrl !== '/placeholder.jpg' && (
          <Image
            src={imageUrl}
            alt={post.title.rendered}
            fill
            className="object-cover opacity-60"
            sizes="100vw"
            priority
          />
        )}
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #0d0d0d 0%, rgba(13,13,13,0.5) 50%, rgba(13,13,13,0.2) 100%)' }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-16 px-6 text-center">
          {categories[0] && (
            <Link
              href={`/categoria/${categories[0].slug}`}
              className="text-xs tracking-widest uppercase mb-4 hover:opacity-80"
              style={{ color: '#c9a84c', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
            >
              {categories[0].name}
            </Link>
          )}
          <h1
            className="text-3xl md:text-5xl font-bold max-w-3xl leading-snug"
            style={{ color: '#f0e8d8', fontFamily: 'Georgia, serif' }}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <p className="mt-4 text-sm" style={{ color: '#6a6058', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
            {author} &nbsp;·&nbsp; {formatDate(post.date)}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-6 py-16">
        <div
          className="wp-content"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* Back */}
        <div className="mt-16 pt-8" style={{ borderTop: '1px solid #2a2520' }}>
          <Link
            href="/blog"
            className="text-xs tracking-widest uppercase transition-colors"
            style={{ color: '#c9a84c', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
          >
            ← Torna al Blog
          </Link>
        </div>
      </div>
    </article>
  );
}
