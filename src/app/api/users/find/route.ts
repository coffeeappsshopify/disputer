import prisma from "@/lib/dbconnector";
import {jsonStringify} from "@/lib/utils";

export async function POST(request: Request) {
  const requestData = await request.json();

  const userName = requestData.query.toString().includes(' ') ? requestData.query.split(' ') : requestData.query;

  const data = await prisma.user.findFirst({
    where: Array.isArray(userName) ? {
      OR: [
        {
          AND: [
            {
              firstName: {
                contains: userName[0],
                mode: 'insensitive',
              },
            },
            {
              lastName: {
                contains: userName[1],
                mode: 'insensitive',
              },
            },
          ],
        },
        {
          AND: [
            {
              firstName: {
                contains: userName[1],
                mode: 'insensitive',
              },
            },
            {
              lastName: {
                contains: userName[0],
                mode: 'insensitive',
              },
            },
          ],
        },
      ]
    } : {
    OR: [
      {
        username: {
          contains: userName,
          mode: 'insensitive',
        },
      },
      {
        firstName: {
          contains: userName,
          mode: 'insensitive',
        },
      },
      {
        lastName: {
          contains: userName,
          mode: 'insensitive',
        },
      },
    ]
  }
  });

  if(!data) {
    return new Response(null, {
      status: 500
    });
  }

  return new Response(jsonStringify(data), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    },
  });
}
