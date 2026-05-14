import { NextRequest, NextResponse } from 'next/server'
import { getLeads, updateLead } from '@/lib/dal/leads'

export async function GET() {
  const leads = await getLeads()
  return NextResponse.json({ leads })
}

export async function PATCH(req: NextRequest) {
  const { id, statut } = await req.json() as { id: string; statut: string }
  const lead = await updateLead(id, { statut: statut as never })
  if (!lead) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json({ lead })
}
