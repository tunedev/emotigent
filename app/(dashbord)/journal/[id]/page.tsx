import Editor from "@/components/Editor";
import { getUserByClerkId } from "@/utils/auth";
import { prisma } from "@/utils/db";
import { redirect } from "next/navigation";

const getEntry = async (id: string) => {
  const user = await getUserByClerkId();
  const entry = await prisma.journalEntry.findUnique({
    where: {
      userId_id: {
        id,
        userId: user.id,
      },
    },
    include: {
      analysis: true,
    },
  });
  console.log({ entry });

  return entry;
};

const EntryPage = async ({ params }) => {
  const entry = await getEntry(params.id);
  if (!entry) {
    redirect("/new-user");
  }
  return (
    <div className="w-full h-full">
      <Editor entry={entry} />
    </div>
  );
};

export default EntryPage;
