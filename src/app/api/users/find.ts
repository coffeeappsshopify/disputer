import {NextRequest, NextResponse} from 'next/server';
import pool from "@/lib/pgpool";
import {PrismaClient} from "@prisma/client/extension";

const prisma = new PrismaClient();


export async function POST(request: Request) {
  const { name, email } = await request.json();

  try {
    const { rows } = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.error();
  }
}
