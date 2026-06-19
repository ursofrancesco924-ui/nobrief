import Link from 'next/link';
import Image from 'next/image';
import { WPPost, getFeaturedImageUrl, getPostCategories, formatDate } from '@/lib/wordpress';

interface Props {
  post: WPPost;
  featured?: boolean;
}

export default function PostCard({ post, featured = false }: Props) {
  const imageUrl = getFeaturedImageUrl(post);
  const categories = getPostCategories(post);

  if (featured) {
    return (
      <Link href={`/blog/${post.slug}`} className="group block relative overflow-hidden rounded-sm" style={{ minHeight: 480 }}>
        <div className="absolute inset-0">
          {imageUrl !== '/placeholder.jpg' ? (
            <Image
              src={imageUrl}
              alt={post.title.rendered}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 60vw"
              priority
            />
          ) : (
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #1a1510, #2a2018)' }} />
          )}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)' }} />
        </div>
        <div className="relative h-full flex flex-col justify-end p-8">
          {categories[0] && (
            <span className="text-xs tracking-widest uppercase mb-3 font-sans" style={{ color: '#c9a84c' }}>
              {categories[0].name}
            </span>
          )}
          <h2
            className="text-2xl md:text-3xl font-bold leading-snug mb-3 transition-colors group-hover:text-amber-200"
            style={{ color: '#f0e8d8' }}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          />
          <p className="text-sm" style={{ color: '#8a8070', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
            {formatDate(post.date)}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`} className="group block" style={{ background: '#141414', borderRadius: 2 }}>
      <div className="relative overflow-hidden" style={{ height: 220 }}>
        {imageUrl !== '/placeholder.jpg' ? (
          <Image
            src={imageUrl}
            alt={post.title.rendered}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, #1a1510, #2a2018)' }}>
            <div className="absolute inset-0 flex items-center justify-center opacity-20">
              <span style={{ color: '#c9a84c', fontSize: 48, fontFamily: 'Georgia, serif' }}>♛</span>
            </div>
          </div>
        )}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(20,20,20,0.6) 0%, transparent 60%)' }} />
      </div>

      <div className="p-5">
        {categories[0] && (
          <span className="text-xs tracking-widest uppercase" style={{ color: '#c9a84c', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
            {categories[0].name}
          </span>
        )}
        <h3
          className="mt-2 mb-3 text-base font-semibold leading-snug transition-colors group-hover:text-amber-200"
          style={{ color: '#e8dece' }}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <div
          className="text-xs line-clamp-2 mb-3"
          style={{ color: '#6a6058', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        <p className="text-xs" style={{ color: '#4a4038', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
          {formatDate(post.date)}
        </p>
      </div>
    </Link>
  );
}
