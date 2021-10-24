import "tailwindcss/tailwind.css";
import Head from "next/head";
import Layout from "../component/Layout";
import { Provider } from "next-auth/client";

function MyApp({ Component, pageProps }) {
  return (
    // <Provider session={pageProps.session}>
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
    // </Provider>
  );
}

export default MyApp;
