import { NextPage, NextPageContext } from "next";
import withAuth from "hoc/with-auth";
import { useEffect } from "react";
import Layout from "@/components/layout";
import Link from "next/link";
import { parseCookies } from "nookies";
import { getAllIssues } from "@/context/issues/services";
import IssueCard, { IssueProps } from "@/components/issue-card";

const Issues: NextPage<{
  issues: IssueProps[];
}> = ({ issues }) => {
  return (
    <Layout has_footer={false} has_nav={true}>
      <section className="py-[20px]">
        <h2 className="text-2xl">
          Issues
        </h2>
        {issues.map((issue) => {
          return (
            <IssueCard {...issue} is_alert={false} key={issue.id} />
          )
        })}
      </section>
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

      return {
        props: {
          issues: response.feed,
        },
      };
    } catch (error: unknown) {
      return {
        props: {
          issues: []
        },
      };
    }
  });
};

export default Issues;
