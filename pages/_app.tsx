import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { Toaster } from "react-hot-toast";
import { ClerkProvider } from "@clerk/nextjs";
import apolloClient from "../lib/apollo";

import "@/styles/global.css";

const App = ({ Component, pageProps }: AppProps) => {
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

export default App;
