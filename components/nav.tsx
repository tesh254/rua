import { useAuth } from "@/context/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const NAV_LINKS: {
  label: string;
  link: string;
  isComingSoon?: boolean;
}[] = [
  {
    label: "Inbox",
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
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { profile } = useAuth();

  return (
    <section
      className={`fixed ${
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
        // <Link href="/account">
        <section className="relative">
          <section
            className="flex place-items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <img
              className="h-8 mr-2"
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
          </section>
          {isOpen && (
            <section className="absolute right-0 bg-white px-2 py-2 rounded-md drop-shadow-md border-1 border-gray-400">
              <ul className="list-none w-[200px] border-1 z-10 divide-y">
                <li className="py-2 px-1 select-none cursor-pointer">
                  <Link href="/account">
                    <a>Account</a>
                  </Link>
                </li>
                <li className="py-2 px-1 select-none cursor-pointer">
                  <Link href="/issues">
                    <a>Issues</a>
                  </Link>
                </li>
                <li
                  className="py-2 px-2 select-none flex place-items-center cursor-pointer"
                  onClick={() => props.setHasNav(!props.hasNav)}
                >
                  <svg
                    className="w-6 h-6 mr-[8px]"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                  <span>Open side menu</span>
                </li>
              </ul>
            </section>
          )}
        </section>
        // </Link>
      )}
    </section>
  );
}

export default Nav;
