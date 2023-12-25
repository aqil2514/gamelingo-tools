import { CharacterImage } from "@/models/Evertale/Characters";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "../../scrollbar.css";
import "./swiper-config.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image, { ImageLoaderProps } from "next/image";
import { RefObject, useState } from "react";
import { imageLoader } from "@/lib/utils";

const NORMAL_DIV = "transition duration-500 w-full md:w-1/2 mt-8 lg:mr-2";
const FULLSCREEN_DIV = "transition duration-500 w-screen h-screen fixed top-0 left-0 z-[999] bg-[rgba(0,0,0,0.9)]";
const NORMAL_FIGURE = "transition duration-500 relative w-full h-[460px]";
const FULLSCREEN_FIGURE = "transition duration-500 relative w-full h-screen";
const NORMAL_IMAGE = "object-cover object-top rounded-xl cursor-zoom-in";
const FULLSCREEN_IMAGE = "object-contain object-center rounded-xl cursor-zoom-out";

export default function CharImage({ charImage, charName, part1, part2, part3 }: { charImage: CharacterImage; charName: string; part1: RefObject<HTMLElement>; part2: RefObject<HTMLElement>; part3: RefObject<HTMLElement> }) {
  const [isFullScreen, setIsFullScreen] = useState<Boolean>(false);
  const fullScreenHandler = () => {
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className={isFullScreen ? FULLSCREEN_DIV : NORMAL_DIV}>
      <Swiper
        modules={[Navigation, Pagination]}
        slidesPerView={1}
        navigation={{ enabled: true }}
        pagination={{ clickable: true }}
        onSlideChange={(e) => {
          const actiiveImg = e.activeIndex;
          if (actiiveImg === 0) {
            if (part1.current) {
              (part1.current as HTMLElement).style.display = "block";
            }
            if (part2.current) {
              (part2.current as HTMLElement).style.display = "none";
            }
            if (part3.current) {
              (part3.current as HTMLElement).style.display = "none";
            }
          }
          if (actiiveImg === 1) {
            if (part1.current) {
              (part1.current as HTMLElement).style.display = "none";
            }
            if (part2.current) {
              (part2.current as HTMLElement).style.display = "block";
            }
            if (part3.current) {
              (part3.current as HTMLElement).style.display = "none";
            }
          }
          if (actiiveImg === 2) {
            if (part1.current) {
              (part1.current as HTMLElement).style.display = "none";
            }
            if (part2.current) {
              (part2.current as HTMLElement).style.display = "none";
            }
            if (part3.current) {
              (part3.current as HTMLElement).style.display = "block";
            }
          }
        }}
      >
        <SwiperSlide key="form-1">
          <figure key="form-1" className={isFullScreen ? FULLSCREEN_FIGURE : NORMAL_FIGURE}>
            <Image onClick={fullScreenHandler} loader={imageLoader} src={charImage.f1Img as string} fill priority sizes="(max-width:768px) 100vw, 50vw" alt={charName} className={isFullScreen ? FULLSCREEN_IMAGE : NORMAL_IMAGE} />
          </figure>
        </SwiperSlide>

        {charImage.f2Img && (
          <>
            <SwiperSlide key="form-2">
              <figure key="form-2" className={isFullScreen ? FULLSCREEN_FIGURE : NORMAL_FIGURE}>
                <Image onClick={fullScreenHandler} loader={imageLoader} src={charImage.f2Img as string} fill sizes="(max-width:768px) 100vw, 50vw" alt={charName} className={isFullScreen ? FULLSCREEN_IMAGE : NORMAL_IMAGE} />
              </figure>
            </SwiperSlide>
          </>
        )}
        {charImage.f3Img && (
          <>
            <SwiperSlide key="form-3">
              <figure key="form-3" className={isFullScreen ? FULLSCREEN_FIGURE : NORMAL_FIGURE}>
                <Image onClick={fullScreenHandler} loader={imageLoader} src={charImage.f3Img as string} fill sizes="(max-width:768px) 100vw, 50vw" alt={charName} className={isFullScreen ? FULLSCREEN_IMAGE : NORMAL_IMAGE} />
              </figure>
            </SwiperSlide>
          </>
        )}
      </Swiper>
    </div>
  );
}
