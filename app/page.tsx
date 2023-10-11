import Link from "next/link";
import { auth } from "@clerk/nextjs";

export default function Home() {
  const { userId } = auth();
  let href = userId ? "/journal" : "/new-user";

  return (
    <div className="w-screen h-screen bg-black flex justify-center items-center text-white">
      {" "}
      <div className="w-full max-w-[600px] mx-auto">
        <h1 className="text-6xl mb-4">Map Your Emotions Through Journaling</h1>
        <p className="text-2xl text-white/60 mb-4">
          Unlock self-improvement through reflection. With EmotiGent, track your
          emotions and thoughts in a secure space. It is just you, your honesty,
          and our intelligent AI.
        </p>
        <div>
          <Link href={href}>
            <button className="bg-purple-600 px-4 py-2 rounded-lg text-xl">
              get started
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
