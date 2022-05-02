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
  is_read,
  is_hidden,
}: IssueProps) {
  return (
    <>
      {is_alert && (
        <Link href={`/issues/${id}`}>
          <a>
            <section
              className={`${
                is_read ? "text-gray-400" : "text-black"
              } flex place-items-center py-4 border-b-2 justify-between`}
            >
              <p className="">
                <strong>{title}</strong> <span>by</span>{" "}
                <strong>{subscription.source_name}</strong> <span>dropped</span>{" "}
                <strong>
                  {moment(
                    momentTimezone.tz(
                      new Date(parseInt(created_at, 10)).toISOString(),
                      momentTimezone.tz.guess()
                    )
                  ).fromNow()}
                </strong>
              </p>
              {is_hidden && (
                <button className="text-gray-400" title={`Remove issue from archive`}>
                  <svg
                    className="w-5 h-5"
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
                </button>
              )}
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
                momentTimezone.tz(
                  new Date(parseInt(created_at, 10)).toISOString(),
                  momentTimezone.tz.guess()
                )
              ).format("MMMM Do YYYY, h:mm:ss a")}
            </span>
          </p>
        </section>
      )}
    </>
  );
}

export default IssueCard;
