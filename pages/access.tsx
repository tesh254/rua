import { FC, useState } from "react";
import Layout from "@/components/layout";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import Link from "next/link";
import axios from "axios";

const Access: FC<{}> = () => {
  const [state, setState] = useState({
    email: "",
    username: "",
  });

  const router = useRouter();

  const form_type = router.query?.form;

  const __signIn = async () => {
    if (state.email && state.username) {
      localStorage.setItem("claimed_username", state.username);
      const { user, error } =
        form_type === "signup"
          ? await signUp({
              email: state.email,
            })
          : await signIn({
              email: state.email,
            });

      if (user.email) {
        axios
          .post(`/api/auth`, {
            email: user.email,
            username: state.username,
          })
          .then((res) => {
            const {
              data: {
                authenticateUser: { token },
              },
            } = res.data;

            axios.post(`/api/set-token?token=${token}`).then().catch();
          })
          .catch((err) => {
            toast.error(`Sorry we couldn't give you access.`);
          });
      }

      if (error) {
        toast.error(error.message);
      } else {
      }
    }
  };

  return (
    <Layout has_footer={false}>
      <section className="flex w-full h-full justify-center items-center h-screen">
        {form_type ? (
          <section className="flex justify-center">
            <section className="flex flex-col">
              <img src="/images/rua-logo-black.svg" alt="" />
              <br />
              {form_type === "signup" && (
                <>
                  <label className="text-left font-bold text-gray-600">
                    Username
                  </label>
                  <input
                    type="username"
                    placeholder="Claim username"
                    className="my-2 py-2 px-4 placeholder-italic rounded-lg mr-2 focus:outline-none outline-none ring-2 ring-gray-600 focus:ring-2 focus:ring-black focus:border-transparent"
                    value={state.username}
                    onChange={(e: any) => {
                      const VALUE = e.target.value;

                      setState((prev) => ({
                        ...prev,
                        username: VALUE,
                      }));
                    }}
                  />
                </>
              )}
              <label className="text-left font-bold text-gray-600">Email</label>
              <input
                type="email"
                placeholder="Your email"
                className="my-2 py-2 px-4 placeholder-italic rounded-lg mr-2 focus:outline-none outline-none ring-2 ring-gray-600 focus:ring-2 focus:ring-black focus:border-transparent"
                value={state.email}
                onChange={(e: any) => {
                  const VALUE = e.target.value;

                  setState((prev) => ({
                    ...prev,
                    email: VALUE,
                  }));
                }}
              />
              <button
                onClick={() => {
                  __signIn().then().catch();
                }}
                className="flex w-full text-center justify-center bg-black place-items-center py-2 rounded-lg text-white"
              >
                <p className="font-bold my-0">
                  {form_type === "signup" ? "Continue to Rua" : "Sign In"}
                </p>
              </button>

              {form_type === "signup" && (
                <p>
                  By creating an account you accept the <br />{" "}
                  <Link href={`/toc`}>
                    <a className="underline font-bold">Terms of Service</a>
                  </Link>{" "}
                  and{" "}
                  <Link href={`/privacy`}>
                    <a className="underline font-bold">Privacy</a>
                  </Link>
                </p>
              )}
            </section>
          </section>
        ) : (
          <section className="flex flex-col">
            <p className="text-2xl font-extrabold">State your purpose?</p>
            <button
              onClick={() => {
                router.push(`/access?form=signup`);
              }}
              className="flex w-full text-center justify-center bg-black place-items-center py-2 rounded-lg text-white"
            >
              <p className="font-bold my-1 mx-16">Trying out rua.</p>
            </button>
            <br />
            <button
              onClick={() => {
                router.push(`/access?form=login`);
              }}
              className="flex w-full text-center justify-center bg-black place-items-center py-2 rounded-lg text-white"
            >
              <p className="font-bold my-1 mx-16">Sign In to rua.</p>
            </button>
          </section>
        )}
      </section>
    </Layout>
  );
};

export default Access;
