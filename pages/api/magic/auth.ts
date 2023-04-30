import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { AxiosGraphqlOptions } from 'shared-types/graphql-options';
import { setCookie } from 'nookies';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") return res.status(405).end();

    try {
        const { name, email, picture: profile } = req.body;

        const preferredUsername = email.split("@")[0];

        if (!name || !email || !profile) return res.status(400).json({
            message: "Cannot get result"
        });

        const userData = {
            email,
            username: preferredUsername,
            password: "",
            account_avatar: profile,
            auth_type: "google"
        }

        const options: AxiosGraphqlOptions = {
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
                    payload: userData
                }
            }
        }

        const backendResponse = await axios.request(options);

        const {
            data: {
                authenticateUser: {
                    token,
                }
            }
        } = backendResponse.data;

        setCookie({ res }, 'backend_token', token, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/'
        })

        return res.status(200).json({
            status: 'ok',
        })
    } catch (error) {
        return res.status(400).json({
            status: 'fail'
        })
    }
}

export default handler;