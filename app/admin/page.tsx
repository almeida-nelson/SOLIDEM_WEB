'use client'

import { useState, useEffect } from 'react'

interface Lead {
  id: string
  nom: string
  telephone: string
  email?: string
  type_chantier: string
  localisation: string
  surface?: string
  delai?: string
  priorite: 'cold' | 'warm' | 'hot'
  statut: string
  created_at: string
}

const PRIORITE_COLORS = {
  hot: 'bg-red-500/20 text-red-400 border-red-500/30',
  warm: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  cold: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
}

const STATUT_OPTIONS = ['nouveau', 'contacté', 'devis_envoyé', 'gagné', 'perdu']

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState('')
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(false)

  const login = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/admin/auth', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) {
      setAuthed(true)
      setError('')
    } else {
      setError('Mot de passe incorrect.')
    }
  }

  useEffect(() => {
    if (!authed) return
    setLoading(true)
    fetch('/api/admin/leads')
      .then((r) => r.json())
      .then((d) => setLeads(d.leads ?? []))
      .finally(() => setLoading(false))
  }, [authed])

  const updateStatut = async (id: string, statut: string) => {
    await fetch('/api/admin/leads', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ id, statut }),
    })
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, statut } : l)))
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <form onSubmit={login} className="w-full max-w-sm space-y-4">
          <div className="text-center mb-8">
            <p className="text-xs text-yellow-400/70 tracking-[0.2em] uppercase mb-2">SOLIDEM</p>
            <h1 className="text-2xl font-light text-white">Espace admin</h1>
          </div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Mot de passe"
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-yellow-400/50"
            autoFocus
          />
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 bg-yellow-400 text-black font-medium rounded-lg hover:bg-yellow-300 transition-colors"
          >
            Accéder
          </button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-950 text-gray-200 px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs text-yellow-400/70 tracking-[0.2em] uppercase mb-1">SOLIDEM</p>
            <h1 className="text-2xl font-light text-white">Leads</h1>
          </div>
          <span className="text-sm text-gray-500">{leads.length} contact{leads.length > 1 ? 's' : ''}</span>
        </div>

        {loading ? (
          <p className="text-gray-500 text-sm">Chargement...</p>
        ) : leads.length === 0 ? (
          <p className="text-gray-500 text-sm">Aucun lead pour le moment.</p>
        ) : (
          <div className="space-y-3">
            {leads.map((lead) => (
              <div key={lead.id} className="bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-3">
                      <span className="text-white font-medium">{lead.nom}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full border ${PRIORITE_COLORS[lead.priorite]}`}>
                        {lead.priorite}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-400">
                      <a href={`tel:${lead.telephone}`} className="hover:text-white transition-colors">
                        {lead.telephone}
                      </a>
                      {lead.email && (
                        <a href={`mailto:${lead.email}`} className="hover:text-white transition-colors">
                          {lead.email}
                        </a>
                      )}
                    </div>
                  </div>
                  <select
                    value={lead.statut}
                    onChange={(e) => updateStatut(lead.id, e.target.value)}
                    className="text-sm bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 text-gray-300 focus:outline-none focus:border-yellow-400/50"
                  >
                    {STATUT_OPTIONS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
                <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap gap-x-6 gap-y-1 text-xs text-gray-500">
                  <span><span className="text-gray-400">Travaux :</span> {lead.type_chantier}</span>
                  <span><span className="text-gray-400">Lieu :</span> {lead.localisation}</span>
                  {lead.surface && <span><span className="text-gray-400">Surface :</span> {lead.surface}</span>}
                  {lead.delai && <span><span className="text-gray-400">Délai :</span> {lead.delai}</span>}
                  <span className="ml-auto">
                    {new Date(lead.created_at).toLocaleDateString('fr-FR', {
                      day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
