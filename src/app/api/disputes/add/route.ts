import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/dbconnector";


export async function POST(request: NextRequest) {
  const userData = await request.json();

  const resp = await prisma.dispute.create({
    data: {
      user_1: userData.initiator_id,
      user_2: userData.user_id,
      text_1: '',
      text_2: '',
      text_1_confirm: false,
      text_2_confirm: false,
      decision: '',
      who_is_right: '',
      summary: ''
    }
  });

  return NextResponse.json({
    id: resp.id
  });
}