import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const PATCH = async (req: Request, { params }) => {
  const { content } = await req.json();
  const user = await getUserByClerkId();
  const updatedEntry = await prisma.journalEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id,
      },
    },
    data: { content },
  });

  const analysis = await analyze(updatedEntry.content);

  const updatedAnalysis = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id,
      userId: user.id,
    },
    create: {
      entryId: updatedEntry.id,
      userId: user.id,
      ...analysis,
    },
    update: { ...analysis },
  });

  revalidatePath("/journal");

  return NextResponse.json({
    data: { ...updatedEntry, analysis: updatedAnalysis },
  });
};
