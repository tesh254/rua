import { handleClientQuery } from 'helpers/axios-graphql';
import { GET_SINGLE_ISSUE, MARK_ISSUE_AS_HIDDEN, MARK_ISSUE_AS_READ } from './queries';

export async function getSingleIssue(issue_id: string) {
    try {
        const response = await handleClientQuery(GET_SINGLE_ISSUE, { feed_id: issue_id }, {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        });

        const { data, error } = response.data;

        if (error) {
            throw new Error('Error fetching issue');
        }

        return data.issue;
    }
    catch (error) {
        return error;
    }
}

export async function markIssueAsRead(feed_id: string, current_status: boolean) {
    try {
        const response = await handleClientQuery(MARK_ISSUE_AS_READ, { feed_id, current_status }, {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        })

        const { data, error } = response.data;

        if (error) {
            throw new Error('Problem marking issue as read');
        }

        return data.markFeedItemAsRead;
    } catch (error) {
        return error;
    }
}

export async function markIssueAsHidden(feed_id: string, current_status: boolean) {
    try {
        const response = await handleClientQuery(MARK_ISSUE_AS_HIDDEN, { feed_id, current_status }, {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        })

        const { data, error } = response.data;

        if (error) {
            throw new Error('Problem marking issue as hidden');
        }

        return data.markFeedItemAsHidden;
    } catch (error) {
        return error;
    }
}