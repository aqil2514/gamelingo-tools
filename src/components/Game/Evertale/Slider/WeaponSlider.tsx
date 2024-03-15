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

interface WeaponSliderProps{
  weapons: Evertale.QuickInfo[];
  template?: "skeleton" | "default";
}

export default function WeaponSlider ({ weapons, template="default" }: WeaponSliderProps) {
  if(template === "default") return <DefaultSlider weapons={weapons} />
  else if(template === "skeleton") return <SkeletonSlider />
};

function DefaultSlider({weapons} :Pick<WeaponSliderProps, "weapons">){
  return (
    <div>
      <h1 className="font-bold font-mclaren my-8 text-center text-white text-base lg:text-2xl">Evertale Weapons</h1>
      <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-4 md:px-12 my-4">
        <section>
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
        <section className="scrollbar-option hidden md:block bg-slate-900 rounded-lg p-4 ml-2 max-h-[488px] overflow-y-scroll">
          {weapons?.map((weap, i: number) => (
            <Link href={`/evertale/weapons/${weap?.id}`} key={weap?.id}>
              <figure className="flex flex-row my-4 items-center">
                <Image loader={imageLoader} src={weap?.image as string} width={849} height={460} alt={weap.name} data-image-index={i++} className="w-[94px] h-[94px] object-cover mr-2 object-top rounded-xl" />
                <figcaption className="text-center my-auto  text-white font-mclaren text-base">{weap.name}</figcaption>
              </figure>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}

function SkeletonSlider() {
  return (
    <div>
      <h1 className="font-bold font-mclaren my-8 animate-pulse w-1/2 bg-zinc-700 rounded-lg text-center text-zinc-700 text-base lg:text-2xl">
        Evertale Character
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-[60%_40%] md:px-12">
        <div className="bg-zinc-700 rounded-xl h-[460px] animate-pulse"></div>
        <div className="scrollbar-option hidden md:block bg-slate-900 rounded-lg p-4 ml-2 max-h-[488px] overflow-y-scroll">
          <div className="grid grid-cols-[94px_auto] gap-4">
            <div className="w-[94px] h-[94px] object-cover animate-pulse object-top rounded-xl bg-zinc-700"></div>
            <p className="text-center m-auto  text-zinc-800 bg-zinc-800 animate-pulse font-mclaren text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="w-[94px] h-[94px] object-cover animate-pulse object-top rounded-xl bg-zinc-700"></div>
            <p className="text-center m-auto  text-zinc-800 bg-zinc-800 animate-pulse font-mclaren text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="w-[94px] h-[94px] object-cover animate-pulse object-top rounded-xl bg-zinc-700"></div>
            <p className="text-center m-auto  text-zinc-800 bg-zinc-800 animate-pulse font-mclaren text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="w-[94px] h-[94px] object-cover animate-pulse object-top rounded-xl bg-zinc-700"></div>
            <p className="text-center m-auto  text-zinc-800 bg-zinc-800 animate-pulse font-mclaren text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="w-[94px] h-[94px] object-cover animate-pulse object-top rounded-xl bg-zinc-700"></div>
            <p className="text-center m-auto  text-zinc-800 bg-zinc-800 animate-pulse font-mclaren text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

