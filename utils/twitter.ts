import * as oauth from 'oauth';
import { promisify } from 'util';

const oauthConsumer =  new oauth.OAuth(
    'https://twitter.com/oauth/request_token', 'https://twitter.com/oauth/access_token',
    process.env.TWITTER_API_KEY,
    process.env.TWITTER_API_SECRET,
    '1.0A', process.env.CALLBACK_URL, 'HMAC-SHA1');

interface ITokenHandler {
    oauthRequestToken: string;
    oauthRequestTokenSecret: string;
    oauthVerifier: string;
}

interface IRequestResponse {
    oauthAccessToken: string;
    oauthAccessTokenSecret: string;
    results: any;
}

interface IRequestTokensResponse {
    oauthRequestToken: string;
    oauthRequestTokenSecret: string;
    results: any;
}

export async function oauthGetUserById(userId, { oauthAccessToken, oauthAccessTokenSecret } ) {
    return promisify(oauthConsumer.get.bind(oauthConsumer))(`https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true&include_entities=false`, oauthAccessToken, oauthAccessTokenSecret)
        .then(body => JSON.parse(body))
}

export async function getOAuthAccessTokenWith({ oauthRequestToken, oauthRequestTokenSecret, oauthVerifier }: ITokenHandler): Promise<IRequestResponse> {
    return new Promise((resolve, reject) => {
        oauthConsumer.getOAuthAccessToken(oauthRequestToken, oauthRequestTokenSecret, oauthVerifier, function (error, oauthAccessToken, oauthAccessTokenSecret, results) {
            return error
                ? reject(new Error('Error getting OAuth access token', error.message))
                : resolve({ oauthAccessToken, oauthAccessTokenSecret, results })
        })
    })
}
export async function getOAuthRequestToken(): Promise<IRequestTokensResponse> {
    return new Promise((resolve, reject) => {
        oauthConsumer.getOAuthRequestToken(function (error, oauthRequestToken, oauthRequestTokenSecret, results) {
            return error
                ? reject(new Error('Error getting OAuth request token'))
                : resolve({ oauthRequestToken, oauthRequestTokenSecret, results })
        })
    })
}