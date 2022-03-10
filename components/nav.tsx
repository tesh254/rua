import { useAuth } from "@/context/auth";
import { generateSVG } from "@/lib/avatar";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const NAV_LINKS: {
  label: string;
  link: string;
  isComingSoon?: boolean;
}[] = [
  {
    label: "Dashboard",
    link: "/inbox",
  },
  {
    label: "Issues",
    link: "/issues",
  },
  {
    label: "Highlights",
    link: "/highlights",
    isComingSoon: true,
  },
  {
    label: "Account",
    link: "/account",
  },
];

type NavProps = {
  setHasNav: (hasNav: boolean) => void;
  hasNav: boolean;
};

const url = process.env.NEXT_PUBLIC_API_URL;

function Nav(props: NavProps) {
  const router = useRouter();
  const { profile } = useAuth();

  return (
    <section
      className={`relative ${
        !props.hasNav && "flex justify-between place-items-center py-2"
      }`}
    >
      <img src="/images/rua..svg" />
      {props.hasNav && (
        <>
          <ul className="list-none">
            {NAV_LINKS.map((navLink) => {
              return (
                <li
                  key={navLink.link}
                  className={`my-4 ${
                    router.pathname === navLink.link && "font-extrabold"
                  }`}
                >
                  <Link href={navLink.link}>
                    <a className="flex place-items-center">
                      <span>{navLink.label}</span>
                      {navLink.isComingSoon && (
                        <span className="p-1 text-xs ml-2 rounded-md bg-red-500 text-white">
                          soon
                        </span>
                      )}
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
          <section className="absolute">
            <button onClick={() => props.setHasNav(!props.hasNav)}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                />
              </svg>
            </button>
          </section>
        </>
      )}
      {!props.hasNav && (
        <Link href="/account">
          <a className="flex place-items-center">
            <img
              className="h-10 mr-2"
              src={
                profile?.username && `/api/avatar?username=${profile?.username}`
              }
              alt=""
            />
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </a>
        </Link>
      )}
    </section>
  );
}

export default Nav;
