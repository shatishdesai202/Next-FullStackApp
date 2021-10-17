import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <div className="relative w-full bg-red-200 flex justify-center bg-gradient-to-r from-yellow-500 py-5">
        <Link href="https://github.com/shatishdesai202">
          <span className="no-underline cursor-pointer">
            Feel free to copy © 2021 Shatish Desai
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
