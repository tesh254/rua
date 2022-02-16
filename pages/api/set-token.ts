import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import { setCookie } from 'utils/cookies';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.status(405).json({
            message: "Method not allowed"
        });
    }

    const query = req.query;


    setCookie(res, 'token', query.token);

    res.send({
        is_okay: true,
    })
}

export default handler;