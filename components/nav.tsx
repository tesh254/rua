import { useAuth } from "@/context/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";

const NAV_LINKS: {
  label: string;
  link: string;
  icon: JSX.Element;
  isComingSoon?: boolean;
}[] = [
  {
    label: "Inbox",
    link: "/inbox",
    icon: (
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          d="M2.94 6.412A2 2 0 002 8.108V16a2 2 0 002 2h12a2 2 0 002-2V8.108a2 2 0 00-.94-1.696l-6-3.75a2 2 0 00-2.12 0l-6 3.75zm2.615 2.423a1 1 0 10-1.11 1.664l5 3.333a1 1 0 001.11 0l5-3.333a1 1 0 00-1.11-1.664L10 11.798 5.555 8.835z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  // {
  //   label: "Account",
  //   link: "/account",
  //   icon: (
  //     <svg
  //       className="w-6 h-6"
  //       fill="currentColor"
  //       viewBox="0 0 20 20"
  //       xmlns="http://www.w3.org/2000/svg"
  //     >
  //       <path
  //         fillRule="evenodd"
  //         d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
  //         clipRule="evenodd"
  //       />
  //     </svg>
  //   ),
  // },
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
      className={`fixed w-full bg-white z-[999] ${
        props.hasNav && "flex justify-between place-items-center border-b-[1px]"
      }`}
    >
      {!props.hasNav && <img src="/images/rua..svg" />}
      {props.hasNav && (
        <>
          <ul className="list-none flex w-full py-[8px] justify-center" style={{ margin: '0px'}}>
            {NAV_LINKS.map((navLink) => {
              return (
                <li
                  key={navLink.link}
                  className={`mx-4 ${
                    router.pathname === navLink.link && "text-[#CB0C0C] font-extrabold"
                  }`}
                >
                  <Link href={navLink.link}>
                    <a className="flex place-items-center">
                      <span className="mr-[8px]">
                        {navLink.icon}
                      </span>
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
        </section>
        // </Link>
      )}
    </section>
  );
}

export default Nav;
