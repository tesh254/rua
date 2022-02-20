import type { NextPage, NextPageContext } from 'next';
import { parseCookies } from 'nookies';

const Inbox: NextPage = () => {
    return (
        <section>
            This is the inbox
        </section>
    )
}

export async function getServerSideProps(ctx: NextPageContext) {
    const cookies = parseCookies(ctx);

    console.log(cookies, ">>>>>>>");

    return {
        props: {
            // Anything returned here will be available
            // to the client as props
        },
    }
}

export default Inbox;
