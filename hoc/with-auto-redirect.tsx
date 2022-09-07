import jwtDecode from "jwt-decode";
import { NextPageContext } from "next";
import { parseCookies } from "nookies";

const withAutoRedirect = (
  ctx: NextPageContext,
  getServerSidePropsFunc: (data: { is_authenticated: boolean }) => ({
    props: any;
    redirect?: {
        permanent: boolean,
        destination: string,
    }
  })
) => {
  const cookies = parseCookies(ctx);

  let auth;

  if (cookies.backend_token) {
    const data = jwtDecode(cookies.backend_token) as {
      id: string;
    };

    if (data.id) {
      auth = true;
    } else {
      auth = false;
    }
  }  else {
    auth = false;
  }

  return getServerSidePropsFunc({
    is_authenticated: auth
  })
};

export default withAutoRedirect;
