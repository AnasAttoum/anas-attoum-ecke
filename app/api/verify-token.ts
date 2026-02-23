import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

export default async function verifyToken(req: NextRequest) {
  const authCookie = req.cookies.get("auth");

  if (authCookie) {
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      await jwtVerify(authCookie.value, secret);
      return true;
    } catch {
      return false;
    }
  } else {
    return false;
  }
}
