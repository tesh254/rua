import axios from "axios";
import { handleQuery } from "helpers/axios-graphql";

export async function getAllIssues(variables: {
    limit: number;
    order: string;
    page: number;
}, headers) {
    const query = `        
        query feed_default($limit: Int!, $order: String!, $page: Int!){
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

    try {
        const response = await handleQuery(query, variables, headers);

        const { data, error } = response.data;

        console.log({ data: data.feed_default.feed });

        if (error) {
            throw new Error("Error fetching issue");
        }

        return data.feed_default;
    } catch (error: unknown) {
        return error;
    }
}

export async function getSingleIssue(variables: {
    feed_id: string
}, headers) {
    const query = `
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
    `

    try {
        const response = await handleQuery(query, variables, headers);

        const { data, error } = response.data;

        if (error) {
            throw new Error("Error fetching issue");
        }

        return data;
    } catch (error: unknown) {
        return error;
    }
}

export async function getIssueFromS3(hostedUrl) {
    try {
        const response = await axios.get(hostedUrl);

        return response.data;
    } catch (error) {
        return error.response.data;
    }
}