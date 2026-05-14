import { supabaseAdmin } from '@/lib/supabase'
import { Lead, CreateLeadInput, UpdateLeadInput } from '@/lib/types/lead'

export async function createLead(input: CreateLeadInput): Promise<Lead> {
  const { data, error } = await supabaseAdmin
    .from('leads')
    .insert({
      nom: input.nom,
      telephone: input.telephone,
      email: input.email ?? null,
      type_chantier: input.type_chantier,
      localisation: input.localisation,
      surface: input.surface ?? null,
      delai: input.delai ?? null,
      acces_engins: input.acces_engins ?? null,
      resume_ia: input.resume_ia ?? null,
      photos_urls: input.photos_urls ?? [],
      priorite: input.priorite ?? 'cold',
      statut: 'nouveau',
    })
    .select()
    .single()

  if (error) throw new Error(error.message)
  return data as Lead
}

export async function getLeads(): Promise<Lead[]> {
  const { data, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw new Error(error.message)
  return (data ?? []) as Lead[]
}

export async function getLeadById(id: string): Promise<Lead | null> {
  const { data, error } = await supabaseAdmin
    .from('leads')
    .select('*')
    .eq('id', id)
    .single()

  if (error) return null
  return data as Lead
}

export async function updateLead(id: string, input: UpdateLeadInput): Promise<Lead | null> {
  const { data, error } = await supabaseAdmin
    .from('leads')
    .update(input)
    .eq('id', id)
    .select()
    .single()

  if (error) return null
  return data as Lead
}
