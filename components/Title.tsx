"use client";

// import Video  from "next-video"
// import vid from "@/public/fid.mp4"


import gif from "@/public/t.gif"
import Image from "next/image"
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { client } from "@/sanity/lib/client";
const Title = () => {
  return (
    <div className="flex p-10">
      <div className="">
         <h1 className="sm:text-6xl font-extrabold uppercase">Top <span className="text-blue-500">Fashion</span></h1>
         <h1 className="sm:text-6xl font-extrabold uppercase">Top style</h1>
         <h2 className="sm:text-6xl font-extrabold ">Shop with us at wyna & co.</h2>
         <p className="text-white bg-black text-center p-4 rounded mt-4 cursor-pointer">SHOP NOW</p>

      </div>
      {/* <Video src={vid}/> */}
      {/* <Image src={gif} alt="gif" width={300} height={300}/> */}
      <DotLottieReact
      src="https://lottie.host/44c0163c-2c88-4881-943f-80270a764c1f/62KEZNzcdU.lottie"
      loop
      autoplay
      className="mr-10"
    />
    </div>
  )
}

export default Title