'use client';
import Image from 'next/image';

export default function FooterSection() {
  function openChat(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('solidem:openChat'));
  }

  function scrollTop(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const TEXT = '#9a9b9a';

  return (
    <footer className="pb-6 pt-16 lg:pb-8 lg:pt-24" style={{ background: '#111111' }}>
      <div className="px-4 lg:px-8">
        <div className="md:flex md:items-start md:justify-between">
          <div className="flex flex-col gap-2">
            <a href="#" onClick={scrollTop} className="flex items-center gap-x-2" aria-label="SOLIDEM">
              <Image src="/assets/logosolidem-11.svg" alt="SOLIDEM" width={100} height={34} style={{ width: 100, height: 'auto' }} />
            </a>
            <p style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '11px',
              letterSpacing: '0.12em',
              color: 'rgba(154,155,154,0.45)',
              margin: 0,
            }}>
              Précision technique. Impact minimal.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2 mt-6 md:mt-0">
            <p style={{
              fontFamily: 'Poppins, sans-serif',
              fontSize: '10px',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'rgba(154,155,154,0.45)',
              margin: 0,
            }}>
              Découvrez nos coulisses techniques
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              {[
                {
                  label: 'Instagram',
                  href: 'https://www.instagram.com/_solidem',
                  icon: (
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  ),
                },
                {
                  label: 'TikTok',
                  href: 'https://www.tiktok.com/@nels_solidem',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.52V6.75a4.85 4.85 0 01-1.02-.06z"/>
                    </svg>
                  ),
                },
                {
                  label: 'LinkedIn',
                  href: 'https://www.linkedin.com/company/solidem-sas/',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '38px',
                    height: '38px',
                    borderRadius: '8px',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    color: 'rgba(154,155,154,0.7)',
                    textDecoration: 'none',
                    transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(247,193,0,0.1)';
                    el.style.color = '#F7C100';
                    el.style.borderColor = 'rgba(247,193,0,0.25)';
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.background = 'rgba(255,255,255,0.04)';
                    el.style.color = 'rgba(154,155,154,0.7)';
                    el.style.borderColor = 'rgba(255,255,255,0.07)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 md:mt-4 md:pt-8 lg:grid lg:grid-cols-10"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <nav className="lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-2 lg:justify-end">
              {[
                { label: "Déconstruction", onClick: scrollTop },
                { label: "Dépollution", onClick: scrollTop },
                { label: "Terrassement", onClick: scrollTop },
                { label: "Aménagements Extérieurs", onClick: scrollTop },
                { label: "Contactez-Nous", onClick: openChat },
              ].map((link, i) => (
                <li key={i} className="my-1 mx-2 shrink-0">
                  <a href="#" onClick={link.onClick}
                    className="text-sm underline-offset-4 hover:underline"
                    style={{ color: TEXT }}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-6 lg:mt-0 lg:col-[4/11]">
            <ul className="list-none flex flex-wrap -my-1 -mx-3 lg:justify-end">
              <li className="my-1 mx-3 shrink-0">
                <span className="text-sm" style={{ color: TEXT }}>
                  28 Rue de l&apos;Église, 95170 Deuil-la-Barre
                </span>
              </li>
              <li className="my-1 mx-3 shrink-0">
                <a href="/cgv" className="text-sm underline-offset-4 hover:underline" style={{ color: TEXT }}>
                  CGV
                </a>
              </li>
              <li className="my-1 mx-3 shrink-0">
                <a href="/mentions-legales" className="text-sm underline-offset-4 hover:underline" style={{ color: TEXT }}>
                  Mentions légales
                </a>
              </li>
              <li className="my-1 mx-3 shrink-0">
                <a href="/confidentialite" className="text-sm underline-offset-4 hover:underline" style={{ color: TEXT }}>
                  Confidentialité
                </a>
              </li>
            </ul>
          </div>

          <div className="mt-6 text-sm leading-6 lg:mt-0 lg:row-[1/3] lg:col-[1/4]" style={{ color: TEXT }}>
            <div>© 2026 SOLIDEM</div>
            <div>Tous droits réservés</div>
          </div>
        </div>

        {/* Insurance */}
        <div className="mt-6 pt-6 flex flex-wrap gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          {[
            { label: 'Responsabilité Décennale', detail: 'SMA SA · Contrat 8637000/003 188615/24' },
            { label: 'Responsabilité Civile Professionnelle', detail: 'ATOUTP Global · SMA SA' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="#F7C100" strokeWidth="1.5" style={{ flexShrink: 0, opacity: 0.7 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '11px', color: 'rgba(154,155,154,0.6)' }}>
                <span style={{ color: 'rgba(154,155,154,0.9)', fontWeight: 500 }}>{item.label}</span>
                {' · '}
                {item.detail}
              </span>
            </div>
          ))}
        </div>

      </div>
    </footer>
  );
}
