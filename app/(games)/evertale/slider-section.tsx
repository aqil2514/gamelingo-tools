"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigation, Autoplay, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import "swiper/css/parallax";
import "swiper/css/thumbs";

export default function SliderSection() {
  const [characters, setCharacters] = useState<React.ComponentState>();
  const swiper = useSwiper();
  async function getCharacter() {
    try {
      const { data } = await axios.get("/api/gamelingo/evertale?category=chars&maxResult=15");

      setCharacters(data.characters);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCharacter();
  }, []);

  return (
    <div className="w-full px-12">
      <Swiper
        className=" my-12"
        // install Swiper modules
        modules={[Navigation, Autoplay, Thumbs]}
        slidesPerView={1}
        parallax={{ enabled: true }}
        autoplay={{ delay: 3000 }}
        navigation={{ enabled: true }}
      >
        {characters?.map((char: React.ComponentState, i: number) => (
          <SwiperSlide>
            <Link href={`/evertale/chars/${char.id}`}>
              <figure key={i++}>
                <Image src={char?.image} width={849} height={460} alt={char?.charName} data-image-index={i++} className="w-full h-[460px] object-cover object-top rounded-xl" />
                <figcaption className="text-center text-white font-bold font-mclaren text-xl">{char?.charName}</figcaption>
              </figure>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
