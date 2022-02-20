import type { NextPage, NextPageContext } from 'next';
import { parseCookies } from 'nookies';
import { gql } from '@apollo/client'
import apolloClient from '@/lib/apollo';
import { handleQuery } from 'helpers/axios-graphql';

const Inbox: NextPage = () => {
    return (
        <section>
            This is the inbox
        </section>
    )
}

export async function getServerSideProps(ctx: NextPageContext) {
    const cookies = parseCookies(ctx);

    const query = `
        query {
            profile {
                id
                username
                email
                in_app_email
            }
        }
    `;

    const { data } = await handleQuery(query, {}, {
        authorization: `Bearer ${cookies.backend_token}`
    })

    console.log(data);

    return {
        props: {
            // Anything returned here will be available
            // to the client as props
        },
    }
}

export default Inbox;
