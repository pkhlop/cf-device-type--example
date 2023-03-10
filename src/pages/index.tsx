import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import {GetServerSideProps, GetServerSidePropsContext} from "next";

const inter = Inter({subsets: ['latin']})

const Home = ({
                  deviceType,
                  isMobile,
                  allHeaders,
                  allQueries
              }) => {

    let header = `Device Is "${deviceType}"`

    let formattedHeaders = ""
    for (const key in allHeaders) {
        formattedHeaders += `${key}: ${allHeaders[key].substring(0, 100)}\n`
    }

    let formattedQuery = ""
    for (const key in allQueries) {
        formattedQuery += `${key}=${allQueries[key].substring(0, 100)}\n`
    }

    return (
        <>
            <Head>
                <title>{isMobile ? "📱" : "💻"}::{deviceType}</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={styles.main}>
                <h1 className={styles.title}>{header}</h1>

                <h2 className={styles.title}>Query:</h2>
                <pre>{formattedQuery}</pre>

                <h2 className={styles.title}>Headers:</h2>
                <pre>{formattedHeaders}</pre>
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (
    context: GetServerSidePropsContext
) => {
    context.res.setHeader(
        "Cache-Control",
        "public, s-maxage=300, stale-while-revalidate=600, stale-if-error=3600"
    );
    let urlFlag = null;
    if (context.query.hasOwnProperty("desktop")) {
        context.query.desktop = "true";
        urlFlag = "desktop";
    }
    if (context.query.hasOwnProperty("mobile")) {
        context.query.mobile = "true";
        if (context.query.hasOwnProperty("desktop")) {
            context.query.desktop = "false";
        }
        urlFlag = "mobile";
    }

    let headerFlag = context.req.headers["cf-device-type"] || null;

    return {
        props: {
            deviceType: urlFlag || headerFlag || "mobile",
            isMobile: (urlFlag || headerFlag || "mobile") == "mobile",
            allHeaders: context.req.headers,
            allQueries: context.query
        }
    };
};

export default Home;