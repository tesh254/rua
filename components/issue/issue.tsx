import { useEffect, useState, FC } from "react";
import toast from "react-hot-toast";
import parse from "html-react-parser";
import { parseCookies } from "nookies";
import { getIssueFromS3 } from "@/context/issues/services";
import { getSingleIssue, markIssueAsHidden, markIssueAsRead } from "./services";

interface IIssue {
  title: string;
  subscription: {
    source_email: string;
    source_name: string;
  };
  id: string;
  is_read: boolean;
  is_hidden: boolean;
}

interface IS3Data {
  html: string;
}

type Props = {
  issue_id: string;
};

const Issue: FC<Props> = ({ issue_id }) => {
  const [issue, setIssue] = useState<IIssue | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState();

  const [s3Data, setS3Data] = useState<IS3Data>({
    html: "",
  });

  useEffect(() => {
    setLoading(true);

    getSingleIssue(issue_id)
      .then((res) => {
        setIssue(res);

        getIssueFromS3(res.feed_hosted_url)
          .then((s3Issue) => {
            setS3Data(s3Issue);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            setError(error);
          });
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, []);

  function handleMarkingAsRead() {
    markIssueAsRead(issue.id, issue.is_read)
      .then((res) => {
        setIssue((prev) => ({
          ...prev,
          is_read: res.is_read,
        }));
        // toast.success("Issue marked as read");
      })
      .catch((err) => {
        setError(err);
        toast.error(err.message);
      });
  }

  useEffect(() => {
    if (issue?.id && !issue.is_read) {
      const timeout = setTimeout(() => {
        handleMarkingAsRead();
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [issue?.id]);

  function handleMarkingAsHidden() {
    markIssueAsHidden(issue.id, issue.is_hidden)
      .then((res) => {
        setIssue((prev) => ({
          ...prev,
          is_hidden: res.is_hidden,
        }));
        toast.success(`Issue was ${res.is_hidden ? "unarchived" : "archived"}`);
      })
      .catch((err) => {
        setError(err);
        toast.error(err.message);
      });
  }

  return (
    <section className="w-full relative py-2">
      {!loading && (
        <section className="fixed opacity-50 left-[45%] hover:opacity-100 ring-gray-400 ring-2 rounded-md p-1 bg-white flex drop-shadow-xl bottom-[16px] z-[999]">
          {/* <button
            type="button"
            data-tooltip-target="tooltip-default"
            className="p-2 rounded-md hover:ring-2 hover:ring-green-500/50 text-green-500"
            style={{ transition: ".3s all" }}
            title="Add to category"
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2h-5L9 4H4zm7 5a1 1 0 00-2 0v1H8a1 1 0 000 2h1v1a1 1 0 002 0v-1h1a1 1 0 000-2h-1V9z"
                fillRule="evenodd"
              />
            </svg>
          </button> */}
          {/* <button
            type="button"
            className="p-2 text-red-500 rounded-md hover:ring-2 hover:ring-red-500/50"
            style={{ transition: ".3s all" }}
            title="Archive newsletter"
            onClick={handleMarkingAsHidden}
          >
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
              <path
                fillRule="evenodd"
                d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </button> */}
        </section>
      )}
      {loading && (
        <div className="flex w-full justify-center my-[20px] text-red-500">
          <svg
            className="animate-spin h-8 w-8 text-red"
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
              stroke-width="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      {!issue && !loading && (
        <p className="font-extrabold text-2xl">Issue was not found</p>
      )}
      {!loading && issue && (
        <section>
          <div className="flex place-items-center justify-center">
            <h1 className="font-extrabold text-center text-[32px]">
              {issue.title}
            </h1>
            {issue.is_hidden && (
              <div className="text-gray-300 ml-[8px]">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                  <path
                    fillRule="evenodd"
                    d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>=
          <p className="text-[20px] text-gray-500 text-center">
            {issue.subscription.source_email}
          </p>
          <section className="mx-auto">
            <section className="shadow-inner">
              {parse(s3Data.html)}
            </section>
          </section>
        </section>
      )}
    </section>
  );
};

export default Issue;
