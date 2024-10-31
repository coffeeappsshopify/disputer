import {NextRequest, NextResponse} from "next/server";
import prisma from "@/lib/dbconnector";
import {User} from "@telegram-apps/sdk-react";

async function updateUser(user: User) {
  const data = await prisma.user.update({
    data: {
      username: user.username || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      photoUrl: user.photoUrl || "",
    },
    where: {
      id: user.id.toString(),
    }
  });

  return data;
}

async function createUser(user: User) {
  const data = await prisma.user.create({
    data: {
      id: user.id.toString(),
      username: user.username || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      photoUrl: user.photoUrl || "",
    }
  });

  return data;
}

async function getUser(user: User) {
  const data = await prisma.user.findUnique({
    where: {
      id: user.id.toString(),
    }
  });

  return data;
}

export async function POST(request: NextRequest) {
  console.log('server request')
  const userData = await request.json();

  const userResponse = await getUser(userData);

  const user = !userResponse ? await createUser(userData) : await updateUser(userData);

  return NextResponse.json(user);
}