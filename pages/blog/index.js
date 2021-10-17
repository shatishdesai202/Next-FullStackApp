import React from "react";
import Head from "next/head";
import Post from "../../component/Post";
import { getAllPost } from "../../lib/post-util";

const Blog = ({ allPost }) => {
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
