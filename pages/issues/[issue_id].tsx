import { NextPage, NextPageContext } from "next";
import withAuth from "hoc/with-auth";
import parse from "html-react-parser";
import Layout from "@/components/layout";
import { parseCookies } from "nookies";
import { getIssueFromS3, getSingleIssue } from "@/context/issues/services";
import { useAuth } from "@/context/auth";
import { useEffect } from "react";

const SingleIssue: NextPage<{
  profile: any;
  s3_data: any;
  issue: any;
}> = ({ issue, s3_data, profile }) => {
  const { updateProfile } = useAuth();

  useEffect(() => {
    updateProfile(profile);
  }, []);

  return (
    <Layout has_footer={false} has_nav={true}>
      {!issue && <p className="font-extrabold text-2xl">Issue was not found</p>}
      {issue && (
        <section className="w-full py-2">
          <h1 className="font-extrabold text-center text-[32px]">
            {issue.title}
          </h1>
          <p className="text-[20px] text-gray-500 text-center">
            {issue.subscription.source_email}
          </p>
          <section>{parse(s3_data.html)}</section>
        </section>
      )}
    </Layout>
  );
};

export const getServerSideProps = (ctx: NextPageContext) => {
  return withAuth(ctx, async (profile) => {
    const cookies = parseCookies(ctx);

    try {
      const queryId: unknown = ctx.query.issue_id;
      const { issue } = await getSingleIssue(
        {
          feed_id: queryId as string,
        },
        {
          Authorization: `Bearer ${cookies.backend_token}`,
        }
      );

      const feedFromS3 = await getIssueFromS3(issue.feed_hosted_url);

      return {
        props: {
          issue,
          s3_data: feedFromS3,
          profile,
        },
      };
    } catch (error: unknown) {
      return {
        props: {
          issue: {},
          s3_data: null,
          profile,
        },
      };
    }
  });
};

export default SingleIssue;
