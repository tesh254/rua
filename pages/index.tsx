import getConfig from "next/config";

import Layout from "@/components/Layout";
import Image from "next/image";

import { HOME_PAGE_COPY } from "copy/homepage";

const { publicRuntimeConfig } = getConfig();
const { name } = publicRuntimeConfig.site;

const Home = () => {
  return (
    <Layout has_footer={true}>
      <section className="py-4">
        <section className="flex justify-center">
          <Image
            src="/images/rua-logo-gray.svg"
            alt="rua-logo"
            width={87.57}
            height={26}
          />
        </section>
        <section className="py-4 text-center">
          <h1 className="font-extrabold text-5xl">
            A digest for all your newsletter subscription
          </h1>
          <p className="text-lg text-gray-600">
            <strong>rua </strong> makes it easy to read and manage all your
            issues in one place.
          </p>
        </section>
        <section className="flex justify-center">
          <button className="flex justify-between bg-black place-items-center py-2 px-4 rounded-lg text-white">
            {/* <img
              src="/images/twitter-icon.svg"
              className="w-5"
              alt="twitter icon"
            /> */}
            <p className="font-bold my-0 mx-2">Try it now</p>
          </button>
        </section>
        <section className="w-95 h-96 bg-gray-400 my-4 rounded-lg"></section>
        <section className="my-4 flex justify-center">
          <section className="text-center">
            <h2 className="font-bold text-3xl">{HOME_PAGE_COPY.main_title}</h2>
            <p className="text-gray-500">{HOME_PAGE_COPY.main_subtitle}</p>
            <ol className="text-left">
              {HOME_PAGE_COPY.main_items.map((item, idx) => {
                return (
                  <li className="my-3 flex place-items-center justify-equal">
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

export default Home;
