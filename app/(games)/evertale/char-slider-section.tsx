"use client";

import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { Navigation, Autoplay, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/parallax";
import "swiper/css/thumbs";
import "./scrollbar.css";

export default function CharSliderSection({ buttonLink }: { buttonLink: boolean }) {
  const [characters, setCharacters] = useState<React.ComponentState>();
  const [loading, setLoading] = useState<Boolean>(false);
  async function getCharacter() {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/gamelingo/evertale?category=chars&maxResult=15");

      setCharacters(data.characters);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getCharacter();
  }, []);

  return loading ? (
    <p className="text-white font-bold font-nova-square text-3xl">Loading...</p>
  ) : (
    <>
      <h1 className="font-bold font-mclaren my-8 text-center text-white text-base lg:text-2xl">Evertale Character</h1>

      <div className="flex flex-row my-12 w-full px-12">
        <section className="w-full lg:w-2/3 mr-2">
          <Swiper modules={[Navigation, Autoplay, Thumbs]} slidesPerView={1} parallax={{ enabled: true }} autoplay={{ delay: 3000 }} navigation={{ enabled: true }}>
            {characters?.map((char: React.ComponentState, i: number) => (
              <SwiperSlide key={char.id}>
                <Link href={`/evertale/chars/${char.id}`}>
                  <figure>
                    <Image src={char?.image} width={849} height={460} alt={char?.charName} data-image-index={i++} className="w-full h-[460px] object-cover object-top rounded-xl" />
                    <figcaption className="text-center text-white font-bold font-mclaren text-xl">{char?.charName}</figcaption>
                  </figure>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <section className="scrollbar-option hidden lg:block lg:w-1/3 bg-slate-900 rounded-lg p-4 ml-2 max-h-[488px] overflow-y-scroll">
          {characters?.map((char: React.ComponentState, i: number) => (
            <Link href={`/evertale/chars/${char?.id}`} key={char?.id}>
              <figure className="flex flex-row my-4 items-center">
                <Image src={char?.image} width={849} height={460} alt={char?.charName} data-image-index={i++} className="w-[64px] h-[64px] object-cover mr-2 object-top rounded-xl" />
                <figcaption className="text-center mx-auto  text-white font-mclaren text-base">{char?.charName}</figcaption>
              </figure>
            </Link>
          ))}
        </section>
      </div>
      {buttonLink && <ButtonLink />}
    </>
  );
}

function ButtonLink() {
  return (
    <Link href="/evertale/chars">
      <button className="block mx-auto text-center font-mclaren text-slate-200 bg-yellow-600 px-4 py-2">Lihat lebih banyak &rarr;</button>
    </Link>
  );
}
