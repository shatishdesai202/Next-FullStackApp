import React from "react";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <div className="relative w-full bg-red-200 flex justify-center">
        <Link href="https://github.com/shatishdesai202">
          Feel free to copy © 2021 Shatish Desai
        </Link>
      </div>
    </div>
  );
};

export default Footer;
