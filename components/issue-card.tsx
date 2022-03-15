import React from "react";
import moment from "moment";
import momentTimezone from "moment-timezone";
import Link from "next/link";

export type IssueProps = {
  id: string;
  title: string;
  feed_hosted_url: string;
  is_read: boolean;
  is_hidden: boolean;
  subscription: {
    source_name: string;
    source_email: string;
    source_avatar: string;
  };
  created_at: string;
  updated_at: string;
  is_alert: boolean;
};

function IssueCard({
  id,
  title,
  subscription,
  created_at,
  is_alert,
}: IssueProps) {
  return (
    <>
      {is_alert && (
        <Link href={`/issues/${id}`}>
          <a>
            <section className="flex place-items-center py-4 border-b-2 justify-between">
              <p className="">
                <strong>{title}</strong> <span>by</span>{" "}
                <strong>{subscription.source_name}</strong> <span>dropped</span>{" "}
                <strong>
                  {moment(
                    momentTimezone.tz(new Date(parseInt(created_at, 10)).toISOString(), momentTimezone.tz.guess())
                  ).fromNow()}
                </strong>
              </p>
              <button>
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </section>
          </a>
        </Link>
      )}
      {!is_alert && (
        <section className="flex flex-col">
          <h3 className="font-extrabold">{title}</h3>
          <p className="text-gray-400">
            {subscription.source_name}({subscription.source_email})
          </p>
          <p>
            <strong>Received: </strong>
            <span>
              {moment(
                momentTimezone.tz(new Date(parseInt(created_at, 10)).toISOString(), momentTimezone.tz.guess())
              ).format("MMMM Do YYYY, h:mm:ss a")}
            </span>
          </p>
        </section>
      )}
    </>
  );
}

export default IssueCard;
