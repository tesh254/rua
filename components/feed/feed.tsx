import { useEffect, useState, FC } from "react";
import { getFeedCursor } from "./services";
import toast from "react-hot-toast";
import IssueCard from "../issue-card";

const FeedList: FC<{}> = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>();
  const [feed, setFeed] = useState([]);
  const [limit, setLimit] = useState<number>(10);
  const [cursor, setCursor] = useState<string>(null);
  const [jump, setJump] = useState<number>(0);
  const [order, setOrder] = useState<string>("desc");

  useEffect(() => {
    setLoading(true);
    refetchFeed();
  }, []);

  function refetchFeed() {
    getFeedCursor(limit, cursor, jump, order)
      .then((res) => {
        setLoading(false);
        setFeed(res.feed);
        setJump(jump + 1);
        setLimit(res.limit);
        setCursor(res.cursor);
        setLimit(res.limit);
        setOrder(res.order);
      })
      .catch((err) => {
        setLoading(false);
        toast.error("Problem getting your issues");
      });
  }

  function loadMore() {
    setLoading(true);
    getFeedCursor(limit, cursor, jump + 1, order)
      .then((res) => {
        setLoading(false);
        const newFeed = res.feed ? [...feed, ...res.feed] : feed;
        if (res.feed) {
          setFeed(() => newFeed);
          setJump(jump + 1);
          setLimit(res.limit);
          setCursor(res.cursor);
          setLimit(res.limit);
          setOrder(res.order);
        }
      })
      .catch((err) => {
        setLoading(false);
        toast.success("You have reached the end");
        // toast.error("Problem getting your issues");
      });
  }

  return (
    <>
      {error && <section>Problem loading your issues</section>}
      {feed && (
        <section className="py-[20px] max-w-screen-md mx-auto">
          {feed.map((issue) => (
            <IssueCard {...issue} is_alert={true} key={issue.id} />
          ))}
          <section className="flex justify-center my-2">
            <button
              onClick={loadMore}
              className="flex rounded-[6px] text-normal bg-[#CB0C0C] p-[16px] text-white"
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
              ) : (
                <>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              )}
            </button>
          </section>
        </section>
      )}
    </>
  );
};

export default FeedList;
