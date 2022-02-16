import axios from 'axios';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method not allowed"
        })
    }

    const options: any = {
        method: 'POST',
        url: process.env.GRAPHQL_URL,
        headers: {
            'Content-Type': 'application/json'
        },
        data: {
            query: `
                mutation authenticateUser($payload: AuthPayload!) {
                    authenticateUser(payload: $payload) {
                        token
                    }
                }
            `,
            variables: {
                payload: {
                    email: req.body.email,
                    username: req.body.username,
                    auth_type: 'magic_link',
                }
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