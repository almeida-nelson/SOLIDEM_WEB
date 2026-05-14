import { NextResponse } from 'next/server';

const IDF = new Set(['75', '77', '78', '91', '92', '93', '94', '95']);

export async function GET() {
  try {
    const res = await fetch(
      'https://raw.githubusercontent.com/gregoiredavid/france-geojson/master/departements-version-simplifiee.geojson',
      { next: { revalidate: 86400 } }
    );
    if (!res.ok) throw new Error();
    const all = await res.json() as { type: string; features: { properties: { code: string } }[] };
    const idf = { ...all, features: all.features.filter(f => IDF.has(f.properties.code)) };
    return NextResponse.json(idf);
  } catch {
    return NextResponse.json({ type: 'FeatureCollection', features: [] });
  }
}
