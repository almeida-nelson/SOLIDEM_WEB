import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente | SOLIDEM',
  description: 'Conditions Générales de Vente de SOLIDEM — travaux de démolition, déconstruction, terrassement, dépollution et prestations connexes.',
  robots: { index: true, follow: true },
};

const articles = [
  {
    title: 'Article 1 – Objet',
    content: `Les présentes conditions générales de vente détaillent les droits entre SOLIDEM, société par actions simplifiée unipersonnelle, au capital social de 5 000 €, son siège social au 28 rue de l'Église, 95170 Deuil-la-Barre, ci-après « SOLIDEM » et toute personne physique ou morale, publique ou privée, qui agit à des fins entrant dans le cadre de son activité commerciale, industrielle, artisanale, libérale, agricole ou non professionnelle, y compris lorsqu'elle agit au nom ou pour le compte d'un autre professionnel, ci-après désigné le « Client ».

Elles s'appliquent à l'ensemble des prestations réalisées par l'entreprise, notamment : travaux de démolition, déconstruction, terrassement, dépollution, gros œuvre, structure béton et prestations connexes. Toute commande implique l'acceptation sans réserve des présentes CGV.

Toute commande de travaux implique de la part du client l'acceptation sans réserve des conditions générales ci-dessous et la renonciation à ses propres conditions, sauf convention spéciale contraire écrite.`,
  },
  {
    title: 'Article 2 – Validité, Prix et Escompte',
    content: `Les devis sont valables 3 mois à compter de leur émission. Le contrat est réputé conclu à réception du devis signé avec la mention « Bon pour accord ».

Le devis proposé devra être retourné à SOLIDEM, revêtu de la date, de la signature du client, le cachet de l'entreprise et de la mention « Bon pour accord ». La signature par le client du devis ou de la commande l'engage de façon ferme et définitive.

Les travaux sont strictement limités aux prestations décrites dans le devis. Toute prestation supplémentaire fera l'objet d'un avenant écrit accepté par le Client avant exécution. Toutes les annotations, corrections, changements, transformations ou modifications du devis par le client devront, obligatoirement, être validées par écrit par un représentant de SOLIDEM.

Les prix des prestations et services vendues sont ceux en vigueur au jour de la signature du devis. Ils sont libellés en euros et calculés hors taxes. Par voie de conséquence, ils seront majorés du taux de TVA et des frais de transport applicables au jour de la facturation.

L'entreprise se réserve le droit de réviser ses prix en cas de variation significative du coût des matériaux, de l'énergie ou de la main-d'œuvre, notamment par référence aux indices du bâtiment (BT01 ou équivalent) publiés par les autorités compétentes.

Aucun escompte ne sera consenti en cas de paiement anticipé.`,
  },
  {
    title: 'Article 3 – Propriété intellectuelle',
    content: `Les devis, dessins, plans, maquettes, descriptifs et toutes autres documents de travail restent propriété exclusive de SOLIDEM. Leur communication à d'autres entreprises ou tiers est interdite et passible de dommages-intérêts. Ils doivent être rendus ou éliminés s'ils ne sont pas suivis d'une commande.`,
  },
  {
    title: "Article 4 – Conditions d'exécution et Délais",
    content: `Les travaux sont réalisés conformément aux normes en vigueur, aux DTU applicables, aux règles professionnelles et aux règles de l'art du secteur du bâtiment.

Le client s'engage à fournir tous documents nécessaires en fonction de la nature des travaux (diagnostiques, consignations de réseaux, …). Si la réalisation des travaux s'avère impossible car le client n'a pas rempli cette obligation, SOLIDEM ne pourra pas être pris pour responsable.

Dans le cadre de la législation, il doit être mis à disposition du personnel de réalisation, des sanitaires et locaux aérés, leur permettant de se restaurer et changer de vêtements. À défaut, l'entreprise pourra facturer les installations de chantier nécessaires.`,
  },
  {
    title: 'Article 5 – Réception et Réclamations',
    content: `Les délais de livraison ne sont donnés qu'à titre indicatif sauf stipulation contraire indiquée sur le devis. SOLIDEM se dégage de tout engagement relatif aux délais de livraison dans le cas : où les conditions de paiement n'ont pas été observées par le client ; de retard apporté à la remise de l'ordre d'exécution ; de modification du programme des travaux ; de retard des autres corps d'État intervenants en complément ou en parallèle ; d'obstruction, empêchement ou autre forme de limitation par les autres corps d'État de réaliser les prestations ; de travaux supplémentaires ; où les locaux ne sont pas mis à notre disposition à la date prévue ; de force majeure ou d'événements tels que : guerre, grève de l'entreprise ou de l'un de ses fournisseurs, empêchement de transport, incendie, intempéries, ou encore ruptures de stock.

La réception des travaux intervient contradictoirement entre les parties.

À défaut de réception formelle dans un délai de 15 jours après achèvement, les travaux seront réputés acceptés sans réserve.

Les garanties légales prévues par le Code civil (garantie de parfait achèvement, garantie biennale et garantie décennale lorsque applicable) s'appliquent.`,
  },
  {
    title: 'Article 6 – Paiement',
    content: `Le règlement s'effectue soit par chèque, soit par virement. Le paiement des travaux s'effectue comme suit, sauf dans le cas d'un accord entre le professionnel et le client par écrit :

• À la commande : 30 % du montant global des travaux ;
• En cours des travaux : le prorata de l'avancement des travaux, payable au plus tard dans les 30 jours suivant sa présentation ;
• À la réception des travaux : le solde à la date d'échéance figurant sur la facture, sans rabais, ni retenue de quelque nature, sauf retenues de garantie quand applicable.`,
  },
  {
    title: 'Article 7 – Suspension des travaux',
    content: `En cas de retard de paiement, des pénalités seront appliquées conformément à l'article L441-10 du Code de commerce, ainsi qu'une indemnité forfaitaire de 40 € pour frais de recouvrement.

L'entreprise se réserve le droit de suspendre les travaux après mise en demeure restée sans effet.`,
  },
  {
    title: 'Article 8 – Clauses pénales',
    content: `En cas de rupture du contrat, imputable au client, avant la réalisation des travaux commandés, l'acompte versé à la commande sera conservé à titre d'indemnisation forfaitaire. À cette somme s'ajoutera le montant des fournitures et du matériel déjà commandés. En cas de rupture du contrat en cours de réalisation des travaux s'ajoutera à la facturation des travaux réalisés une somme forfaitaire égale à 15 % du montant TTC du devis ou de la commande.

Conformément à l'article L441-6 du code de commerce, des pénalités de retard sont obligatoirement appliquées dans le cas où les sommes dues sont versées après la date de paiement figurant sur la facture.

Le taux de l'intérêt légal retenu est celui en vigueur au jour de la livraison des marchandises. Le taux d'intérêt légal sera révisé tous les 6 mois (Ordonnance n°2014-947 du 20 août 2014). Cette pénalité est calculée sur le montant TTC de la somme restant due, et court à compter de la date d'exigibilité du prix sans qu'aucune mise en demeure préalable ne soit nécessaire.

En sus des indemnités de retard, toute somme, y compris l'acompte, non payée à sa date d'exigibilité produira de plein droit le paiement d'une indemnité forfaitaire de 40 euros due au titre des frais de recouvrement.`,
  },
  {
    title: 'Article 9 – Litiges et droit applicable',
    content: `Les présentes CGV sont soumises au droit français.

Tout litige relatif à leur interprétation ou à leur exécution relève de la compétence des tribunaux du ressort du siège social de l'entreprise, sauf dispositions légales contraires.`,
  },
];

export default function CGVPage() {
  return (
    <main className="min-h-screen bg-gray-950 text-gray-200">
      <div className="max-w-3xl mx-auto px-6 py-24">

        {/* Header */}
        <div className="mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-10"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Retour au site
          </Link>
          <p className="text-xs text-yellow-400/70 tracking-[0.2em] uppercase mb-4">SOLIDEM</p>
          <h1 className="text-3xl md:text-4xl font-light text-white mb-6">
            Conditions Générales de Vente
          </h1>
          <p className="text-sm text-gray-500">
            SOLIDEM — SAS unipersonnelle au capital de 5 000 €<br />
            28 rue de l'Église, 95170 Deuil-la-Barre
          </p>
        </div>

        {/* Download button */}
        <a
          href="/documents/cgv.pdf"
          download
          className="inline-flex items-center gap-2 px-5 py-3 mb-16 text-sm font-medium bg-yellow-400 text-black rounded-lg hover:bg-yellow-300 transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          Télécharger en PDF
        </a>

        {/* Articles */}
        <div className="space-y-12">
          {articles.map((article, i) => (
            <section key={i}>
              <h2 className="text-base font-semibold text-white mb-4 pb-3 border-b border-white/10">
                {article.title}
              </h2>
              <div className="space-y-3">
                {article.content.split('\n\n').map((paragraph, j) => (
                  <p key={j} className="text-sm text-gray-400 leading-relaxed whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Footer nav */}
        <div className="mt-20 pt-8 border-t border-white/10 text-sm text-gray-600">
          © 2026 SOLIDEM — Tous droits réservés
        </div>

      </div>
    </main>
  );
}
