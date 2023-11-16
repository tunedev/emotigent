import { analyze } from "@/utils/ai";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export const POST = async () => {
  const user = await getUserByClerkId();

  const defaultContent = "Write about your day!";
  const analysis = await analyze(defaultContent);
  const entry = await prisma.journalEntry.create({
    data: {
      userId: user.id,
      content: defaultContent,
      analysis: {
        create: {
          ...analysis,
          userId: user.id,
        },
      },
    },
  });

  revalidatePath(`/journal/${entry.id}`);

  return NextResponse.json({ data: entry });
};
