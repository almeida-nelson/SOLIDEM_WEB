export default function InsuranceBanner() {
  return (
    <section style={{
      background: '#0a0a0a',
      borderTop: '1px solid rgba(255,255,255,0.06)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
      padding: '40px 32px',
    }}>
      <div style={{
        maxWidth: '1100px',
        margin: '0 auto',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '40px',
        justifyContent: 'space-between',
      }}>

        {/* Label */}
        <div style={{ flexShrink: 0 }}>
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '10px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#F7C100',
            margin: '0 0 4px',
          }}>
            Garanties professionnelles
          </p>
          <p style={{
            fontFamily: 'Poppins, sans-serif',
            fontSize: '12px',
            color: 'rgba(255,255,255,0.35)',
            margin: 0,
          }}>
            Assuré par SMA SA — Contrat ATOUTP Global
          </p>
        </div>

        {/* Guarantees */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          <GuaranteeChip
            title="Responsabilité Décennale"
            detail="Contrat n° 8637000 / 003 188615/24"
          />
          <GuaranteeChip
            title="Responsabilité Civile Professionnelle"
            detail="ATOUTP Global · SMA SA"
          />
          <GuaranteeChip
            title="Démolition & Terrassement"
            detail="G211 · G232 — France Métropolitaine"
          />
        </div>

      </div>
    </section>
  )
}

function GuaranteeChip({ title, detail }: { title: string; detail: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px 16px',
      border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: '8px',
      background: 'rgba(255,255,255,0.02)',
    }}>
      {/* Shield icon */}
      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#F7C100" strokeWidth="1.5" style={{ flexShrink: 0 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
      <div>
        <p style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '12px',
          fontWeight: 600,
          color: 'rgba(255,255,255,0.85)',
          margin: 0,
          lineHeight: 1.3,
        }}>{title}</p>
        <p style={{
          fontFamily: 'Poppins, sans-serif',
          fontSize: '10px',
          color: 'rgba(255,255,255,0.35)',
          margin: 0,
          lineHeight: 1.4,
          letterSpacing: '0.02em',
        }}>{detail}</p>
      </div>
    </div>
  )
}
