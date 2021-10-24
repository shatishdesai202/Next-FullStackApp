import React from "react";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/client";

const Header = () => {
  const [session, loading] = useSession();

  return (
    <div className="sticky top-0 w-full py-4 z-50 bg-white">
      <div className="flex justify-between">
        <div className="pl-5 cursor-pointer">
          <Link href="/">
            <Image src="/next-image.png" height={50} width={100} />
          </Link>
        </div>
        <div className="text-xl mr-14  items-center flex gap-4">
          {session && !loading && (
            <>
              <Link className="" href="/blog">
                <span className="hover:underline cursor-pointer">All blog</span>
              </Link>
              <Link href="/contact">
                <span className="hover:underline cursor-pointer">Contact</span>
              </Link>
              <Link href="/change-password">
                <span className="hover:underline cursor-pointer">
                  Change Password
                </span>
              </Link>
              <span onClick={() => signOut()}>
                <span className="hover:underline cursor-pointer">Log Out</span>
              </span>
            </>
          )}
          {!session && (
            <>
              <Link href="/signin">
                <span className="hover:underline cursor-pointer">Sign In</span>
              </Link>
              <Link href="/signup">
                <span className="hover:underline cursor-pointer">Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
