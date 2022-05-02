import { NextPage, NextPageContext } from "next";
import withAuth from "hoc/with-auth";
import Layout from "@/components/layout";
import Issue from "@/components/issue";

const SingleIssue: NextPage<{
  issue_id: string;
}> = ({ issue_id }) => {
  return (
    <Layout has_footer={false} has_nav={true}>
      <Issue issue_id={issue_id} />
    </Layout>
  );
};

export const getServerSideProps = (ctx: NextPageContext) => {
  return withAuth(ctx, async (profile) => {
    const queryId: unknown = ctx.query.issue_id;

    return {
      props: {
        issue_id: queryId as string,
        profile
      },
    };
  });
};

export default SingleIssue;
