"use client";

import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "../scrollbar.css";
import "./swiper-config.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import { useRef } from "react";
import useSWR from "swr";

type ActiveSkillState = {
  skillName: string;
  spirit: string | number;
  target: string | number;
  TU: string | number;
  descEn: string;
  descId: string;
};

type PassiveSkillState = {
  name: string;
  descEN: string;
  descID: string;
};

export default function Data({ data }: { data: any }) {
  const part1 = useRef(null);
  const part2 = useRef(null);
  const part3 = useRef(null);

  return (
    <div className={DIV_MAIN_STYLE + " py-20 px-8"}>
      <h1 className="font-semibold text-base font-merriweather text-center lg:text-2xl text-white mx-8 mt-4">{data.charStatus.charName}</h1>

      <div className="flex my-4 flex-col md:flex-row justify-between content-center">
        <div className="w-full md:w-1/2 mt-8 mr-2">
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
              <figure key="form-1" className="relative">
                <Image src={data.charImage.f1Img} width={849} height={460} alt={data.charStatus.charName} className="w-full h-[460px] object-cover object-top rounded-xl" />
              </figure>
            </SwiperSlide>

            {data.charImage.f2Img && (
              <>
                <SwiperSlide key="form-2">
                  <figure key="form-2" className="relative">
                    <Image src={data.charImage.f2Img} width={849} height={460} alt={data.charStatus.charName} className="w-full h-[460px] object-cover object-top rounded-xl" />
                  </figure>
                </SwiperSlide>
              </>
            )}
            {data.charImage.f3Img && (
              <>
                <SwiperSlide key="form-3">
                  <figure key="form-3" className="relative">
                    <Image src={data.charImage.f3Img} width={849} height={460} alt={data.charStatus.charName} className="w-full h-[460px] object-cover object-top rounded-xl" />
                  </figure>
                </SwiperSlide>
              </>
            )}
          </Swiper>
        </div>
        <div className="w-full md:w1/2 mt-8 ml-2 px-4 py-4 rounded-xl bg-slate-800 h-[460px] overflow-y-scroll scrollbar-style">
          <article key="part1" ref={part1}>
            <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Part 1</h3>
            <p className="text-white italic font-poppins">{data.charProfile.part1En}</p>
            <div className="bg-white w-full h-1 my-4"></div>
            <p className="text-white font-poppins">{data.charProfile.part1Id}</p>
          </article>
          {data.charProfile.part2Id && data.charProfile.part2En && (
            <article key="part2" style={{ display: "none" }} ref={part2}>
              <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Part 2</h3>
              <p className="text-white italic font-poppins">{data.charProfile.part2En}</p>
              <div className="bg-white w-full h-1 my-4"></div>
              <p className="text-white font-poppins">{data.charProfile.part2Id}</p>
            </article>
          )}
          {data.charProfile.part3Id && data.charProfile.part3En && (
            <article key="part3" style={{ display: "none" }} ref={part3}>
              <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Part 3</h3>
              <p className="text-white italic font-poppins">{data.charProfile.part3En}</p>
              <div className="bg-white w-full h-1 my-4"></div>
              <p className="text-white font-poppins">{data.charProfile.part3Id}</p>
            </article>
          )}
        </div>
      </div>

      <CharStatus genData={data} />

      <div className="block my-8 w-full bg-slate-800 px-8 py-4 rounded-xl">
        <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Character Intro</h3>
        {data.charIntro.gachaIntroEn && (
          <article key="gacha-intro">
            <p className="font-poppins text-base italic text-white">
              <strong>Gacha Intro EN : </strong>
              {data.charIntro.gachaIntroEn}
            </p>
            <p className="font-poppins text-base text-white">
              <strong>Gacha Intro ID : </strong>
              {data.charIntro.gachaIntroId}
            </p>
          </article>
        )}
        {data.charIntro.gachaTextEn && (
          <article key="gacha-text" className="my-2">
            <p className="font-poppins text-base italic text-white">
              <strong>Gacha Text EN : </strong>
              {data.charIntro.gachaTextEn}
            </p>
            <p className="font-poppins text-base text-white">
              <strong>Gacha Text ID : </strong>
              {data.charIntro.gachaTextId}
            </p>
          </article>
        )}
        {data.charIntro.loginTextEn && (
          <article key="login-text" className="my-2">
            <p className="font-poppins text-base italic text-white">
              <strong>Login Text EN : </strong>
              {data.charIntro.loginTextEn}
            </p>
            <p className="font-poppins text-base text-white">
              <strong>Login Text ID : </strong>
              {data.charIntro.loginTextId}
            </p>
          </article>
        )}
        {data.charIntro.text1En && (
          <article key="text-1" className="my-2">
            <p className="font-poppins text-base italic text-white">
              <strong>Text 1 EN : </strong>
              {data.charIntro.text1En}
            </p>
            <p className="font-poppins text-base text-white">
              <strong>Text 1 ID : </strong>
              {data.charIntro.text1Id}
            </p>
          </article>
        )}
        {data.charIntro.text2En && (
          <article key="text-2" className="my-2">
            <p className="font-poppins text-base italic text-white">
              <strong>Text 2 EN : </strong>
              {data.charIntro.text2En}
            </p>
            <p className="font-poppins text-base text-white">
              <strong>Text 2 ID : </strong>
              {data.charIntro.text2Id}
            </p>
          </article>
        )}
        {data.charIntro.text3En && (
          <article key="text-3" className="my-2">
            <p className="font-poppins text-base italic text-white">
              <strong>Text 3 EN : </strong>
              {data.charIntro.text3En}
            </p>
            <p className="font-poppins text-base text-white">
              <strong>Text 3 ID : </strong>
              {data.charIntro.text3Id}
            </p>
          </article>
        )}
        {data.charIntro.text4En && (
          <article key="text-4" className="my-2">
            <p className="font-poppins text-base italic text-white">
              <strong>Text 4 EN : </strong>
              {data.charIntro.text4En}
            </p>
            <p className="font-poppins text-base text-white">
              <strong>Text 4 ID : </strong>
              {data.charIntro.text4Id}
            </p>
          </article>
        )}
      </div>

      <p className="mt-4 text-white font-bold text text-xs h-0 font-merriweather">Click or touch the div to visible or hide the navigation</p>
      <div className="flex mb-4 flex-col md:flex-row justify-between content-center">
        <div className="w-full md:w1/2 mt-8 ml-2 px-4 py-4 rounded-xl bg-slate-800 h-[460px] overflow-y-scroll scrollbar-style">
          <Swiper modules={[Navigation]} slidesPerView={1} navigation={{ enabled: true, hideOnClick: true }} className="navigation-config">
            {data.nASkill.map((nas: ActiveSkillState, i: number) => (
              <SwiperSlide key={`active-skill-${i++}`}>
                <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Active Skill {i + 1}</h3>
                <p className="text-white font-poppins">
                  <strong>Skill Name : </strong> {nas.skillName}
                </p>
                <p className="text-white font-poppins">
                  <strong>Spirit : </strong> {nas.spirit}
                </p>
                <p className="text-white font-poppins">
                  <strong>TU : </strong> {nas.TU}
                </p>
                <p className="text-white font-poppins">
                  <strong>Target : </strong> {nas.target}
                </p>
                <article className="text-white font-poppins">
                  <strong>Description : </strong>
                  <p>{nas.descEn}</p>
                </article>
                <article className="text-white font-poppins">
                  <strong>Deskripsi : </strong>
                  <p></p>
                  {nas.descId}
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div className="w-full md:w1/2 mt-8 ml-2 px-4 py-4 rounded-xl bg-slate-800 h-[460px] overflow-y-scroll scrollbar-style">
          <Swiper modules={[Navigation]} slidesPerView={1} navigation={{ enabled: true, hideOnClick: true }} className="navigation-config">
            {data.nPSkill.map((nps: PassiveSkillState, i: number) => (
              <SwiperSlide key={`active-skill-${i++}`}>
                <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Passive Skill {i + 1}</h3>
                <p className="text-white font-poppins">
                  <strong>Skill Name : </strong> {nps.name}
                </p>

                <article className="text-white font-poppins">
                  <strong>Description : </strong>
                  <p>{nps.descEN}</p>
                </article>
                <article className="text-white font-poppins">
                  <strong>Deskripsi : </strong>
                  <p></p>
                  {nps.descID}
                </article>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

const fetcherLeaderSkill = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

function CharStatus({ genData }: { genData: any }) {
  const URL = `/api/gamelingo/evertale?category=leaderSkill&name=${genData.charStatus.leaderSkill}`;

  const { data, isLoading, error } = useSWR(URL, fetcherLeaderSkill);

  if (error) console.log(error);
  if (!data || isLoading) console.log("loading");

  return (
    <div className="block my-8 mx-auto w-full md:w-1/2 bg-slate-800 px-8 py-4 rounded-xl">
      <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Character Status</h3>
      <article>
        <p className="font-poppins text-base text-white">
          <strong>Character Name : </strong>
          {genData.charStatus.charName}
        </p>
        <p className="font-poppins text-base text-white">
          <strong>Element : </strong>
          {genData.charStatus.statusElement}
        </p>
        <p className="font-poppins text-base text-white">
          <strong>First Weapon : </strong>
          {genData.charStatus.firstWeapon}
        </p>
        {genData.charStatus.secondWeapon && (
          <p className="font-poppins text-base text-white">
            <strong>Full Awakening Weapon : </strong>
            {genData.charStatus.secondWeapon}
          </p>
        )}
        {genData.charStatus.leaderSkill && (
          <p className="font-poppins text-base text-white">
            <strong>Leader Skill Name : </strong>
            {genData.charStatus.leaderSkill}
          </p>
        )}
        {genData.charStatus.leaderSkill && (
          <p className="font-poppins text-base text-white">
            <strong>Engish Description : </strong>
            {data?.leaderSkill.descEN}
          </p>
        )}
        {genData.charStatus.leaderSkill && (
          <p className="font-poppins text-base text-white">
            <strong>Deskripsi Indonesia : </strong>
            {data?.leaderSkill.descID}
          </p>
        )}
      </article>
    </div>
  );
}
