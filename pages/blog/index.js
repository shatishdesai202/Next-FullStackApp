import React from "react";
import Post from "../../component/Post";
import { getAllPost } from "../../lib/post-util";

const Blog = ({ allPost }) => {
  return (
    <div className="bg-gray-300">
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
