import React from "react";
import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <div className="sticky top-0 w-full py-4 z-50 bg-white">
      <div className="flex justify-between">
        <div className="pl-5">
          <Link href="/">
            <Image src="/next-image.png" height={50} width={100} />
          </Link>
        </div>
        <div className="text-xl mr-14  items-center flex gap-2">
          <Link className="" href="/blog">
            <span className="hover:underline">All blog</span>
          </Link>
          <Link href="/contact">
            <span className="hover:underline">Contact</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
