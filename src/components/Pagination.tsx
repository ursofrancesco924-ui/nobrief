import Link from 'next/link';

interface Props {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}

export default function Pagination({ currentPage, totalPages, baseUrl }: Props) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-16">
      {currentPage > 1 && (
        <Link
          href={`${baseUrl}?page=${currentPage - 1}`}
          className="px-4 py-2 text-sm tracking-widest uppercase transition-colors"
          style={{ color: '#c9a84c', border: '1px solid #3a3020', borderRadius: 2 }}
        >
          ← Prec
        </Link>
      )}
      {pages.map((p) => (
        <Link
          key={p}
          href={`${baseUrl}?page=${p}`}
          className="w-9 h-9 flex items-center justify-center text-sm transition-all"
          style={{
            background: p === currentPage ? '#c9a84c' : 'transparent',
            color: p === currentPage ? '#0d0d0d' : '#7a6e5e',
            border: `1px solid ${p === currentPage ? '#c9a84c' : '#2a2520'}`,
            borderRadius: 2,
            fontFamily: 'Helvetica Neue, Arial, sans-serif',
          }}
        >
          {p}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link
          href={`${baseUrl}?page=${currentPage + 1}`}
          className="px-4 py-2 text-sm tracking-widest uppercase transition-colors"
          style={{ color: '#c9a84c', border: '1px solid #3a3020', borderRadius: 2 }}
        >
          Succ →
        </Link>
      )}
    </div>
  );
}
