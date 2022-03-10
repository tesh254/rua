import { generateSVG } from '@/lib/avatar';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

const handler: NextApiHandler = (req: NextApiRequest, res: NextApiResponse) => {
    const username: unknown = req.query.username;

    let svg = generateSVG(username as string);

    res.setHeader("Content-Type", "image/svg+xml");

    res.send(svg);
}

export default handler;
