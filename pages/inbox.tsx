/// <reference path="../types.d.ts" />

import type { NextPage, NextPageContext } from "next";
// import { parseCookies } from "nookies";
import { gql } from "@apollo/client";
import apolloClient from "@/lib/apollo";
import { handleQuery } from "helpers/axios-graphql";
import withAuth from "hoc/with-auth";
import Script from "next/script";
import { useEffect } from "react";

type Props = {
  profile: {
    id: string;
    username: string;
    in_app_email: string;
    is_onboarded: boolean;
    email: string;
  };
};

const Inbox: NextPage<Props> = ({ profile }) => {
  const parseCookie = (str: string) =>
    str
      .split(";")
      .map((v) => v.split("="))
      .reduce((acc, v) => {
        acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
        return acc;
      }, {});

  useEffect(() => {
    console.log({ cookie: parseCookie(document.cookie) });
  }, []);

  function handlePayment() {
    window.Paddle.Checkout.open({
      product: Number(process.env.NEXT_PUBLIC_PADDLE_PRODUCT_ID),
      email: profile.email,
      successCallback: (data, err) => {
        if (err) {
          console.error(err);
        }

        console.log(data);
      },
    });
  }

  return (
    <section>
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
      <button onClick={handlePayment}>Buy now</button>
    </section>
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


  