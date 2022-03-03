import { NextPageContext } from "next";
import { parseCookies } from "nookies";
import { handleQuery } from "helpers/axios-graphql";

const withAuth = async (
  ctx: NextPageContext,
  getServerSidePropsFunc: (
    data: {
      profile: {
        id: string;
        username: string;
        in_app_email: string;
        is_onboarded: boolean;
      };
    }
  ) => Promise<any>) => {
  const cookies = parseCookies(ctx);

  const query = `
        query {
            profile {
                id
                username
                email
                in_app_email
                is_onboarded
            }
        }
    `;

  try {
    const {
      data: {
        data: { profile },
      },
    } = await handleQuery(
      query,
      {},
      {
        authorization: `Bearer ${cookies.backend_token}`,
      }
    );

    return await getServerSidePropsFunc(profile);
  } catch (error: any) {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
};

export default withAuth;
