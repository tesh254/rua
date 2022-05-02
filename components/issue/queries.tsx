export const GET_SINGLE_ISSUE = `
    query issue($feed_id: String!) {
        issue(feed_id: $feed_id) {
            id
            title
            feed_hosted_url
            is_read
            is_hidden
            subscription {
                source_name
                source_email
                source_avatar
            }
            created_at
            updated_at
        }
    }
`;
