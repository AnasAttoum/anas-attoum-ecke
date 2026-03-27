import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import verifyToken from "../verify-token";

export async function PATCH(req: NextRequest) {
  const isValid = await verifyToken(req);
  if (!isValid) {
    return NextResponse.json(
      { success: false, message: "toaster.for-extra-security" },
      { status: 401 },
    );
  }

  const data = await req.json();
  const info = await prisma.information.findFirst();

  if (!data || !info) {
    return NextResponse.json(
      { success: false, message: "toaster.error" },
      { status: 400 },
    );
  }

  try {
    await prisma.information.update({
      where: { id: info.id },
      data,
    });

    return NextResponse.json({
      success: true,
      message: "toaster.edited-successfully",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "toaster.error" },
      { status: 500 },
    );
  }
}
