export interface AxiosGraphqlOptions {
    method: 'POST' | 'GET' | 'OPTIONS' | 'PATCH' | 'DELETE' | 'PUT';
    url: string;
    headers: {
        [key: string]: string
    },
    data: {
        query: string;
        variables: {
            [key: string]: any;
        }
    }
}