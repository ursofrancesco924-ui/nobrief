import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-center">
      <span style={{ color: '#c9a84c', fontSize: 64, fontFamily: 'Georgia, serif', opacity: 0.3 }}>♛</span>
      <h1 className="mt-6 text-5xl font-bold" style={{ color: '#2a2520' }}>404</h1>
      <p className="mt-4 text-sm" style={{ color: '#5a5045', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}>
        Questa pagina non esiste.
      </p>
      <Link
        href="/"
        className="mt-8 text-xs tracking-widest uppercase px-8 py-3"
        style={{ color: '#c9a84c', border: '1px solid #3a3020' }}
      >
        Torna a casa
      </Link>
    </div>
  );
}
