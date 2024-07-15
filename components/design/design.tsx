"use client";
import { cn } from "@/lib/utils";
import { Playfair_Display } from "next/font/google";
import Script from "next/script";
import React from "react";
import { GetStartedButton } from "./get-started-btn";
import { Button } from "../ui/button";

const font = Playfair_Display({ subsets: ["latin"] });
const ParticleDesgin = () => {
  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/particles.js/2.0.0/particles.min.js"
      />
      <div className=" max-w-xl select-none absolute  mx-auto z-10 inset-3 items-center justify-center p-3 flex flex-col">
        <h1
          className={cn(
            "text-7xl font-bold bg-gradient-to-r from-cyan-500 to-blue-800 bg-clip-text text-transparent",
            font.className
          )}
        >
          IntelliWrite
        </h1>
        <div className="mt-4">
          <desc className="text-gray-500 font-normal text-sm pointer-events-none">
            A platform where you hear your idead and thoughts.
          </desc>
        </div>

        <div className="mt-4">
            <GetStartedButton >
                <Button className="rounded-full text-sm bg-gradient-to-r from-cyan-500 to-blue-800">Get Started</Button>
            </GetStartedButton>
        </div>
      </div>

      <div id="particles-js"></div>
      <Script strategy="lazyOnload" src="/js/particles.js" />
    </>
  );
};

export default ParticleDesgin;
