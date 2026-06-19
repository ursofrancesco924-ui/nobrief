import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = { title: 'Chi Siamo' };

export default function ChiSiamoPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <p
          className="text-xs tracking-[0.6em] uppercase mb-4"
          style={{ color: '#c9a84c', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
        >
          La storia
        </p>
        <h1
          className="text-4xl font-bold"
          style={{ color: '#f0e8d8', fontFamily: 'Georgia, serif' }}
        >
          Chi Siamo
        </h1>
        <div className="flex items-center justify-center gap-4 mt-6 opacity-30">
          <div className="h-px w-20" style={{ background: '#c9a84c' }} />
          <span style={{ color: '#c9a84c' }}>♛</span>
          <div className="h-px w-20" style={{ background: '#c9a84c' }} />
        </div>
      </div>

      <div className="space-y-6" style={{ color: '#b0a898', fontFamily: 'Georgia, serif', lineHeight: 1.9 }}>
        <p>
          <strong style={{ color: '#f0e8d8' }}>Cult &amp; Crown</strong> nasce dall&rsquo;idea che la cultura
          non sia un privilegio ma una visione. Un modo di vedere il mondo, di abitarlo, di portarlo addosso.
        </p>
        <p>
          Parliamo di moda, arte, musica, cinema e lifestyle — non come categorie separate,
          ma come un&rsquo;unica corrente che definisce chi siamo e chi vogliamo essere.
        </p>
        <p>
          Ogni articolo è un invito a guardare oltre la superficie, a trovare il sacro nel quotidiano,
          la corona nell&rsquo;ordinario.
        </p>

        <div
          className="my-10 p-6 italic"
          style={{ borderLeft: '2px solid #c9a84c44', color: '#7a6e5e' }}
        >
          &ldquo;Il culto è l&rsquo;atto di riconoscere la bellezza dove gli altri vedono solo rumore.&rdquo;
        </div>

        <p>
          Benvenuto nella corona. Benvenuto nel culto.
        </p>
      </div>

      <div className="mt-16">
        <Link
          href="/blog"
          className="text-xs tracking-widest uppercase transition-colors"
          style={{ color: '#c9a84c', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
        >
          Leggi il Blog →
        </Link>
      </div>
    </div>
  );
}
