import { serialize, CookieSerializeOptions } from 'cookie'
import { NextApiResponse } from 'next'

/**
 * This sets `cookie` using the `res` object
 */

export const setCookie = (
    res: NextApiResponse,
    name: string,
    value: unknown,
    options: CookieSerializeOptions = {}
) => {
    const stringValue =
        typeof value === 'object' ? 'j:' + JSON.stringify(value) : String(value)

    if ('maxAge' in options) {
        options.expires = new Date(Date.now() + options.maxAge)
        options.maxAge /= 1000
    }

    res.setHeader('Set-Cookie', serialize(name, stringValue, options))
}

export const parseCookieOnClient = (
    str: string
): {
    backend_token: string;
} => {
    if (str) {
        const payload: unknown = str
            .split(";")
            .map((v) => v.split("="))
            .reduce((acc, v) => {
                acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
                return acc;
            }, {});

        return payload as {
            backend_token: string;
        };
    } else {
        return {
            backend_token: null
        }
    }
}