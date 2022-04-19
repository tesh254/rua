import { handleClientQuery } from "helpers/axios-graphql";
import { GET_FEED_CURSOR } from "./queries";

export async function getFeedCursor(
  limit: number,
  cursor: string,
  jump: number,
  order: string
) {
  try {
    const response = await handleClientQuery(
      GET_FEED_CURSOR,
      {
        limit,
        cursor,
        jump,
        order,
      },
      {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      }
    );

    const { data, error } = response.data;

    if (error) {
        throw new Error("Problem getting your issues");
    }

    return data.feed_cursor;
  } catch (error) {
    return error.message || error.response.data;
  }
}
