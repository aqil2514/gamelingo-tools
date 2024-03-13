"use client"
import { Navigation, Autoplay, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";
import { imageLoader } from "@/lib/utils";

import "./scrollbar.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

const WeaponSlider = ({ weapons }: {weapons: Evertale.QuickInfo[]}) => {
  return (
    <div>
      <h1 className="font-bold font-mclaren my-8 text-center text-white text-base lg:text-2xl">Evertale Weapons</h1>
      <div className="flex flex-row my-12 w-full px-2 md:px-12">
        <section className="w-full lg:w-2/3 mr-2">
          <Swiper modules={[Navigation, Autoplay, Thumbs]} slidesPerView={1} parallax={{ enabled: true }} autoplay={{ delay: 3000 }} navigation={{ enabled: true }}>
            {weapons?.map((weap, i: number) => (
              <SwiperSlide key={weap.id}>
                <Link href={`/evertale/weapons/${weap.id}`}>
                  <figure className="h-[460px] relative">
                    <Image loader={imageLoader} src={weap?.image as string} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" alt={weap.name} data-image-index={i++} className=" object-cover object-top rounded-xl" />
                    <figcaption className="text-center text-white font-bold font-mclaren text-sm md:text-lg lg:text-xl">{weap.name}</figcaption>
                  </figure>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <section className="scrollbar-option hidden md:block lg:w-1/3 bg-slate-900 rounded-lg p-4 ml-2 max-h-[488px] overflow-y-scroll">
          {weapons?.map((weap, i: number) => (
            <Link href={`/evertale/weapons/${weap?.id}`} key={weap?.id}>
              <figure className="flex flex-row my-4 items-center">
                <Image loader={imageLoader} src={weap?.image as string} width={849} height={460} alt={weap.name} data-image-index={i++} className="w-[64px] h-[64px] object-cover mr-2 object-top rounded-xl" />
                <figcaption className="text-center mx-auto  text-white font-mclaren text-base">{weap.name}</figcaption>
              </figure>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
};

export default WeaponSlider;
