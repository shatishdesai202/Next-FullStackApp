import { useEffect, useState } from "react";
import { getSession } from "next-auth/client";
import Head from "next/head";
import router from "next/router";
import IntroSection from "../component/IntroSection";
import Post from "../component/Post";
import { getAllFeatured } from "../lib/post-util";

export default function Home({ allPost }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getSession().then((session) => {
      if (!session) {
        router.push("/signin");
      } else {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return <p>Loading....</p>;
  }

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
