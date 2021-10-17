import Head from "next/head";
import IntroSection from "../component/IntroSection";
import Post from "../component/Post";
import { getAllFeatured } from "../lib/post-util";

export default function Home({ allPost }) {
  return (
    <div>
      <Head>
        <meta name="description" content="next.js blog" />
        <title>welcome to Next.js Blog</title>
      </Head>
      <IntroSection />
      <Post isFeatured={true} allPost={allPost} />
    </div>
  );
}

export async function getStaticProps(context) {
  const allPost = getAllFeatured();

  return {
    props: { allPost },
  };
}
