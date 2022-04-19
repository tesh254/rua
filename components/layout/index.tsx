import { useState } from "react";
import getConfig from "next/config";
import Head from "next/head";
import { useRouter } from "next/router";
import Footer from "../footer";
import Nav from "../nav";
import { WithNavLayout, WithoutNav } from "./styled-components";

const { publicRuntimeConfig } = getConfig();

type LayoutProps = {
  title?: string;
  description?: string;
  date?: string;
  socialPreview?: string;
  children: React.ReactNode;
  has_footer: boolean;
  has_nav?: boolean;
  is_readonly?: boolean;
};

const Layout = ({
  children,
  has_footer,
  has_nav,
  is_readonly,
  ...customMeta
}: LayoutProps) => {
  const [hasNav, setHasNav] = useState(true);
  const router = useRouter();
  const { asPath } = router;

  const { name, url, title, description, socialPreview } =
    publicRuntimeConfig.site;

  const meta = {
    name,
    url,
    title,
    description,
    socialPreview,
    ...customMeta,
  };

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" key="favicon" />
        <link rel="canonical" href={`${url}${asPath}`} key="canonical" />

        {/* Twitter */}
        <meta
          name="twitter:card"
          content="summary_large_image"
          key="twitter_card"
        />
        <meta name="twitter:title" content={meta.title} key="twitter_title" />
        <meta
          name="twitter:description"
          content={meta.description}
          key="twitter_description"
        />
        <meta
          name="twitter:image"
          content={`${url}${socialPreview}`}
          key="twitter_image"
        />

        {/* Open Graph */}
        <meta property="og:url" content={`${url}${asPath}`} key="og_url" />
        <meta property="og:site_name" content={meta.name} key="og_site_name" />
        <meta property="og:title" content={meta.title} key="og_title" />
        <meta
          property="og:description"
          content={meta.description}
          key="og_description"
        />
        <meta
          property="og:image"
          content={`${url}${socialPreview}`}
          key="og_image"
        />
        <meta property="og:image:width" content={`1200`} key="og_image_width" />
        <meta
          property="og:image:height"
          content={`630`}
          key="og_image_height"
        />

        <meta name="description" content={meta.description} key="description" />
        {meta.date && (
          <meta property="article:published_time" content={meta.date} />
        )}
        <title key="title">{meta.title}</title>
      </Head>
      <section
        className={`max-w-screen h-screen mx-auto font-sans ${
          hasNav ? WithNavLayout : WithoutNav
        }`}
      >
        <aside className="w-full h-[40px]">
          {has_nav && <Nav setHasNav={setHasNav} hasNav={hasNav} />}
        </aside>
        <main className="max-w-screen-lg mx-auto w-full">{children}</main>
        {has_footer && <Footer />}
      </section>
    </>
  );
};

export default Layout;
