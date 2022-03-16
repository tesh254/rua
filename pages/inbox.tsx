/// <reference path="../types.d.ts" />

import type { NextPage, NextPageContext } from "next";
// import { parseCookies } from "nookies";
import { gql } from "@apollo/client";
import apolloClient from "@/lib/apollo";
import { handleQuery } from "helpers/axios-graphql";
import withAuth from "hoc/with-auth";
import Script from "next/script";
import { useEffect, useRef } from "react";
import Layout from "@/components/layout";
import Link from "next/link";
import { useAuth } from "@/context/auth";
import { parseCookies } from "nookies";
import { getAllIssues } from "@/context/issues/services";
import IssueCard, { IssueProps } from "@/components/issue-card";

type Props = {
  profile: {
    id: string;
    username: string;
    in_app_email: string;
    is_onboarded: boolean;
    email: string;
  };
  issues: IssueProps[];
};

declare let process: {
  env: {
    NEXT_PUBLIC_PADDLE_PRODUCT_ID: string;
    NEXT_PUBLIC_PADDLE_VENDOR_ID: string;
    NEXT_PUBLIC_PADDLE_ENV: string;
  };
};

declare let window: {
  Paddle: {
    Setup: (options: { vendor: number; debug?: boolean }) => void;
    Checkout: {
      open: (options: {
        product: number;
        email: string;
        successCallback: (data: any, err: Error) => void;
      }) => void;
    };
    Environment: {
      set: (env: string) => void;
    };
  };
};

const Inbox: NextPage<Props> = ({ profile, issues }) => {
  console.log(issues);

  const { updateProfile } = useAuth();

  useEffect(() => {
    updateProfile(profile);
  }, []);
  const parseCookie = (str: string) =>
    str
      .split(";")
      .map((v) => v.split("="))
      .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
      }, {});

  useEffect(() => {
    console.log(parseCookie(document.cookie));
  }, []);
  function handlePayment() {
    window.Paddle.Checkout.open({
      product: Number(process.env.NEXT_PUBLIC_PADDLE_PRODUCT_ID),
      email: profile.email,
      successCallback: (data, err) => {
        if (err) {
          console.error(err);
        }
      },
    });
  }

  const inAppEmailRef: any = useRef();

  function onCopy() {
    inAppEmailRef?.current.select();

    inAppEmailRef?.current.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(inAppEmailRef?.current.value);
  }

  return (
    <Layout has_footer={false} has_nav={true}>
      <Script
        src="https://cdn.paddle.com/paddle/paddle.js"
        id="paddle-js"
        // strategy="afterInteractive"
        onLoad={() => {
          if (process.env.NEXT_PUBLIC_PADDLE_ENV === "sandbox") {
            window.Paddle.Environment.set("sandbox");
          }

          window.Paddle.Setup({
            vendor: Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR_ID),
          });
        }}
      />
      <section className="flex flex-wrap justify-center mb-[20px]">
        <div className="flex flex-col place-items-center">
          <h1 className="my-2 text-[32px]">
            Welcome{" "}
            <strong className="text-[#CB0C0C]">{profile.username}</strong>,
          </h1>
          <div className="my-2 relative select-none py-4 px-2 shadow-[0px_0px_3px_rgba(0,0,0,0.25)] flex justify-center place-items-center min-w-[400px] w-full rounded-[8px]">
            <input
              ref={inAppEmailRef}
              type="text"
              value={profile.in_app_email}
              className="text-[rgba(0,0,0,0.6)] text-center text-[16px] font-bold w-[100%] bg-white select-none"
              disabled
            />
            <svg
              className="w-6 h-6 absolute right-[16px] top-[16px] text-[rgba(0,0,0,0.6)] cursor-pointer transition duration-300 hover:text-[rgba(0,0,0,0.8)]"
              fill="currentColor"
              viewBox="0 0 20 20"
              role="button"
              onClick={onCopy}
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
          </div>
        </div>
      </section>
      <hr />
      <section className="py-[20px]">
        <h2 className="font-bold">New Issues</h2>
        {issues.map((issue) => (
          <IssueCard {...issue} is_alert={true} key={issue.id} />
        ))}
      </section>
    </Layout>
  );
};

export const getServerSideProps = (ctx: NextPageContext) => {
  return withAuth(ctx, async (profile) => {
    const cookies = parseCookies(ctx);

    try {
      const response = await getAllIssues(
        {
          limit: 10,
          order: "asc",
          page: 1,
        },
        {
          Authorization: `Bearer ${cookies.backend_token}`,
        }
      );

      console.log({ response });

      return {
        props: {
          issues: response.feed,
          profile,
        },
      };
    } catch (error: unknown) {
      return {
        props: {
          issues: [],
          profile,
        },
      };
    }
  });
};

export default Inbox;
