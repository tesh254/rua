import React, { useEffect } from "react";
import { setup } from "goober";
import { prefix } from "goober-autoprefixer";
import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import apolloClient from "../lib/apollo";

import "@/styles/global.css";
import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import { handleQuery } from "helpers/axios-graphql";
import { AuthProvider } from "@/context/auth";
import { parseCookieOnClient } from "utils/cookies";
// import 'flowbite';

// This could be the best place to define it once.
// Since `_app.js is running for both
setup(React.createElement, prefix);

const App = ({ Component, pageProps, ...rest }: AppProps) => {
  function syncAuth() {
    const parsedToken = parseCookieOnClient(document.cookie).backend_token;

    if (parsedToken) {
     localStorage.setItem("auth_token", parsedToken);
    }
  }

  useEffect(() => {
    syncAuth();
    const interval = setInterval(() => {
      syncAuth();
    }, 5000)

    return () => {
      clearInterval(interval);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Toaster />
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
      <Toaster
        position="top-center"
        reverseOrder={false}
        gutter={8}
        containerClassName=""
        containerStyle={{}}
        toastOptions={{
          // Define default options
          className: "",
          duration: 5000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          // Default options for specific types
          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </ApolloProvider>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const cookies = parseCookies(ctx);

  if (cookies.backend_token) {
    try {
      const query = `
        query {
            profile {
                id
                username
                email
                in_app_email
            }
        }
    `;

      const {
        data: {
          data: { profile },
        },
      } = await handleQuery(
        query,
        {},
        {
          authorization: `Bearer ${cookies.backend_token}`,
        }
      );

      return {
        props: {
          account: profile,
        },
      };
    } catch (error) {
      return {
        props: {
          account: null,
        },
      };
    }
  } else {
    return {
      props: {
        account: null,
      },
    };
  }
}

export default App;
