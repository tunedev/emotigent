import { auth } from "@clerk/nextjs";
import { prisma } from "./db";

export const getUserByClerkId = async () => {
  const userId = auth()?.userId;

  if (!userId)
    throw new Error("Expected to be called in an authenticated page only");

  const user = await prisma.user.findUniqueOrThrow({
    where: {
      clerkId: userId,
    },
  });

  return user;
};
