import { handleQuery } from 'helpers/axios-graphql';
import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';

const handler: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Method not allowd",
        })
    }

    const query = `
        mutation plan($email: String, $paddle: PaddleInput) {
            plan(email: $email, paddle: $paddle) {
            name
            plan_slug
            price
            price_current
            price_start_date
            price_end_date
            is_expired
            paddle_customer_id
            subscriber_id
            }
        }
    `;

    try {
        const { data } = await handleQuery(query, {
            email: req.body.email,
            paddle: {
                plan_name: req.body.plan_name,
                sale_gross: req.body.sale_gross,
                currency: req.body.currency,
                next_bill_date: req.body.next_bill_date,
                subscription_id: req.body.subscription_id,
                receipt_url: req.body.receipt_url,
                status: req.body.status,
                event_time: req.body.event_time,
                checkout_id: req.body.checkout_id,
                earnings: req.body.earnings,
                alert_name: req.body.alert_name
            }
        }, {
            'Content-Type': 'application/json'
        });

        return res.status(200).json(data)
    } catch (error) {
        return res.status(400).json({
            message: "Error processing request",
        })
    }

    // console.log(req.body);

    // return res.status(200).json(req.body);
}

export default handler;