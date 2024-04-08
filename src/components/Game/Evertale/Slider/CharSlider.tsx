"use client";
import { Navigation, Autoplay, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { imageLoader } from "@/lib/utils";

import "./scrollbar.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Link } from "@/navigation";

interface CharSliderProps {
  characters: Evertale.QuickInfo[];
  template?: "skeleton" | "default";
}

export default function CharSlider({
  characters,
  template = "default",
}: CharSliderProps) {
  if (template === "default") return <DefaultSlider characters={characters} />;
  else if (template === "skeleton")
    return <SkeletonSlider />;
}

function DefaultSlider({ characters }: Pick<CharSliderProps, "characters">) {
  return (
    <div>
      <h1 className="font-bold font-mclaren my-8 text-center text-white text-base lg:text-2xl">
        Evertale Character
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-[60%_40%] gap-4 md:px-12 my-4">
        <section>
          <Swiper
            modules={[Navigation, Autoplay, Thumbs]}
            slidesPerView={1}
            parallax={{ enabled: true }}
            autoplay={{ delay: 3000 }}
            navigation={{ enabled: true }}
          >
            {characters?.map((char, i: number) => (
              <SwiperSlide key={char.id}>
                <Link href={`/evertale/chars/${char.id}`}>
                  <figure className="h-[460px] relative">
                    <Image
                      loader={imageLoader}
                      src={char?.image as string}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      alt={char?.name}
                      data-image-index={i++}
                      className=" object-cover object-top rounded-xl"
                    />
                    <figcaption className="text-center text-white font-bold font-mclaren text-sm md:text-lg lg:text-xl">
                      {char?.name}
                    </figcaption>
                  </figure>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <section className="scrollbar-option hidden md:block bg-slate-900 rounded-lg p-4 ml-2 max-h-[488px] overflow-y-scroll">
          {characters?.map((char, i: number) => (
            <Link href={`/evertale/chars/${char?.id}`} key={char?.id}>
              <figure className="grid grid-cols-[128px_auto] gap-4 my-4">
                <Image
                  loader={imageLoader}
                  src={char?.image as string}
                  width={849}
                  height={460}
                  alt={char?.name}
                  data-image-index={i++}
                  className="w-[128px] h-[128px] object-cover mr-2 object-top rounded-xl"
                />
                <figcaption className="text-center m-auto  text-white font-mclaren text-base">
                  {char?.name}
                </figcaption>
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
      <h1 className="font-bold font-mclaren my-8 animate-pulse w-1/2 mx-auto bg-zinc-700 rounded-lg text-center text-zinc-700 text-base lg:text-2xl">
        Evertale Character
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-[60%_40%] md:px-12">
        <div className="bg-zinc-700 rounded-xl h-[460px] animate-pulse"></div>
        <div className="scrollbar-option hidden md:block bg-slate-900 rounded-lg p-4 ml-2 max-h-[488px] overflow-y-scroll">
          <div className="grid grid-cols-[128px_auto] gap-4">
            <div className="w-[128px] h-[128px] object-cover animate-pulse object-top rounded-xl bg-zinc-700"></div>
            <p className="text-center m-auto  text-zinc-800 bg-zinc-800 animate-pulse font-mclaren text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="w-[128px] h-[128px] object-cover animate-pulse object-top rounded-xl bg-zinc-700"></div>
            <p className="text-center m-auto  text-zinc-800 bg-zinc-800 animate-pulse font-mclaren text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="w-[128px] h-[128px] object-cover animate-pulse object-top rounded-xl bg-zinc-700"></div>
            <p className="text-center m-auto  text-zinc-800 bg-zinc-800 animate-pulse font-mclaren text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="w-[128px] h-[128px] object-cover animate-pulse object-top rounded-xl bg-zinc-700"></div>
            <p className="text-center m-auto  text-zinc-800 bg-zinc-800 animate-pulse font-mclaren text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            <div className="w-[128px] h-[128px] object-cover animate-pulse object-top rounded-xl bg-zinc-700"></div>
            <p className="text-center m-auto  text-zinc-800 bg-zinc-800 animate-pulse font-mclaren text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
