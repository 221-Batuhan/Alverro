import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth-helpers";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { name, slug } = await req.json();
  const c = await prisma.category.update({ where: { id: params.id }, data: { name, slug } });
  return NextResponse.json(c);
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await prisma.category.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}


