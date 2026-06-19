import Link from 'next/link';

export default function Footer() {
  return (
    <footer style={{ background: '#0a0a0a', borderTop: '1px solid #2a2520' }}>
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          {/* Brand */}
          <div>
            <p
              className="text-2xl font-bold tracking-[0.25em] uppercase mb-1"
              style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}
            >
              Cult &amp; Crown
            </p>
            <p className="text-sm" style={{ color: '#5a5045' }}>
              Cultura, stile e visione.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <p className="text-xs tracking-widest uppercase mb-2" style={{ color: '#5a5045' }}>
              Naviga
            </p>
            {[
              { label: 'Home', href: '/' },
              { label: 'Blog', href: '/blog' },
              { label: 'Chi Siamo', href: '/chi-siamo' },
            ].map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm transition-colors hover:text-amber-400"
                style={{ color: '#7a6e5e' }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3"
          style={{ borderTop: '1px solid #1a1a1a' }}
        >
          <p className="text-xs" style={{ color: '#3a3428' }}>
            © {new Date().getFullYear()} Cult &amp; Crown. Tutti i diritti riservati.
          </p>
          <p className="text-xs" style={{ color: '#3a3428' }}>
            Powered by WordPress &amp; Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
