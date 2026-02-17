import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const data = await req.json();
  const { id } = await params;

  if (typeof data.enabled !== "boolean") {
    return NextResponse.json(
      { success: false, message: "toaster.error" },
      { status: 400 },
    );
  }

  try {
    await prisma.skill.update({
      where: { id },
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
