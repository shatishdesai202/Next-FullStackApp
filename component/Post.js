import React from "react";
import Card from "./Card";

const Post = ({ allPost, isFeatured = false }) => {
  return (
    <div>
      <div className="flex justify-center items-center py-2">
        <span className="text-7xl font-mono">
          {isFeatured ? "Featured Blog" : "Blog"}
        </span>
      </div>
      <div className="grid lg:grid-cols-3 sm:grid-cols-1 gap-4 m-5">
        {allPost.map((blog, index) => (
          <Card key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default Post;
