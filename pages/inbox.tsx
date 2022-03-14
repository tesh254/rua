/// <reference path="../types.d.ts" />

import type { NextPage, NextPageContext } from "next";
// import { parseCookies } from "nookies";
import { gql } from "@apollo/client";
import apolloClient from "@/lib/apollo";
import { handleQuery } from "helpers/axios-graphql";
import withAuth from "hoc/with-auth";
import Script from "next/script";
import { useEffect } from "react";
import Layout from "@/components/layout";
import Link from "next/link";
import { useAuth } from "@/context/auth";

type Props = {
  profile: {
    id: string;
    username: string;
    in_app_email: string;
    is_onboarded: boolean;
    email: string;
  };
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

const Inbox: NextPage<Props> = ({ profile }) => {
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
      <section className="flex flex-wrap mb-[20px]">
        <section className="shadow-md min-w-[250px] rounded-md flex flex-col w-fit p-[20px] mr-[8px] my-[8px]">
          <span className="font-extrabold my-[6px]">12</span>
          <span className="font-light my-[6px]">Subscriptions</span>
        </section>
        <section className="shadow-md min-w-[250px] rounded-md flex flex-col w-fit p-[20px] mr-[8px] my-[8px]">
          <span className="font-extrabold my-[6px]">150</span>
          <span className="font-light my-[6px]">Issues</span>
        </section>
        <section className="shadow-md min-w-[250px] rounded-md flex flex-col w-fit p-[20px] mr-[8px] my-[8px]">
          <span className="font-extrabold my-[6px]">3</span>
          <Link href="/issues">
            <a className="font-light my-[6px] flex">
              <span className="mr-2"> Unread </span>
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
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </Link>
        </section>
      </section>
      <hr />
      <section className="py-[20px]">
        <h2 className="font-bold">New Issues</h2>
        <section className="flex flex-col">
          <section className="border-b-2 flex place-items-center justify-between py-4">
            <p>
              <strong>Cody and Noel's 💩 Stories </strong> by{" "}
              <strong>podcasts@tmgstudios.tv </strong>
              dropped <strong>7hrs ago</strong>
            </p>
            <button>
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
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </section>
          <section className="border-b-2 flex place-items-center justify-between py-4">
            <p>
              <strong>High Beems</strong> by <strong>The Publish Press </strong>
              dropped <strong>7hrs ago</strong>
            </p>
            <button>
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
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </section>
          <section className="border-b-2 flex place-items-center justify-between py-4">
            <p>
              <strong>☕️ Tense</strong> by{" "}
              <strong>crew@morningbrew.com </strong>
              dropped <strong>4hrs ago</strong>
            </p>
            <button>
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
                  d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                />
              </svg>
            </button>
          </section>
        </section>
      </section>
    </Layout>
  );
};

export const getServerSideProps = (ctx: NextPageContext) => {
  return withAuth(ctx, async (profile) => {
    
    return {
      props: {
        profile,
      },
    };
  });
};

export default Inbox;
