import { FC } from "react";
import Link from "next/link";

const LINKS = [
  {
    label: "Pricing",
    path: "/pricing",
  },
  {
    label: "Blog",
    path: "/blog",
  },
  {
    label: "Terms",
    path: "/terms",
  },
  {
    label: "Policy",
    path: "/policy",
  },
  {
    label: "Status",
    path: "/status",
  },
];

const Footer: FC<{}> = () => {
  return (
    <footer className="flex justify-between place-items-center max-w-screen-md mx-auto">
      {LINKS.map((link) => {
        return (
          <section>
            <Link href={link.path}>
              <a className="font-bold mx-2">{link.label}</a>
            </Link>
          </section>
        );
      })}
    </footer>
  );
};

export default Footer;
