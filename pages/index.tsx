import getConfig from "next/config";
import jwtDecode from "jwt-decode";
import { Magic } from "magic-sdk";

import Layout from "@/components/layout";
import Image from "next/image";

import { HOME_PAGE_COPY } from "copy/homepage";
import { useEffect, useState } from "react";
import { OAuthExtension } from "@magic-ext/oauth";
import { NextPageContext } from "next";
import { parseCookies } from "nookies";

const { publicRuntimeConfig } = getConfig();
const Home = () => {
  const [magic, setMagicClient] = useState<any>();

  useEffect(() => {
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PB_KEY, {
      // @ts-ignore
      extensions: [new OAuthExtension()],
    });

    setMagicClient(magic);
  }, []);

  function handleSubmit(e: { preventDefault: () => void }) {
    e.preventDefault();

    const callbackURL: unknown = process.env.NEXT_PUBLIC_MAGIC_CALLBACK_URL;

    (async () => {
      await magic.oauth.loginWithRedirect({
        provider: "google",
        redirectURI: callbackURL as string,
      });
    })();
  }

  return (
    <Layout has_footer={true} is_readonly={true}>
      <section className="py-4">
        <section className="flex justify-center">
          <Image
            src="/images/rua-logo-gray.svg"
            alt="rua-logo"
            width={87.57}
            height={26}
          />
        </section>
        <section className="pb-4 pt-16 text-center">
          <h1 className="font-extrabold text-5xl">
            A digest for all your newsletter subscription
          </h1>
          <p className="text-lg text-gray-600">
            <strong>rua </strong> makes it easy to read and manage all your
            issues in one place.
          </p>
        </section>
        <section className="flex justify-center">
          <section className="flex flex-col place-items-center">
            <button
              onClick={handleSubmit}
              className="flex w-full text-center justify-center bg-black place-items-center py-2 rounded-lg text-white"
            >
              <p className="font-bold my-1 mx-16">Sign in with Google</p>
            </button>
          </section>
        </section>
        <section className="w-95 h-96 my-4 flex justify-center rounded-lg">
          <img src="/images/inbox-preview.png" alt="inbox-preview" />
        </section>
        <section className="my-4 flex justify-center">
          <section className="text-center">
            <h2 className="font-bold text-3xl">{HOME_PAGE_COPY.main_title}</h2>
            <p className="text-gray-500">{HOME_PAGE_COPY.main_subtitle}</p>
            <ol className="text-left">
              {HOME_PAGE_COPY.main_items.map((item, idx) => {
                return (
                  <li
                    key={idx}
                    className="my-3 flex place-items-center justify-equal"
                  >
                    <span className="font-bold text-2xl">{idx + 1}.</span>
                    <section className="ml-2">
                      <p className="font-medium text-2xl my-1">{item.title}</p>
                      <p className="text-lg text-gray-500">{item.desc}</p>
                    </section>
                  </li>
                );
              })}
            </ol>
          </section>
        </section>
      </section>
    </Layout>
  );
};

export const getServerSideProps = (ctx: NextPageContext) => {
  const res = parseCookies(ctx);

  if (res && res.backend_token) {
    const id: unknown = res && jwtDecode(res.backend_token);

    if (id) {
      return {
        props: {},
        redirect: {
          permanent: false,
          destination: "/inbox",
        },
      };
    }
  }

  return {
    props: {},
  };
};

export default Home;
