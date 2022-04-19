import { gql } from "@apollo/client";

export const GET_FEED_DEFAULT = gql`
  query feed_default($limit: Int!, $order: String!, $page: Int!) {
    feed_default(limit: $limit, order: $order, page: $page) {
      feed {
        id
        title
        feed_hosted_url
        is_read
        is_hidden
        subscription {
          id
          source_email
          source_name
          platform_domain
          source_avatar
          created_at
          updated_at
        }
        created_at
        updated_at
      }
      limit
      total_pages
      current_page
      cursor
      order
    }
  }
`;

export const GET_FEED_CURSOR = `
  query feed_cursor(
    $limit: Int!
    $cursor: String
    $jump: Int!
    $order: String!
  ) {
    feed_cursor(limit: $limit, cursor: $cursor, jump: $jump, order: $order) {
      feed {
        id
        title
        feed_hosted_url
        is_read
        is_hidden
        subscription {
          id
          source_email
          source_name
          platform_domain
          source_avatar
          created_at
          updated_at
        }
        created_at
        updated_at
      }
      limit
      total_pages
      current_page
      cursor
      order
    }
  }
`;
