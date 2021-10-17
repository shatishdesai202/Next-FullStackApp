import React from "react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from "next/image";

import { getAllPostSlug, getPostData } from "../../lib/post-util";

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
    <>
      <Head>
        <meta name="description" content={postData.excerpt} />
        <title>{postData.title}</title>
      </Head>
      <div className="">
        <div className="m-5 bg-white">
          <div className="flex">
            <Image
              className="h-52 rounded-br-full"
              width={1000}
              height={1000}
              src={`/post-image/${postData.slug}/${postData.image}`}
            />
            <div>
              <div className="m-5 text-gray-500 text-3xl">
                {postData.excerpt}
              </div>
              <div className="mt-5 font-mono text-gray-500 text-xl">
                {postData.date}
              </div>
            </div>
          </div>

          <div className="m-5 p-5">
            <ReactMarkdown components={customRenderers}>
              {postData.content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </>
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
