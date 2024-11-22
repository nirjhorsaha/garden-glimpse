
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkItem = {
  href: string;
  label: string;
};

export const SidebarOptions = ({ links }: { links: LinkItem[] }) => {
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-1 ">
      {links.map((link) => (
        <Link
          key={link.href}
          className={`block w-full rounded-md px-3 py-2 hover:bg-slate-400 hover:text-black ${
            pathname === link.href ? "bg-green-500 font-semibold" : ""
          }`}
          href={link.href}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};
