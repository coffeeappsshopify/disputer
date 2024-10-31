import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/dbconnector";


export async function POST(request: NextRequest) {
  console.log('server request')
  const userData = await request.json();
  console.log(userData);
  const resp = await prisma.dispute.create({
    data: {
      username_1: 'test',
      username_2: 'test',
      text_1: '',
      text_2: '',
      text_1_confirm: false,
      text_2_confirm: false,
      decision: '',
      who_is_right: ''
    }
  });

  console.log(resp)

  return NextResponse.json(userData);
}