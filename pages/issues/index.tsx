import { NextPage, NextPageContext } from "next";
import withAuth from "hoc/with-auth";
import { useEffect } from "react";
import Layout from "@/components/layout";
import Link from "next/link";
import { parseCookies } from "nookies";
import { getAllIssues, getSingleIssue } from "@/context/issues/services";

const Issues: NextPage<any> = ({ issue }) => {
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
      const response = await getAllIssues(
        {
          limit: 5,
          order: "asc",
          page: 1,
        },
        {
          Authorization: `Bearer ${cookies.backend_token}`,
        }
      );

      console.log(response)

      return {
        props: {
          issue: {},
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

export default Issues;
