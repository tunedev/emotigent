import { prisma } from "@/utils/db";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const createNewUser = async () => {
  const user = await currentUser();
  if (!user) {
    // "internal server error as a result of clerk malfunction, this is an authenticated page so it should have user";
    redirect("/signup");
    // throw new Error(
    //   "internal server error as a result of clerk malfunction, this is an authenticated page so it should have user"
    // );
  }
  const match = await prisma.user.findUnique({
    where: {
      clerkId: user.id as string,
    },
  });

  if (!match) {
    const newUser = await prisma.user.create({
      data: {
        clerkId: user.id as string,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }

  redirect("/journal");
};

const NewUser = async () => {
  await createNewUser();
  return <div>Loading...</div>;
};

export default NewUser;
