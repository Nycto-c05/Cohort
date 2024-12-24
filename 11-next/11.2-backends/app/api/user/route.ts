import { NextRequest } from "next/server";
// import { PrismaClient } from "@prisma/client";
import client from "@/db"


// const client = new PrismaClient();

export async function GET() {
  const user = await client.user.findFirst();
  return Response.json({
    email: user?.username,
    name: user?.password,
  })
}


// creating this a server action, so this endpoint wont be used in route.tsx
export async function POST(req: NextRequest) {
  const body: { username: string, password: string } = await req.json();

  // header
  console.log(req.headers.get("authorization"))

  // query params
  console.log(req.nextUrl.searchParams.get('foo'))

  await client.user.create({
    data: {
      username: body.username,
      password:body.password
    }
  })

  console.log(body)

  return Response.json({
    body,
    message:"logged in"
  })
}

