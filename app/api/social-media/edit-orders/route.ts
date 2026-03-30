import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import verifyToken from "../../verify-token";
import { SocialMedia } from "@/app/generated/prisma/client";

export async function PUT(req: NextRequest) {
  const isValid = await verifyToken(req);
  if (!isValid) {
    return NextResponse.json(
      { success: false, message: "toaster.for-extra-security" },
      { status: 401 },
    );
  }

  const data = await req.json();

  try {
    await Promise.all(
      data.map(({ id, order }: SocialMedia) =>
        prisma.socialMedia.update({
          where: { id },
          data: { order },
        }),
      ),
    );

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
