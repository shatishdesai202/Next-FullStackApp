import "tailwindcss/tailwind.css";
import Head from "next/head";
import Layout from "../component/Layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <meta
          name="viewport"
          content="width=divice-width, initial-scale=1"
        ></meta>
        <title>welcome to Next.js Blog</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
