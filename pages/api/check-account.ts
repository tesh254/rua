import axios from 'axios';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const options: any = {
        method: 'POST',
        url: process.env.GRAPHQL_URL,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            query: `
                query has_account($email: String!) {
                    has_account(email: $email)
                }
            `,
            variables: {
                email: req.body.email,
            }
        }
    }

    try {
        const response = await axios.request(options);

        return res.status(response.status).json(response.data);
    } catch (error) {
        return res.status(error.response.status).json(error.response.data);
    }
}

export default handler;