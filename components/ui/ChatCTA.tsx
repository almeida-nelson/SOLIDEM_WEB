'use client'

export function ChatCTAPrimary({ label = 'Devis gratuit' }: { label?: string }) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        window.dispatchEvent(new CustomEvent('solidem:openChat', { detail: { mode: 'form' } }))
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 28px',
        background: '#F7C100',
        color: '#111111',
        fontFamily: 'Poppins, sans-serif',
        fontWeight: 700,
        fontSize: '14px',
        borderRadius: '6px',
        textDecoration: 'none',
        letterSpacing: '0.02em',
        cursor: 'pointer',
      }}
    >
      {label}
    </a>
  )
}

export function ChatCTASecondary({ label = 'Une question ?' }: { label?: string }) {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault()
        window.dispatchEvent(new CustomEvent('solidem:openChat', { detail: { mode: 'chat' } }))
      }}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '14px 24px',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: '6px',
        color: 'rgba(255,255,255,0.6)',
        fontFamily: 'Poppins, sans-serif',
        fontSize: '14px',
        textDecoration: 'none',
        cursor: 'pointer',
        background: 'transparent',
      }}
    >
      {label}
    </a>
  )
}
