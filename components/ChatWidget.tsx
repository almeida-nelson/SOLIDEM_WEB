'use client';
import { memo, useCallback, useEffect, useRef, useState } from 'react';

interface Message {
  text: string;
  isUser: boolean;
  photos?: string[];
}

type Mode = 'chat' | 'form';

const QUICK_REPLIES = [
  'Demander un devis',
  'Zone d\'intervention',
  'Délais d\'intervention',
];

const SUBJECTS = [
  "Demande d'informations",
  "Estimation de travaux / Devis",
  "Déconstruction",
  "Dépollution",
  "Terrassement",
  "Aménagements extérieurs / VRD",
  "Autre",
];

// Stable reference — not recreated on every ContactForm re-render
const fieldBase: React.CSSProperties = {
  width: '100%',
  background: 'rgba(255,255,255,0.04)',
  border: 'none',
  borderBottom: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 0,
  padding: '10px 2px',
  color: '#fff',
  fontFamily: 'Poppins, sans-serif',
  fontSize: '13px',
  outline: 'none',
  transition: 'border-color 0.2s',
};

// Memoised — only re-renders when messages or loading changes, not on input keystroke
const MessageList = memo(function MessageList({
  messages,
  loading,
  onQuickReply,
  endRef,
}: {
  messages: Message[];
  loading: boolean;
  onQuickReply: (text: string) => void;
  endRef: React.RefObject<HTMLDivElement | null>;
}) {
  return (
    <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px', display: 'flex', flexDirection: 'column', gap: '12px', scrollbarWidth: 'thin', scrollbarColor: 'rgba(247,193,0,0.1) transparent' }}>
      {messages.length === 0 ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px', padding: '20px', textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', borderRadius: '16px', background: 'rgba(247,193,0,0.08)', border: '1px solid rgba(247,193,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="#F7C100" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9  5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456z"/>
            </svg>
          </div>
          <div>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '15px', fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>Comment puis-je vous aider ?</p>
            <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '12px', color: 'rgba(255,255,255,0.35)', margin: 0, lineHeight: 1.6, maxWidth: '260px' }}>Déconstruction, dépollution, terrassement, aménagements extérieurs.</p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
            {QUICK_REPLIES.map(qr => (
              <button key={qr} onClick={() => onQuickReply(qr)} style={{ padding: '7px 14px', background: 'rgba(247,193,0,0.07)', border: '1px solid rgba(247,193,0,0.2)', borderRadius: '20px', color: 'rgba(255,255,255,0.7)', fontFamily: 'Poppins, sans-serif', fontSize: '11px', cursor: 'pointer', transition: 'all 0.2s', letterSpacing: '0.02em' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.background = 'rgba(247,193,0,0.14)'; el.style.color = '#F7C100'; el.style.borderColor = 'rgba(247,193,0,0.4)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.background = 'rgba(247,193,0,0.07)'; el.style.color = 'rgba(255,255,255,0.7)'; el.style.borderColor = 'rgba(247,193,0,0.2)'; }}>
                {qr}
              </button>
            ))}
          </div>
        </div>
      ) : messages.map((m, i) => (
        <div key={i} style={{ display: 'flex', justifyContent: m.isUser ? 'flex-end' : 'flex-start', animation: 'msgIn 0.25s ease', gap: '8px', alignItems: 'flex-end' }}>
          {!m.isUser && (
            <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(247,193,0,0.1)', border: '1px solid rgba(247,193,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginBottom: '2px' }}>
              <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="#F7C100" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>
            </div>
          )}
          <div style={{ maxWidth: '75%', padding: '10px 14px', fontFamily: 'Poppins, sans-serif', fontSize: '13px', lineHeight: 1.6, borderRadius: m.isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px', background: m.isUser ? '#F7C100' : 'rgba(255,255,255,0.06)', color: m.isUser ? '#111' : 'rgba(255,255,255,0.85)', fontWeight: m.isUser ? 500 : 400, border: m.isUser ? 'none' : '1px solid rgba(255,255,255,0.07)' }}>
            {m.photos?.length ? (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: m.text ? '8px' : 0 }}>
                {m.photos.map((url, pi) => <img key={pi} src={url} alt="" style={{ width: '76px', height: '76px', objectFit: 'cover', borderRadius: '8px' }} />)}
              </div>
            ) : null}
            {m.text}
          </div>
        </div>
      ))}
      {loading && (
        <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: 'rgba(247,193,0,0.1)', border: '1px solid rgba(247,193,0,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <svg width="11" height="11" fill="none" viewBox="0 0 24 24" stroke="#F7C100" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg>
          </div>
          <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.07)', borderRadius: '16px 16px 16px 4px', display: 'flex', gap: '5px', alignItems: 'center' }}>
            {[0, 0.18, 0.36].map((delay, i) => <span key={i} style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#F7C100', display: 'block', animation: `typingBounce 1.3s ${delay}s infinite` }} />)}
          </div>
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
});

/* ── Contact form ── */
function ContactForm({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !message.trim()) {
      setError('Veuillez renseigner votre nom, téléphone et message.');
      return;
    }
    setError('');
    setStatus('sending');
    const fd = new FormData();
    fd.append('name', name); fd.append('phone', phone);
    fd.append('email', email); fd.append('subject', subject);
    fd.append('message', message);
    try {
      const res = await fetch('/api/contact', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) { setStatus('sent'); setTimeout(onClose, 2500); }
      else { setError(data.error || "Une erreur est survenue."); setStatus('error'); }
    } catch { setError('Erreur réseau. Veuillez réessayer.'); setStatus('error'); }
  }

  if (status === 'sent') return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(247,193,0,0.1)', border: '1px solid rgba(247,193,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="#F7C100" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <p style={{ fontFamily: 'Poppins, sans-serif', color: '#fff', fontSize: '15px', fontWeight: 600, margin: '0 0 6px' }}>Message envoyé</p>
        <p style={{ fontFamily: 'Poppins, sans-serif', color: 'rgba(255,255,255,0.4)', fontSize: '12px', margin: 0, lineHeight: 1.6 }}>Notre équipe vous recontactera<br/>sous 24–48h ouvrées.</p>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} style={{ flex: 1, overflowY: 'auto', padding: '20px 20px 16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <style>{`
        .solidem-field:focus { border-bottom-color: #F7C100 !important; }
        .solidem-field::placeholder { color: rgba(255,255,255,0.25); }
        .solidem-field option { background: #1a1a1a; color: #fff; }
      `}</style>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 16px' }}>
        <input className="solidem-field" style={fieldBase} placeholder="Nom, Prénom *" value={name} onChange={e => setName(e.target.value)} autoComplete="name" />
        <input className="solidem-field" style={fieldBase} placeholder="Téléphone *" value={phone} onChange={e => setPhone(e.target.value)} autoComplete="tel" inputMode="tel" />
      </div>
      <input className="solidem-field" style={fieldBase} placeholder="E-mail (optionnel)" value={email} onChange={e => setEmail(e.target.value)} autoComplete="email" />
      <select className="solidem-field" style={{ ...fieldBase, cursor: 'pointer' }} value={subject} onChange={e => setSubject(e.target.value)}>
        {SUBJECTS.map(s => <option key={s} value={s}>{s}</option>)}
      </select>
      <textarea className="solidem-field" style={{ ...fieldBase, resize: 'none', minHeight: '80px', lineHeight: 1.6 }} placeholder="Votre message *" value={message} onChange={e => setMessage(e.target.value)} rows={3} />

      {error && <p style={{ fontFamily: 'Poppins, sans-serif', color: '#ef4444', fontSize: '11px', margin: 0 }}>{error}</p>}

      <button type="submit" disabled={status === 'sending'} style={{
        width: '100%', padding: '12px',
        background: status === 'sending' ? 'rgba(247,193,0,0.5)' : '#F7C100',
        border: 'none', borderRadius: '6px',
        color: '#111', fontFamily: 'Poppins, sans-serif',
        fontWeight: 700, fontSize: '13px', letterSpacing: '0.05em',
        cursor: status === 'sending' ? 'not-allowed' : 'pointer',
        transition: 'background 0.2s',
        textTransform: 'uppercase',
      }}>
        {status === 'sending' ? 'Envoi…' : 'Envoyer la demande'}
      </button>
      <p style={{ fontFamily: 'Poppins, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.2)', margin: 0, textAlign: 'center', letterSpacing: '0.04em' }}>
        RÉPONSE SOUS 24–48H · AUCUN DÉMARCHAGE
      </p>
    </form>
  );
}

/* ── Main widget ── */
export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<Mode>('chat');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [pendingPhotos, setPendingPhotos] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function openHandler(e: Event) {
      const detail = (e as CustomEvent<{ mode?: Mode }>).detail;
      if (detail?.mode) setMode(detail.mode);
      setIsOpen(true);
    }
    window.addEventListener('solidem:openChat', openHandler);
    return () => window.removeEventListener('solidem:openChat', openHandler);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []).slice(0, 3 - pendingPhotos.length);
    if (!files.length) return;
    e.target.value = '';
    setUploading(true);
    const urls: string[] = [];
    for (const file of files) {
      const fd = new FormData();
      fd.append('file', file);
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        const data = await res.json();
        if (data.url) urls.push(data.url);
      } catch { /* skip */ }
    }
    setPendingPhotos(prev => [...prev, ...urls].slice(0, 3));
    setUploading(false);
  }

  const removePhoto = useCallback((url: string) => {
    setPendingPhotos(prev => prev.filter(u => u !== url));
  }, []);

  async function sendMessage(e: React.FormEvent | null, overrideText?: string) {
    if (e) e.preventDefault();
    const msg = (overrideText ?? input).trim();
    if ((!msg && !pendingPhotos.length) || loading) return;

    const newMsg: Message = { text: msg, isUser: true, photos: pendingPhotos.length ? [...pendingPhotos] : undefined };
    const newHistory: Message[] = [...messages, newMsg];
    setMessages(newHistory);
    setInput('');
    setPendingPhotos([]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history: newHistory, photos: newMsg.photos }),
      });
      const data = await res.json();
      const reply = data?.response ?? 'Désolé, je ne peux pas répondre pour le moment.';
      const updated: Message[] = [...newHistory, { text: reply, isUser: false }];
      if (data?.emailFailed) updated.push({ text: "Votre demande a bien été enregistrée. Notre équipe vous recontactera sous 24–48h ouvrées.", isUser: false });
      setMessages(updated);
    } catch {
      setMessages([...newHistory, { text: "Une erreur est survenue. Veuillez réessayer.", isUser: false }]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }

  const reset = useCallback(() => { setMessages([]); setInput(''); setPendingPhotos([]); }, []);

  if (!isOpen) return null;

  const canAddPhotos = pendingPhotos.length < 3 && !uploading;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 1055, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
      <style>{`
        @keyframes pulse-dot { 0%,100% { opacity:1; transform:scale(1); } 50% { opacity:.5; transform:scale(.75); } }
        @keyframes chatSlideIn { from { opacity:0; transform:translateY(20px) scale(.97); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes msgIn { from { opacity:0; transform:translateY(6px); } to { opacity:1; transform:translateY(0); } }
        @keyframes typingBounce { 0%,60%,100% { transform:translateY(0); opacity:.25; } 30% { transform:translateY(-5px); opacity:1; } }
        @keyframes chatSpin { to { transform:rotate(360deg); } }
      `}</style>

      {/* Backdrop */}
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(6px)' }} onClick={() => setIsOpen(false)} />

      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: '460px',
        height: '640px', maxHeight: 'calc(100vh - 40px)',
        background: '#111111',
        borderRadius: '20px', overflow: 'hidden',
        boxShadow: '0 50px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(247,193,0,0.12), inset 0 1px 0 rgba(255,255,255,0.05)',
        display: 'flex', flexDirection: 'column',
        animation: 'chatSlideIn 0.35s cubic-bezier(.34,1.3,.64,1)',
      }}>

        {/* Header */}
        <div style={{ padding: '16px 18px 14px', background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Logo mark */}
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'rgba(247,193,0,0.1)', border: '1px solid rgba(247,193,0,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#F7C100" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </div>
            <div>
              <p style={{ fontFamily: 'Poppins, sans-serif', fontWeight: 700, fontSize: '13px', color: '#fff', margin: 0, letterSpacing: '0.02em' }}>SOLIDEM</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#22c55e', display: 'block', animation: 'pulse-dot 2s ease infinite' }} />
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: '10px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>En ligne</span>
              </div>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '2px' }}>
            {mode === 'chat' && (
              <button onClick={reset} title="Nouvelle conversation" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)', cursor: 'pointer', padding: '7px', borderRadius: '8px', lineHeight: 0, transition: 'color 0.2s, background 0.2s' }}
                onMouseEnter={e => { const el = e.currentTarget; el.style.color = '#F7C100'; el.style.background = 'rgba(247,193,0,0.08)'; }}
                onMouseLeave={e => { const el = e.currentTarget; el.style.color = 'rgba(255,255,255,0.25)'; el.style.background = 'none'; }}>
                <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"/></svg>
              </button>
            )}
            <button onClick={() => setIsOpen(false)} title="Fermer" style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.25)', cursor: 'pointer', padding: '7px', borderRadius: '8px', lineHeight: 0, transition: 'color 0.2s, background 0.2s' }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.color = '#fff'; el.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.color = 'rgba(255,255,255,0.25)'; el.style.background = 'none'; }}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>

        {/* Mode tabs */}
        <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', borderBottom: '1px solid rgba(255,255,255,0.05)', flexShrink: 0 }}>
          {([
            { key: 'chat' as Mode, label: 'Assistant IA', icon: <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"/></svg> },
            { key: 'form' as Mode, label: 'Formulaire', icon: <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931z"/></svg> },
          ]).map(tab => (
            <button key={tab.key} onClick={() => setMode(tab.key)} style={{
              flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px',
              padding: '10px', background: 'none', border: 'none',
              borderBottom: `2px solid ${mode === tab.key ? '#F7C100' : 'transparent'}`,
              color: mode === tab.key ? '#F7C100' : 'rgba(255,255,255,0.3)',
              fontFamily: 'Poppins, sans-serif', fontSize: '11px',
              fontWeight: mode === tab.key ? 600 : 400,
              letterSpacing: '0.05em', textTransform: 'uppercase',
              cursor: 'pointer', transition: 'all 0.2s',
            }}>
              {tab.icon}{tab.label}
            </button>
          ))}
        </div>

        {/* Body */}
        {mode === 'chat' ? (
          <>
            <MessageList
              messages={messages}
              loading={loading}
              onQuickReply={(text) => sendMessage(null, text)}
              endRef={messagesEndRef}
            />

            {/* Input area */}
            <div style={{ padding: '12px 14px 14px', borderTop: '1px solid rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.25)', flexShrink: 0 }}>
              {pendingPhotos.length > 0 && (
                <div style={{ display: 'flex', gap: '8px', marginBottom: '10px', flexWrap: 'wrap' }}>
                  {pendingPhotos.map((url, i) => (
                    <div key={i} style={{ position: 'relative' }}>
                      <img src={url} alt="" style={{ width: '52px', height: '52px', objectFit: 'cover', borderRadius: '8px', display: 'block', border: '1px solid rgba(247,193,0,0.2)' }} />
                      <button type="button" onClick={() => removePhoto(url)} style={{ position: 'absolute', top: '-5px', right: '-5px', width: '16px', height: '16px', background: '#ef4444', border: 'none', borderRadius: '50%', color: '#fff', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 1 }}>×</button>
                    </div>
                  ))}
                </div>
              )}
              <form onSubmit={sendMessage} style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '4px 4px 4px 14px', transition: 'border-color 0.2s' }}
                onFocus={e => (e.currentTarget.style.borderColor = 'rgba(247,193,0,0.4)')}
                onBlur={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}>
                <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp,image/gif" multiple style={{ display: 'none' }} onChange={handleFileChange} />
                <button type="button" onClick={() => canAddPhotos && fileInputRef.current?.click()} disabled={!canAddPhotos} title="Ajouter photos" style={{ background: 'none', border: 'none', color: canAddPhotos ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)', cursor: canAddPhotos ? 'pointer' : 'not-allowed', padding: '6px', lineHeight: 0, flexShrink: 0, transition: 'color 0.2s' }}
                  onMouseEnter={e => { if (canAddPhotos) (e.currentTarget as HTMLElement).style.color = '#F7C100'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = canAddPhotos ? 'rgba(255,255,255,0.3)' : 'rgba(255,255,255,0.1)'; }}>
                  {uploading
                    ? <svg style={{ animation: 'chatSpin 0.9s linear infinite' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                    : <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/></svg>
                  }
                </button>
                <input ref={inputRef} type="text" style={{ flex: 1, background: 'none', border: 'none', outline: 'none', color: '#fff', fontSize: '13px', fontFamily: 'Poppins, sans-serif', padding: '9px 0' }}
                  placeholder={pendingPhotos.length ? 'Décrivez les photos…' : 'Votre message…'}
                  value={input} onChange={e => setInput(e.target.value)} autoComplete="off" disabled={loading} />
                <button type="submit" disabled={(!input.trim() && !pendingPhotos.length) || loading || uploading} style={{
                  width: '34px', height: '34px', borderRadius: '8px', border: 'none', flexShrink: 0,
                  background: (!input.trim() && !pendingPhotos.length) || loading ? 'rgba(255,255,255,0.06)' : '#F7C100',
                  color: (!input.trim() && !pendingPhotos.length) || loading ? 'rgba(255,255,255,0.2)' : '#111',
                  cursor: (!input.trim() && !pendingPhotos.length) || loading ? 'not-allowed' : 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', lineHeight: 0,
                  transition: 'background 0.2s, color 0.2s',
                }}>
                  {loading
                    ? <svg style={{ animation: 'chatSpin 0.9s linear infinite' }} width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" d="M21 12a9 9 0 11-6.219-8.56"/></svg>
                    : <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"/></svg>
                  }
                </button>
              </form>
            </div>
          </>
        ) : (
          <ContactForm onClose={() => setIsOpen(false)} />
        )}
      </div>
    </div>
  );
}
