import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import { RowDataPacket } from 'mysql2';

export interface PortfolioItem {
  id: number;
  picture_name: string;
  portfolio_image: string;
}

export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      'SELECT id, picture_name, portfolio_image FROM portfolio ORDER BY id'
    );
    return NextResponse.json(rows as PortfolioItem[]);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
