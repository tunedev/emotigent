import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/journal", label: "Journal" },
  { href: "/history", label: "History" },
];

const DashboardLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen relative overflow-hidden">
      <aside className="absolute  w-[200px] top-0 left-0 h-full border-r border-black/10">
        <div className="mt-3 mb-2 text-justify">EmotiGent</div>
        <div className="w-full p-2">
          <ul className="w-full">
            {links.map((item) => (
              <li
                key={item.href}
                className="shadow rounded-sm px-2 py-3 cursor-pointer"
              >
                <Link href={item.href} className="w-full h-full">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
      <div className="ml-[200px] h-full">
        <header className="h-[60px] border-b border-black/10">
          <div className="h-full w-full px-6 flex items-center justify-end">
            <UserButton />
          </div>
        </header>
        <div className="h-[calc(100vh-60px)]">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
