import { NextPage, NextPageContext } from "next";
import withAuth from "hoc/with-auth";
import { useEffect } from "react";
import Layout from "@/components/layout";
import Link from "next/link";
import { parseCookies } from "nookies";
import { getSingleIssue } from "@/context/issues/services";

const SingleIssue: NextPage<any> = ({ issue }) => {
  return (
    <Layout has_footer={false} has_nav={true}>
      <section className="w-full">This is a newsletter issue</section>
    </Layout>
  );
};

export const getServerSideProps = (ctx: NextPageContext) => {
  return withAuth(ctx, async (_) => {
    const cookies = parseCookies(ctx);

    try {
      const queryId: unknown = ctx.query.id;
      const response = await getSingleIssue(
        {
          feed_id: queryId as string,
        },
        {
          Authorization: `Bearer ${cookies.backend_token}`,
        }
      );

      return {
        props: {
          issue: response,
        },
      };
    } catch (error: unknown) {
      return {
        props: {
          issue: {},
        },
      };
    }
  });
};

export default SingleIssue;