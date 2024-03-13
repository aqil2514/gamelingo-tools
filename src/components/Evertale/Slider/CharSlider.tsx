"use client";
import { Navigation, Autoplay, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { imageLoader } from "@/lib/utils";

import "./scrollbar.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const CharSlider = ({ characters }: {characters: Evertale.QuickInfo[]}) => {
  return (
    <div>
      <h1 className="font-bold font-mclaren my-8 text-center text-white text-base lg:text-2xl">Evertale Character</h1>
      <div className="flex flex-row my-12 w-full px-2 md:px-12">
        <section className="w-full lg:w-2/3 mr-2">
          <Swiper modules={[Navigation, Autoplay, Thumbs]} slidesPerView={1} parallax={{ enabled: true }} autoplay={{ delay: 3000 }} navigation={{ enabled: true }}>
            {characters?.map((char, i: number) => (
              <SwiperSlide key={char.id}>
                <Link href={`/evertale/chars/${char.id}`}>
                  <figure className="h-[460px] relative">
                    <Image loader={imageLoader} src={char?.image as string} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt={char?.name} data-image-index={i++} className=" object-cover object-top rounded-xl" />
                    <figcaption className="text-center text-white font-bold font-mclaren text-sm md:text-lg lg:text-xl">{char?.name}</figcaption>
                  </figure>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <section className="scrollbar-option hidden md:block lg:w-1/3 bg-slate-900 rounded-lg p-4 ml-2 max-h-[488px] overflow-y-scroll">
          {characters?.map((char, i: number) => (
            <Link href={`/evertale/chars/${char?.id}`} key={char?.id}>
              <figure className="flex flex-row my-4 items-center">
                <Image loader={imageLoader} src={char?.image as string} width={849} height={460} alt={char?.name} data-image-index={i++} className="w-[64px] h-[64px] object-cover mr-2 object-top rounded-xtl" />
                <figcaption className="text-center mx-auto  text-white font-mclaren text-base">{char?.name}</figcaption>
              </figure>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
};

export default CharSlider;
