-- Table leads
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  nom text not null,
  telephone text not null,
  email text,
  type_chantier text not null,
  localisation text not null,
  surface text,
  delai text,
  acces_engins text,
  resume_ia text,
  photos_urls text[] default '{}',
  priorite text not null default 'cold' check (priorite in ('cold', 'warm', 'hot')),
  statut text not null default 'nouveau' check (statut in ('nouveau', 'contacté', 'devis_envoyé', 'gagné', 'perdu')),
  created_at timestamptz not null default now()
);

-- Index pour trier par date
create index if not exists leads_created_at_idx on leads (created_at desc);

-- RLS désactivé (accès uniquement via service_role côté serveur)
alter table leads disable row level security;

-- Bucket pour les photos de chantier
insert into storage.buckets (id, name, public)
values ('chantier-photos', 'chantier-photos', false)
on conflict (id) do nothing;
