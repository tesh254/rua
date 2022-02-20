import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { setCookie } from 'utils/cookies';
import { getOAuthRequestToken } from 'utils/twitter';

const handler: NextApiHandler = async (req: any, res: NextApiResponse) => {
    try {
        const { oauthRequestToken, oauthRequestTokenSecret } = await getOAuthRequestToken();

        await setCookie(res, 'oauthData', JSON.stringify({
            oauthRequestToken,
            oauthRequestTokenSecret
        }))

        const authorizationUrl = `https://api.twitter.com/oauth/authorize?oauth_token=${oauthRequestToken}`;

        res.redirect(authorizationUrl);
    } catch (error) {
        // res.redirect('/');
        res.status(400).json({
            message: error.message
        })
    }
}

export default handler;