import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (password === process.env.PASSWORD) {
    const response = NextResponse.json({ success: true });
    response.cookies.set("auth", "true", {
      httpOnly: true,
      maxAge: 60 * 60,
    });
    return response;
  }

  return NextResponse.json({ success: false }, { status: 401 });
}
