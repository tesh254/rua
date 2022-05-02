import { handleClientQuery } from 'helpers/axios-graphql';
import { GET_SINGLE_ISSUE } from './queries';

export async function getSingleIssue(issue_id: string) {
    try {
        const response = await handleClientQuery(GET_SINGLE_ISSUE, { feed_id: issue_id }, {
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        });

        const { data, error } = response.data;

        console.log({ error })

        if (error) {
            throw new Error('Error fetching issue');
        }

        return data.issue;
    }
    catch (error) {
        console.log({ error })
        return error;
    }
}