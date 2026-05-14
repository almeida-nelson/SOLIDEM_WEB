'use client';
import Image from 'next/image';

export default function Navbar() {
  function openChat(e: React.MouseEvent) {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('solidem:openChat'));
  }

  return (
    <nav className="navbar">
      <div className="container-fluid" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" className="navbar-brand">
          <Image
            src="/assets/logosolidem-11.svg"
            alt="SOLIDEM"
            width={120}
            height={40}
            style={{ width: 120, height: 'auto' }}
            priority
          />
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'row', gap: '8px' }}>
            <li>
              <a className="topnavlink active" href="#">ACCUEIL</a>
            </li>
            <li>
              <a className="topnavlink" href="#" onClick={openChat}>CONTACTEZ-NOUS</a>
            </li>
          </ul>

        </div>
      </div>
    </nav>
  );
}
