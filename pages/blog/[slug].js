import React from "react";
import { getAllPost, getAllPostSlug, getPostData } from "../../lib/post-util";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

const BlogDetail = ({ postData }) => {
  const customRenderers = {
    img(props) {
      return (
        <Image
          src={`/post-image/${postData.slug}/${props.src}`}
          width={500}
          height={500}
        />
      );
    },
    code({ node, inline, className, children, ...props }) {
      return (
        <SyntaxHighlighter
          children={String(children).replace(/\n$/, "")}
          style={atomDark}
          language="javascript"
          PreTag="div"
          {...props}
        />
      );
    },
  };

  return (
    <div className="border rounded-md border-gray-400 relative cursor-pointer">
      <img
        className="h-52 w-full"
        src={`/post-image/${postData.slug}/${postData.image}`}
      />
      <div>
        <ReactMarkdown components={customRenderers}>
          {postData.content}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default BlogDetail;

export async function getStaticProps({ params }) {
  const { slug } = params;

  const postData = getPostData(slug + ".md");

  return {
    props: { postData, revalidate: 60 },
  };
}

export async function getStaticPaths() {
  const getAllPostsSlug = getAllPostSlug();

  return {
    paths: getAllPostsSlug,
    fallback: false,
  };
}
