import Image, { ImageLoaderProps } from "next/image";
import { useState } from "react";
import { imageLoader } from "@/lib/utils";

const NORMAL_DIV = "transition duration-500 w-full md:w-1/2 mt-8 lg:mr-2";
const FULLSCREEN_DIV = "transition duration-500 w-screen h-screen fixed top-0 left-0 z-[999] bg-[rgba(0,0,0,0.9)]";
const NORMAL_FIGURE = "transition duration-500 relative w-full h-[460px]";
const FULLSCREEN_FIGURE = "transition duration-500 relative w-full h-screen";
const NORMAL_IMAGE = "object-cover object-top rounded-xl cursor-zoom-in";
const FULLSCREEN_IMAGE = "object-contain object-center rounded-xl cursor-zoom-out";

export default function WeaponImage({ weapImage, weapName }: { weapImage: any; weapName: string }) {
  const [isFullScreen, setIsFullScreen] = useState<Boolean>(false);
  const fullScreenHandler = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={isFullScreen ? FULLSCREEN_DIV : NORMAL_DIV}>
      <figure key="form-1" className={isFullScreen ? FULLSCREEN_FIGURE : NORMAL_FIGURE}>
        <Image onClick={fullScreenHandler} loader={imageLoader} src={weapImage as string} fill priority sizes="(max-width:768px) 100vw, 50vw" alt={weapName} className={isFullScreen ? FULLSCREEN_IMAGE : NORMAL_IMAGE} />
      </figure>
    </div>
  );
}
