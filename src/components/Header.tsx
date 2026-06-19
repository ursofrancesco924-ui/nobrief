'use client';
import Link from 'next/link';
import { useState } from 'react';

const NAV = [
  { label: 'Home', href: '/' },
  { label: 'Blog', href: '/blog' },
  { label: 'Chi Siamo', href: '/chi-siamo' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header style={{ background: '#0d0d0d', borderBottom: '1px solid #2a2520' }}>
      <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex flex-col leading-none group">
          <span
            className="text-xl font-bold tracking-[0.25em] uppercase"
            style={{ color: '#c9a84c', fontFamily: 'Georgia, serif' }}
          >
            Cult
          </span>
          <span
            className="text-xs tracking-[0.5em] uppercase"
            style={{ color: '#7a6e5e' }}
          >
            &amp; Crown
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className="text-sm tracking-widest uppercase transition-colors"
              style={{ color: '#a09080', fontFamily: 'Helvetica Neue, Arial, sans-serif' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#c9a84c')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#a09080')}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-5 h-px transition-all"
              style={{ background: '#c9a84c' }}
            />
          ))}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          className="md:hidden px-6 pb-6 flex flex-col gap-4"
          style={{ borderTop: '1px solid #2a2520' }}
        >
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="text-sm tracking-widest uppercase py-2"
              style={{ color: '#a09080' }}
            >
              {n.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
