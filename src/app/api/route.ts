import {NextRequest} from "next/server";
import prisma from "@/lib/dbconnector";
import {User} from "@telegram-apps/sdk-react";
import {jsonStringify} from "@/lib/utils";

async function updateUser(user: User) {
  return prisma.user.update({
    data: {
      username: user.username || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      photoUrl: user.photoUrl || "",
    },
    where: {
      id: user.id,
    }
  });
}

async function createUser(user: User) {
  return prisma.user.create({
    data: {
      id: user.id,
      username: user.username || "",
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      photoUrl: user.photoUrl || "",
    }
  });
}

async function getUser(user: User) {
  return prisma.user.findUnique({
    where: {
      id: user.id,
    }
  });
}

export async function POST(request: NextRequest) {
  const userData = await request.json();

  const userResponse = await getUser(userData);

  const user = !userResponse ? await createUser(userData) : await updateUser(userData);

  return new Response(jsonStringify(user), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    },
  });
}