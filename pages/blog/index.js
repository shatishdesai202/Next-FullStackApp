import React, { useEffect, useState } from "react";
import Head from "next/head";
import { getSession } from "next-auth/client";
import Post from "../../component/Post";
import { getAllPost } from "../../lib/post-util";
import { useRouter } from "next/router";

const Blog = ({ allPost }) => {
  const router = useRouter();

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
    <div className="bg-gray-300">
      <Head>
        <meta name="description" content="next.js blog" />
        <title>📚 All-Blog</title>
      </Head>
      <Post allPost={allPost} />
    </div>
  );
};

export default Blog;

export async function getStaticProps(context) {
  const allPost = getAllPost();

  return {
    props: { allPost },
  };
}
