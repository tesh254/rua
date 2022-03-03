import type { NextPage, NextPageContext } from "next";
import { parseCookies } from "nookies";
import { gql } from "@apollo/client";
import apolloClient from "@/lib/apollo";
import { handleQuery } from "helpers/axios-graphql";
import withAuth from "hoc/with-auth";
import { useEffect } from "react";

type Props = {
  profile: {
    id: string;
    username: string;
    in_app_email: string;
    is_onboarded: boolean;
  };
};

const Inbox: NextPage<Props> = ({ profile }) => {
    useEffect(() => {
        console.log(document.cookie);
    }, [])

  return <section>This is {profile.username}'s inbox </section>;
};

export const getServerSideProps = (ctx: NextPageContext) => {
  return withAuth(ctx, async (profile) => {
    return {
      props: {
        profile,
      },
    };
  });
};

export default Inbox;
