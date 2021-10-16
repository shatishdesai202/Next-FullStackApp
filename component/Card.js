import React from "react";
import Link from "next/link";
import Image from "next/image";

const Card = ({ blog }) => {
  return (
    <div className="mb-10">
      <Link href={`/blog/${blog.slug}`}>
        <div className="border rounded-md border-gray-400 relative cursor-pointer">
          <Image
            width={200}
            height={200}
            layout="responsive"
            src={`/post-image/${blog.slug}/${blog.image}`}
          />
          <div className="absolute top-0 text-center h-full w-full flex justify-center items-center text-white bg-black bg-opacity-50 text-3xl font-semibold">
            {blog.blogImageTitle}
          </div>
        </div>
      </Link>
      <div className="font-mono bg-white h-1/4 px-5 py-2 leading-7	">
        {blog.excerpt}
      </div>
    </div>
  );
};

export default Card;
