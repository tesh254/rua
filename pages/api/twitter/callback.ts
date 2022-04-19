import axios from 'axios';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
// import { setCookie } from 'utils/cookies';
import { parseCookies, setCookie } from 'nookies';
import { getOAuthAccessTokenWith, oauthGetUserById } from 'utils/twitter';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const oauthData = JSON.parse(parseCookies({ req}).oauthData);

        const { oauth_verifier: oauthVerifier }: any = req.query;

        const { oauthAccessToken, oauthAccessTokenSecret, results } = await getOAuthAccessTokenWith({
            oauthRequestToken: oauthData.oauthRequestToken,
            oauthRequestTokenSecret: oauthData.oauthRequestTokenSecret,
            oauthVerifier
        })

        const { user_id: userId } = results;

        const user = await oauthGetUserById(userId, { oauthAccessToken, oauthAccessTokenSecret });


        const userData = {
            email: user.email,
            username: user.screen_name,
            password: "",
            account_avatar: user.profile_image_url_https,
            auth_type: "twitter"
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
                    payload: userData
                }
            }
        }

        const backendResponse = await axios.request(options);

        const {
            data: {
                authenticateUser: {
                    token
                }
            }
        } = backendResponse.data;

        // setCookie(res, "backend_token", token);
        // nookies.set()

        setCookie({ res }, 'backend_token', token, {
            maxAge: 30 * 24 * 60 * 60,
            path: '/',
        })

        res.redirect('/inbox')
    } catch (error) {
        // TODO: redirect to no user error page
        res.status(400).json({
            message: 'error signing in'
        })
    }
}

export default handler;