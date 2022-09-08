import Image from "next/image";
import { Magic } from "magic-sdk";
import useSWR from "swr";
import { useEffect } from "react";
import { OAuthExtension } from "@magic-ext/oauth";
import { useRouter } from "next/router";
import fetcher from "shared-utils/fetcher";
import axios from "axios";

function Oauth() {
  const router = useRouter();

  const { data } = useSWR("/api/magic/auth", fetcher);

  useEffect(() => {
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_PB_KEY, {
      extensions: [new OAuthExtension()],
    });

    const render = async () => {
      try {
        const result = await magic.oauth.getRedirectResult();

        const res = await axios.post("/api/magic/auth", result.oauth.userInfo);

        if (res.data.status === "ok") {
          router.push("/inbox");
        }

        router.push("/");
      } catch (error) {
        router.push("/");
      }
    };

    render();
  }, []);

  return (
    <div className="flex max-w-screen justify-center h-screen flex-col place-items-center">
      <Image
        src="/images/rua-logo-gray.svg"
        alt="rua-logo"
        width={87.57}
        height={26}
      />
      <div className="py-4 text-center">I promise this is the last spinner you see 😊</div>

      <div>
        <svg
          className="animate-spin h-10 w-10 text-red-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default Oauth;
