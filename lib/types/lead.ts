export type LeadIntent = 'cold' | 'warm' | 'hot'
export type LeadStatus = 'nouveau' | 'contacté' | 'devis_envoyé' | 'gagné' | 'perdu'

export interface Lead {
  id: string
  nom: string
  telephone: string
  email?: string
  type_chantier: string
  localisation: string
  surface?: string
  delai?: string
  acces_engins?: string
  resume_ia?: string
  photos_urls?: string[]
  priorite: LeadIntent
  statut: LeadStatus
  created_at: Date
}

export type CreateLeadInput = Omit<Lead, 'id' | 'created_at' | 'statut' | 'priorite'> & {
  priorite?: LeadIntent
}

export type UpdateLeadInput = Partial<Omit<Lead, 'id' | 'created_at'>>
