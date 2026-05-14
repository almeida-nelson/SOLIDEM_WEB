'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const STEPS = [
  { num: '1', title: 'Données personnelles' },
  { num: '2', title: 'Sujet' },
  { num: '3', title: 'Annexe' },
  { num: '4', title: 'Message' },
  { num: '5', title: 'Envoyer' },
];

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState("Demande d'informations");
  const [message, setMessage] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function openHandler() { setIsOpen(true); setStep(0); }
    window.addEventListener('solidem:openContact', openHandler);
    return () => window.removeEventListener('solidem:openContact', openHandler);
  }, []);

  function validate(): boolean {
    const e: Record<string, string> = {};
    if (step === 0 && (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      e.email = 'Adresse e-mail invalide.';
    }
    if (step === 3 && !message.trim()) {
      e.message = 'Veuillez saisir votre message.';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function next() {
    if (!validate()) return;
    if (step < STEPS.length - 1) setStep(step + 1);
  }

  function prev() {
    if (step > 0) setStep(step - 1);
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStatus('sending');

    const fd = new FormData();
    fd.append('name', name);
    fd.append('email', email);
    fd.append('phone', phone);
    fd.append('subject', subject);
    fd.append('message', message);
    if (file) fd.append('file', file);

    try {
      const res = await fetch('/api/contact', { method: 'POST', body: fd });
      const data = await res.json();
      if (data.success) {
        setStatus('sent');
        setTimeout(() => {
          setStatus('idle');
          setIsOpen(false);
          setName(''); setEmail(''); setPhone(''); setSubject("Demande d'informations");
          setMessage(''); setFile(null); setStep(0);
        }, 2500);
      } else {
        setErrors({ submit: data.error || 'Erreur lors de l\'envoi.' });
        setStatus('error');
      }
    } catch {
      setErrors({ submit: 'Erreur réseau. Réessayez ou appelez le +33.6.82.63.51.48.' });
      setStatus('error');
    }
  }

  if (!isOpen) return null;

  return (
    <div className="modal fade contact-modal show" style={{ display: 'block' }} tabIndex={-1}>
      <div className="modal-dialog modal-xl" style={{ marginTop: '80px' }}>
        <div className="modal-content">
          <div className="modal-body">
            <div className="contact-container">
              <div className="container">
                <div className="row">
                  {/* Form */}
                  <div className="col-lg-8 col-md-8">
                    <form id="contact-form-main" className="position-relative w-100 contact-form" onSubmit={submit}>
                      {STEPS.map((s, idx) => (
                        <div key={s.num} className={`contact-box contact-${idx + 1}${idx === step ? ' active' : ''}`}>
                          <div className="contact-heading d-flex align-items-center">
                            <div className="form-number"><p>{s.num}</p></div>
                            <div className="form-heading"><h2>{s.title}</h2></div>
                          </div>
                          <div className="divider" />

                          {idx === 0 && (
                            <div>
                              <div className="form-field mb-3">
                                <input type="text" name="name" placeholder="NOM, Prénom" value={name} onChange={e => setName(e.target.value)} />
                              </div>
                              <div className="form-field mb-3">
                                <input type="text" name="email" placeholder="Adresse e-mail" value={email} onChange={e => setEmail(e.target.value)} />
                                {errors.email && <span className="error">{errors.email}</span>}
                              </div>
                              <div className="form-field mb-3">
                                <input type="text" name="phone" placeholder="Numéro de téléphone" value={phone} onChange={e => setPhone(e.target.value)} />
                              </div>
                            </div>
                          )}

                          {idx === 1 && (
                            <div>
                              <div className="form-para"><p>Demande d&apos;informations / Estimation de travaux ou devis / Autre</p></div>
                              <div className="form-field mb-3">
                                <select name="subject" value={subject} onChange={e => setSubject(e.target.value)}>
                                  <option>Demande d&apos;informations</option>
                                  <option>Estimation de travaux / Devis</option>
                                  <option>Déconstruction</option>
                                  <option>Dépollution</option>
                                  <option>Terrassement</option>
                                  <option>Aménagements extérieurs / VRD</option>
                                  <option>Autre</option>
                                </select>
                              </div>
                            </div>
                          )}

                          {idx === 2 && (
                            <div>
                              <div className="form-para"><p>Uniquement jpg, png, pdf, max. 5 Mo.</p></div>
                              <div className="form-field mb-3">
                                <input type="file" name="file" ref={fileRef} accept=".jpg,.jpeg,.png,.pdf"
                                  onChange={e => setFile(e.target.files?.[0] ?? null)} />
                              </div>
                            </div>
                          )}

                          {idx === 3 && (
                            <div>
                              <div className="form-para"><p>Laissez-nous ici votre message.</p></div>
                              <div className="form-field mb-3">
                                <textarea name="message" rows={10} value={message} onChange={e => setMessage(e.target.value)} />
                                {errors.message && <span className="error">{errors.message}</span>}
                              </div>
                            </div>
                          )}

                          {idx === 4 && (
                            <div>
                              {errors.submit && <p style={{ color: 'red', marginBottom: '12px' }}>{errors.submit}</p>}
                              <div className="form-field mb-3">
                                <button type="submit" className="send-mail-btn" disabled={status === 'sending'}>
                                  <div className="d-flex justify-content-between">
                                    <div className="btn-text">
                                      {status === 'sending' ? 'Envoi en cours...' : status === 'sent' ? 'Envoyé ✓' : 'Envoyer'}
                                    </div>
                                    <div className="btn-icon">
                                      <Image src="/assets/telegram 1.png" alt="" width={20} height={20} />
                                    </div>
                                  </div>
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Nav buttons */}
                      <div className="d-flex justify-content-between form-field iterator-btn">
                        <button
                          id="prevButton"
                          type="button"
                          onClick={prev}
                          className={step === 0 ? 'hidden' : ''}
                        >Précédent</button>
                        <button
                          id="nextButton"
                          type="button"
                          onClick={next}
                          className={step === STEPS.length - 1 ? 'hidden' : ''}
                        >Suivant</button>
                      </div>
                    </form>
                  </div>

                  {/* Quick contact */}
                  <div className="col-lg-4 col-md-4">
                    <div className="quik-contact-box mb-3">
                      <div className="box-icon text-center">
                        <Image src="/assets/pin 1.png" alt="" width={40} height={40} />
                      </div>
                      <div className="form-heading"><h2 className="text-center">Adresse</h2></div>
                      <div className="form-para">
                        <p className="text-center">28 Rue de l&apos;Eglise,<br />95170 DEUIL-LA-BARRE</p>
                      </div>
                    </div>
                    <div className="quik-contact-box mb-3">
                      <div className="box-icon text-center">
                        <Image src="/assets/telephone-call 1.png" alt="" width={40} height={40} />
                      </div>
                      <div className="form-heading"><h2 className="text-center">Téléphone</h2></div>
                      <div className="form-para">
                        <p className="text-center">(+33.(0)6.82.63.51.48)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Backdrop */}
      <div className="modal-backdrop fade show" onClick={() => setIsOpen(false)} style={{ position: 'fixed' }} />
    </div>
  );
}
