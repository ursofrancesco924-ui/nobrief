import Link from 'next/link';
import { getPosts } from '@/lib/wordpress';
import PostCard from '@/components/PostCard';

export const revalidate = 60;

export default async function HomePage() {
  let posts: Awaited<ReturnType<typeof getPosts>>['posts'] = [];
  let error = false;

  try {
    const data = await getPosts({ perPage: 7 });
    posts = data.posts;
  } catch {
    error = true;
  }

  const featured = posts[0];
  const rest = posts.slice(1, 7);

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex items-center justify-center text-center overflow-hidden"
        style={{
          minHeight: '60vh',
          background: 'linear-gradient(180deg, #0d0d0d 0%, #12100c 100%)',
        }}
      >
        {/* Decorative lines */}
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, #c9a84c44, transparent)' }}
        />
        <div className="relative z-10 px-6 py-24">
          <p
            className="text-xs tracking-[0.6em] uppercase mb-6"
            style={{ color: '#c9a84c', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
          >
            Il Magazine
          </p>
          <h1
            className="text-5xl md:text-7xl font-bold mb-4 tracking-tight"
            style={{ color: '#f0e8d8', fontFamily: 'Georgia, serif' }}
          >
            Cult &amp; Crown
          </h1>
          <div className="flex items-center justify-center gap-4 my-6 opacity-40">
            <div className="h-px w-20" style={{ background: '#c9a84c' }} />
            <span style={{ color: '#c9a84c' }}>♛</span>
            <div className="h-px w-20" style={{ background: '#c9a84c' }} />
          </div>
          <p
            className="text-base md:text-lg max-w-md mx-auto leading-relaxed"
            style={{ color: '#8a8070', fontFamily: 'Georgia, serif', fontStyle: 'italic' }}
          >
            Cultura, stile e visione.
          </p>
          <div className="mt-10">
            <Link
              href="/blog"
              className="inline-block text-xs tracking-widest uppercase px-8 py-3 transition-all"
              style={{
                color: '#c9a84c',
                border: '1px solid #c9a84c44',
                fontFamily: 'Helvetica Neue, Arial, sans-serif',
              }}
            >
              Scopri il Blog
            </Link>
          </div>
        </div>
        <div
          className="absolute inset-x-0 bottom-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, #c9a84c44, transparent)' }}
        />
      </section>

      {/* Posts */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        {error && (
          <div className="text-center py-20">
            <p className="text-sm" style={{ color: '#5a5045' }}>
              Impossibile connettersi a WordPress. Verifica la variabile{' '}
              <code className="text-gold">NEXT_PUBLIC_WORDPRESS_URL</code>.
            </p>
          </div>
        )}

        {!error && posts.length === 0 && (
          <div className="text-center py-20">
            <span style={{ color: '#c9a84c', fontSize: 40, fontFamily: 'Georgia, serif' }}>♛</span>
            <p className="mt-4 text-sm" style={{ color: '#5a5045' }}>
              Nessun articolo ancora. Pubblica il primo post su WordPress!
            </p>
          </div>
        )}

        {featured && (
          <div className="mb-12">
            <p
              className="text-xs tracking-[0.5em] uppercase mb-6"
              style={{ color: '#4a4038', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
            >
              In Evidenza
            </p>
            <PostCard post={featured} featured />
          </div>
        )}

        {rest.length > 0 && (
          <>
            <div className="flex items-center gap-4 mb-8 opacity-30">
              <div className="h-px flex-1" style={{ background: '#c9a84c' }} />
            </div>
            <p
              className="text-xs tracking-[0.5em] uppercase mb-6"
              style={{ color: '#4a4038', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
            >
              Ultimi Articoli
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rest.map((p) => (
                <PostCard key={p.id} post={p} />
              ))}
            </div>
          </>
        )}

        {posts.length > 0 && (
          <div className="text-center mt-12">
            <Link
              href="/blog"
              className="inline-block text-xs tracking-widest uppercase px-10 py-3 transition-all"
              style={{
                color: '#c9a84c',
                border: '1px solid #3a3020',
                fontFamily: 'Helvetica Neue, Arial, sans-serif',
              }}
            >
              Tutti gli Articoli →
            </Link>
          </div>
        )}
      </section>
    </>
  );
}
