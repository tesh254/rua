import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import apolloClient from "../lib/apollo";

import "@/styles/global.css";
import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import { handleQuery } from "helpers/axios-graphql";

const App = ({ Component, pageProps, ...rest }: AppProps) => {
  console.log({ pageProps, rest })

  return (
    <ClerkProvider>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />
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
    </ClerkProvider>
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

    const { data: {
      data: {
        profile
      }
    } } = await handleQuery(
      query,
      {},
      {
        authorization: `Bearer ${cookies.backend_token}`,
      }
    );

    return {
      props: {
        account: profile,
      }
    }

    } catch (error ) {
      console.log(error);

      return {
        props: {
          account: null,
        }
      }
    }
  } else {
    return {
      props: {
        account: null,
      }
    }
  }
}

export default App;
