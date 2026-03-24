import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { SignJWT } from "jose";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();
  const admin = await prisma.admin.findFirst({
    select: { password_hash: true },
  });

  if (!admin || !admin.password_hash) {
    return NextResponse.json({ success: false }, { status: 401 });
  }
  const isPasswordCorrect = await bcrypt.compare(
    password,
    admin?.password_hash,
  );

  if (isPasswordCorrect) {
    const response = NextResponse.json({ success: true });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(secret);

    response.cookies.set("auth", token, {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60,
    });

    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
