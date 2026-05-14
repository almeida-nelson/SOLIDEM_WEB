import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

const MAX_SIZE = 5 * 1024 * 1024 // 5 Mo
const ALLOWED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif'])
const BUCKET = 'chat-photos'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null

    if (!file) return NextResponse.json({ error: 'Aucun fichier reçu.' }, { status: 400 })
    if (!ALLOWED.has(file.type)) return NextResponse.json({ error: 'Format non supporté (JPEG, PNG, WebP, GIF).' }, { status: 400 })
    if (file.size > MAX_SIZE) return NextResponse.json({ error: 'Fichier trop lourd (max 5 Mo).' }, { status: 400 })

    const ext = file.name.split('.').pop()?.toLowerCase() ?? 'jpg'
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const buffer = Buffer.from(await file.arrayBuffer())

    const { error } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(filename, buffer, { contentType: file.type, upsert: false })

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    const { data: { publicUrl } } = supabaseAdmin.storage.from(BUCKET).getPublicUrl(filename)

    return NextResponse.json({ url: publicUrl })
  } catch {
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
