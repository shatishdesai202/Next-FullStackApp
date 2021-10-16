import Image from "next/image";
import IntroSection from "../component/IntroSection";
import Post from "../component/Post";
import ReactMarkdown from "react-markdown";
import { getAllFeatured } from "../lib/post-util";

export default function Home({ allPost }) {
  return (
    <div className="">
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
