import axios from 'axios';

const graphqlClient = axios.create({
    url: process.env.GRAPHQL_URL,
    headers: {
        'Content-Type': 'application/json'
    }
})

export const handleQuery = async (query: string, variables: any, headers: {
    [key: string]: string
}) => {
    const options: any = {
        method: 'POST',
        url: process.env.GRAPHQL_URL,
        headers,
        data: {
            query,
            variables
        }
    }

    return await axios.request(options);
}