import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import verifyToken from "../../verify-token";

export async function POST(req: NextRequest) {
  try {
    const isValid = await verifyToken(req);
    if (!isValid) {
      return NextResponse.json(
        { success: false, message: "toaster.for-extra-security" },
        { status: 401 },
      );
    }

    const data = await req.json();

    const aggregate = await prisma.skill.aggregate({
      _max: {
        order: true,
      },
    });
    const maxOrder = aggregate?._max?.order ?? 0;

    await prisma.skill.create({
      data: { ...data, order: maxOrder + 1 },
    });

    return NextResponse.json({
      success: true,
      message: "toaster.created-successfully",
    });
  } catch (err) {
    if (err instanceof Error) {
      return NextResponse.json(
        { success: false, message: err.message || "toaster.error" },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        { success: false, message: "toaster.error" },
        { status: 500 },
      );
    }
  }
}
