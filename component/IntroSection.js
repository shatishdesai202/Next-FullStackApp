import React from "react";
import Image from "next/image";

const IntroSection = () => {
  return (
    <div className="bg-gradient-to-r from-blue-500 h-96 flex items-center justify-center">
      <div className="justify-center flex">
        <div>
          <div className="flex justify-center items-center">
            <Image
              src="/user(Dummy).jpg"
              width={150}
              height={150}
              className="rounded-full w-full"
            />
          </div>
          <div className="flex justify-center text-4xl">
            <div>
              <div className="flex justify-center items-center font-mono">
                I'm Shatish Desai
              </div>
              <div className="flex justify-center items-center slashed-zero font-mono">
                I'm Writing About OpenSource
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroSection;
