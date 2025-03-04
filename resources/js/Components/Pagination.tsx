import { Link } from "@inertiajs/react";
interface LinkItem {
  url: string | null;
  label: string;
  active: boolean;
}

interface PaginationProps {
  links: LinkItem[];
}
const Pagination = ({ links }: PaginationProps) => {
  return (
    <nav className="text-center mt-4">
      {links.map((link) => (
        <Link
          key={link.label}
          preserveScroll
          href={link.url || "#"}
          className={`inline-block py-2 px-3 rounded-lg text-xs ${
            link.active ? "bg-gray-950 text-white" : "text-gray-200"
          } ${!link.url ? "opacity-50 cursor-default" : "hover:bg-gray-950"}`}
          aria-disabled={!link.url}
        >
          {link.label.replace(/&[^;]+;/g, "")}
        </Link>
      ))}
    </nav>
  );
};

export default Pagination;
