import Anthropic from '@anthropic-ai/sdk';
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { createLead } from '@/lib/dal/leads';

const client = new Anthropic();

// In-memory rate limiter — 20 req / IP / 10 min
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const LIMIT = 20;
const WINDOW_MS = 10 * 60 * 1000;

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  if (entry.count >= LIMIT) return true;
  entry.count++;
  return false;
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  );
}

const SYSTEM_PROMPT = `Vous êtes l'assistant de SOLIDEM, entreprise spécialisée en travaux préparatoires basée à Deuil-la-Barre (95), intervenant exclusivement en Île-de-France.

Nos services :
• Déconstruction & Démolition : dépose douce, démolition sélective ou totale, toutes structures
• Dépollution : diagnostic, décontamination (amiante, HAP, hydrocarbures, métaux lourds), plans d'action sur mesure
• Terrassement : fouilles, pleine masse, maillage précis, tous volumes
• Aménagements extérieurs : VRD, réseaux enterrés, mise en conformité des réseaux, dallage, engazonnement, plantations

Adresse : 28 Rue de l'Église, 95170 Deuil-la-Barre

Règles ABSOLUES :
- Répondez TOUJOURS en français
- Ton formel et professionnel — vouvoiement obligatoire, aucun emoji, aucune familiarité
- Réponses concises (2-4 phrases maximum)
- Ne communiquez jamais de tarifs : les devis sont gratuits et établis sur mesure
- Ne demandez JAMAIS au client d'appeler — c'est SOLIDEM qui prend contact
- Votre objectif : collecter les informations du projet et les coordonnées du client pour que SOLIDEM puisse le recontacter
- Collectez progressivement (une question à la fois) dans cet ordre :
  1. Type de travaux souhaités
  2. Localisation du chantier
  3. Surface ou volume approximatif
  4. Délai souhaité
  5. Prénom et nom du contact
  6. Numéro de téléphone
  7. Adresse e-mail (optionnel)
- Une fois que vous disposez au minimum du type de travaux, de la localisation, du nom complet et du numéro de téléphone, confirmez que l'équipe SOLIDEM prendra contact sous 24-48h ouvrées, PUIS ajoutez sur une toute dernière ligne (une seule fois, jamais avant) ce bloc exact :
[RECAP_EMAIL:{"nom":"PRENOM NOM","telephone":"NUMERO","email":"EMAIL_OU_vide","travaux":"TYPE","localisation":"LIEU","surface":"SURFACE_OU_vide","delai":"DELAI_OU_vide"}]
- Si la demande est hors compétence, expliquez-le clairement et proposez de transmettre la demande à l'équipe`;

const RECAP_REGEX = /\[RECAP_EMAIL:(\{.*?\})\]/s;

function buildEmailHtml(data: Record<string, string>): string {
  const rows = [
    ['Nom / Prénom', data.nom],
    ['Téléphone', data.telephone],
    ['Email', data.email || '—'],
    ['Type de travaux', data.travaux],
    ['Localisation', data.localisation],
    ['Surface / Volume', data.surface || '—'],
    ['Délai souhaité', data.delai || '—'],
  ];

  const tableRows = rows
    .map(([label, value]) => `
      <tr>
        <td style="padding:8px 12px;font-weight:600;background:#f9fafb;border:1px solid #e5e7eb;white-space:nowrap">${label}</td>
        <td style="padding:8px 12px;border:1px solid #e5e7eb">${value}</td>
      </tr>`)
    .join('');

  return `
    <div style="font-family:Poppins,Arial,sans-serif;max-width:560px;margin:0 auto">
      <div style="background:#111827;padding:24px 32px;border-radius:8px 8px 0 0">
        <h1 style="margin:0;color:#F7C100;font-size:20px;letter-spacing:1px">SOLIDEM</h1>
        <p style="margin:4px 0 0;color:#9ca3af;font-size:13px">Nouvelle demande de contact</p>
      </div>
      <div style="padding:24px 32px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${tableRows}
        </table>
        <p style="margin-top:20px;font-size:12px;color:#9ca3af">
          Reçu via l'assistant virtuel SOLIDEM · ${new Date().toLocaleString('fr-FR')}
        </p>
      </div>
    </div>`;
}

async function sendRecapEmail(data: Record<string, string>): Promise<void> {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Assistant SOLIDEM" <${process.env.SMTP_USER}>`,
    to: process.env.RECAP_EMAIL,
    subject: `Nouvelle demande — ${data.nom} (${data.travaux})`,
    html: buildEmailHtml(data),
  });
}

type Msg = { text: string; isUser: boolean; photos?: string[] };

function fallback(message: string): string {
  const m = message.toLowerCase();
  if (/^(bonjour|salut|bonsoir|hello|bonne\s*(matin|journée|soirée))/.test(m))
    return "Bonjour. Je suis l'assistant de SOLIDEM. Je suis à votre disposition pour répondre à vos questions et préparer votre dossier afin que notre équipe puisse vous recontacter. Quel type de travaux envisagez-vous ?";
  if (/d[ée]construction|d[ée]molition|abattre|bâtiment|immeuble/.test(m))
    return "SOLIDEM réalise tous types de déconstructions et démolitions, de la dépose douce à la démolition complète. Afin de préparer votre devis, pourriez-vous m'indiquer la localisation et la surface approximative du projet ?";
  if (/d[ée]pollution|d[ée]contamination|amiante|hap|hydrocarbure|m[ée]tal|pollu|contamin/.test(m))
    return "Nous intervenons sur la dépollution de tous types de sites : amiante, HAP, hydrocarbures, métaux lourds. Pourriez-vous m'indiquer la localisation du site et la nature de la pollution identifiée ?";
  if (/terrassement|fouille|excavation|nivellement|d[ée]blai/.test(m))
    return "Nos équipes réalisent tous travaux de terrassement, quels que soient les volumes. Pourriez-vous me préciser la localisation et les dimensions approximatives de votre projet ?";
  if (/vrd|voirie|r[ée]seau|paysag|dallage|gazon|plantation|am[ée]nagement|ext[ée]rieur|canalisation|conformit/.test(m))
    return "Nous prenons en charge l'ensemble des travaux VRD, aménagements paysagers et mises en conformité des réseaux. Pourriez-vous me décrire votre projet afin qu'un responsable SOLIDEM vous recontacte ?";
  if (/devis|prix|tarif|co[uû]t|combien|estimation|budget/.test(m))
    return "Nos devis sont gratuits et établis sur mesure. Pour en préparer un, pourriez-vous me préciser le type de travaux, la localisation et la superficie ou le volume approximatif ?";
  if (/contact|t[ée]l[ée]phone|num[ée]ro|joindre|appeler|rappel|recontact/.test(m))
    return "Pour que notre équipe vous recontacte, pourriez-vous m'indiquer votre prénom, nom et numéro de téléphone ? Nous vous rappellerons sous 24-48h ouvrées.";
  if (/email|mail/.test(m) && /[@]/.test(m))
    return "Merci. Notre équipe vous recontactera sous 24-48h ouvrées.";
  if (/email|mail|adresse/.test(m))
    return "Souhaitez-vous également nous laisser une adresse e-mail ? Dans le cas contraire, notre équipe vous contactera par téléphone sous 24-48h ouvrées.";
  if (/qui|solidem|entreprise|soci[ée]t[ée]|[àa] propos|pr[ée]sentation|expérience|certif/.test(m))
    return "SOLIDEM est spécialisée dans les travaux préparatoires en Île-de-France et sur l'ensemble du territoire : déconstruction, dépollution, terrassement et aménagements extérieurs. Avez-vous un projet sur lequel nous pouvons intervenir ?";
  if (/zone|secteur|r[ée]gion|france|île.de.france|idf|paris/.test(m))
    return "SOLIDEM intervient exclusivement en Île-de-France. Où se situe votre chantier ?";
  if (/urgent|urgence|rapidement|vite|d[ée]lai/.test(m))
    return "Nous sommes en mesure d'intervenir dans des délais courts. Pourriez-vous me laisser vos coordonnées — prénom, nom et numéro de téléphone — afin que notre équipe vous contacte en priorité ?";
  if (/merci|parfait|super|excellent|bien reçu|compris/.test(m))
    return "Je vous en prie. Notre équipe reviendra vers vous dans les meilleurs délais.";
  if (/(\d[\s.\-]?){9,}\d/.test(m))
    return "Merci. Souhaitez-vous également nous laisser une adresse e-mail ? Dans le cas contraire, notre équipe vous rappelle sous 24-48h ouvrées.";
  if (/^[a-záàâäéèêëîïôöùûüçœ]+(?:\s+[a-záàâäéèêëîïôöùûüçœ]+)+$/i.test(m.trim()))
    return "Merci. Pour finaliser votre demande, pourriez-vous m'indiquer votre numéro de téléphone ? Notre équipe vous recontactera sous 24-48h ouvrées.";
  return "Merci pour votre message. Pour que notre équipe puisse vous recontacter, pourriez-vous m'indiquer votre prénom, nom et numéro de téléphone ?";
}

export async function POST(req: NextRequest) {
  if (isRateLimited(getIp(req))) {
    return NextResponse.json(
      { response: "Trop de messages. Veuillez patienter quelques minutes avant de réessayer." },
      { status: 429 }
    );
  }

  const body = await req.json() as { message: string; history: Msg[]; photos?: string[] };
  const { message, history = [], photos } = body;

  if (!message?.trim()) {
    return NextResponse.json({ response: 'Message vide.' });
  }

  if (process.env.ANTHROPIC_API_KEY) {
    try {
      // Build messages — last user message gets photo content blocks if photos were sent
      const messages = history.map((h, i) => {
        const isLast = i === history.length - 1;
        const hasPhotos = isLast && h.isUser && photos?.length;
        return {
          role: h.isUser ? 'user' as const : 'assistant' as const,
          content: hasPhotos
            ? [
                ...photos.map(url => ({ type: 'image' as const, source: { type: 'url' as const, url } })),
                { type: 'text' as const, text: h.text || 'Voici des photos de mon chantier.' },
              ]
            : h.text,
        };
      });

      const response = await client.messages.create({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: SYSTEM_PROMPT,
        messages,
      });

      let text = response.content[0].type === 'text' ? response.content[0].text : null;
      if (text) {
        const match = text.match(RECAP_REGEX);
        let emailFailed = false;
        if (match) {
          try {
            const data = JSON.parse(match[1]) as Record<string, string>;
            const alreadySeen = history.some(
              (h) => !h.isUser && RECAP_REGEX.test(h.text)
            );
            if (!alreadySeen) {
              await Promise.allSettled([
                sendRecapEmail(data).catch(() => { emailFailed = true; }),
                createLead({
                  nom: data.nom,
                  telephone: data.telephone,
                  email: data.email || undefined,
                  type_chantier: data.travaux,
                  localisation: data.localisation,
                  surface: data.surface || undefined,
                  delai: data.delai || undefined,
                }),
              ]);
            }
          } catch { /* malformed JSON — skip */ }
          text = text.replace(RECAP_REGEX, '').trim();
        }
        return NextResponse.json({ response: text, emailFailed });
      }
    } catch {
      // fall through to keyword fallback
    }
  }

  return NextResponse.json({ response: fallback(message) });
}
