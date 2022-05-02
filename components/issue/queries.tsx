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

export const MARK_ISSUE_AS_READ = `
    mutation markFeedItemAsRead($feed_id: String, $current_status: Boolean) {
        markFeedItemAsRead(feed_id: $feed_id, current_status: $current_status) {
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

export const MARK_ISSUE_AS_HIDDEN = `
    mutation markFeedItemAsHidden($feed_id: String, $current_status: Boolean) {
        markFeedItemAsHidden(feed_id: $feed_id, current_status: $current_status) {
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
