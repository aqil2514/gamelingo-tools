import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "./swiper-config.css";
import "swiper/css";
import "swiper/css/navigation";

const OptionLanguage = ({ introMode, setIntroMode }: { introMode: string; setIntroMode: React.Dispatch<React.SetStateAction<string>> }) => {
  return (
    <div className="w-full mx-auto">
      <label className={`font-semibold font-merriweather mx-2 my-2 px-4 py-2 rounded-xl text-white transition-all cursor-pointer ${introMode === "ci-mode1" && " bg-white !text-slate-800 !cursor-default"}`} htmlFor="ci-mode-1">
        <input className="hidden" onChange={(e) => setIntroMode(e.target.value)} value={"ci-mode1"} type="radio" name="intro-language" id="ci-mode-1" />
        EN | ID
      </label>
      <label className={`font-semibold font-merriweather mx-2 my-2 px-4 py-2 rounded-xl text-white transition-all cursor-pointer ${introMode === "ci-mode2" && " bg-white !text-slate-800 !cursor-default"}`} htmlFor="ci-mode-2">
        <input className="hidden" onChange={(e) => setIntroMode(e.target.value)} value={"ci-mode2"} type="radio" name="intro-language" id="ci-mode-2" />
        EN
      </label>
      <label className={`font-semibold font-merriweather mx-2 my-2 px-4 py-2 rounded-xl text-white transition-all cursor-pointer ${introMode === "ci-mode3" && " bg-white !text-slate-800 !cursor-default"}`} htmlFor="ci-mode-3">
        <input className="hidden" onChange={(e) => setIntroMode(e.target.value)} value={"ci-mode3"} type="radio" name="intro-language" id="ci-mode-3" />
        ID
      </label>
    </div>
  );
};

const Article = ({ introMode, charIntro }: { introMode: string; charIntro: Evertale.Character.Intro }) => {
  if (introMode === "ci-mode1") return <CiMode1 charIntro={charIntro} />;
  else if (introMode === "ci-mode2") return <CiMode2 charIntro={charIntro} />;
  else if (introMode === "ci-mode3") return <CiMode3 charIntro={charIntro} />;
};

const CiMode1 = ({ charIntro }: { charIntro: Evertale.Character.Intro }) => {
  return (
    <>
      <div className="hidden lg:block">
        {charIntro.gachaIntroEn && (
          <article key="gacha-intro">
            <p className="font-poppins text-base italic text-white">
              <strong>Gacha Intro EN : </strong>
              {charIntro.gachaIntroEn}
            </p>
            <p className="font-poppins text-base text-white">
              <strong>Gacha Intro ID : </strong>
              {charIntro.gachaIntroId}
            </p>
          </article>
        )}
        {charIntro.gachaTextEn && (
          <article key="gacha-text" className="my-2">
            <p className="font-poppins text-base italic text-white">
              <strong>Gacha Text EN : </strong>
              {charIntro.gachaTextEn}
            </p>
            <p className="font-poppins text-base text-white">
              <strong>Gacha Text ID : </strong>
              {charIntro.gachaTextId}
            </p>
          </article>
        )}
        {charIntro.loginTextEn && (
          <article key="login-text" className="my-2">
            <p className="font-poppins text-base italic text-white">
              <strong>Login Text EN : </strong>
              {charIntro.loginTextEn}
            </p>
            <p className="font-poppins text-base text-white">
              <strong>Login Text ID : </strong>
              {charIntro.loginTextId}
            </p>
          </article>
        )}
        {charIntro.text1En && (
          <article key="text-1" className="my-2">
            <p className="font-poppins text-base italic text-white">
              <strong>Text 1 EN : </strong>
              {charIntro.text1En}
            </p>
            <p className="font-poppins text-base text-white">
              <strong>Text 1 ID : </strong>
              {charIntro.text1Id}
            </p>
          </article>
        )}
        {charIntro.text2En && (
          <article key="text-2" className="my-2">
            <p className="font-poppins text-base italic text-white">
              <strong>Text 2 EN : </strong>
              {charIntro.text2En}
            </p>
            <p className="font-poppins text-base text-white">
              <strong>Text 2 ID : </strong>
              {charIntro.text2Id}
            </p>
          </article>
        )}
        {charIntro.text3En && (
          <article key="text-3" className="my-2">
            <p className="font-poppins text-base italic text-white">
              <strong>Text 3 EN : </strong>
              {charIntro.text3En}
            </p>
            <p className="font-poppins text-base text-white">
              <strong>Text 3 ID : </strong>
              {charIntro.text3Id}
            </p>
          </article>
        )}
        {charIntro.text4En && (
          <article key="text-4" className="my-2">
            <p className="font-poppins text-base italic text-white">
              <strong>Text 4 EN : </strong>
              {charIntro.text4En}
            </p>
            <p className="font-poppins text-base text-white">
              <strong>Text 4 ID : </strong>
              {charIntro.text4Id}
            </p>
          </article>
        )}
      </div>
      <Swiper modules={[Navigation]} slidesPerView={1} navigation={{ enabled: true, hideOnClick: true }} className="block lg:!hidden navigation-config">
        {charIntro.gachaIntroEn && (
          <SwiperSlide>
            <article key="gacha-intro">
              <strong className="text-white font-bold text-lg font-merienda">Gacha Intro EN : </strong>
              <p className="font-poppins text-base my-2 text-white">{charIntro.gachaIntroEn}</p>
              <div className="bg-white h-[2px] my-4 w-full"></div>
              <strong className="text-white font-bold text-lg font-merienda">Gacha Intro ID : </strong>
              <p className="font-poppins text-base text-white">{charIntro.gachaIntroId}</p>
            </article>
          </SwiperSlide>
        )}

        {charIntro.gachaTextEn && (
          <SwiperSlide>
            <article key="gacha-text">
              <strong className="text-white font-bold text-lg font-merienda">Gacha Text EN : </strong>
              <p className="font-poppins text-base my-2 text-white">{charIntro.gachaTextEn}</p>
              <div className="bg-white h-[2px] my-4 w-full"></div>
              <strong className="text-white font-bold text-lg font-merienda">Gacha Text ID : </strong>
              <p className="font-poppins text-base text-white">{charIntro.gachaTextId}</p>
            </article>
          </SwiperSlide>
        )}
        {charIntro.loginTextEn && (
          <SwiperSlide>
            <article key="login-text">
              <strong className="text-white font-bold text-lg font-merienda">Login Text EN : </strong>
              <p className="font-poppins text-base my-2 text-white">{charIntro.loginTextEn}</p>
              <div className="bg-white h-[2px] my-4 w-full"></div>
              <strong className="text-white font-bold text-lg font-merienda">Login Text ID : </strong>
              <p className="font-poppins text-base text-white">{charIntro.loginTextId}</p>
            </article>
          </SwiperSlide>
        )}
        {charIntro.text1En && (
          <SwiperSlide>
            <article key="text-1">
              <strong className="text-white font-bold text-lg font-merienda">Text 1 EN : </strong>
              <p className="font-poppins text-base my-2 text-white">{charIntro.text1En}</p>
              <div className="bg-white h-[2px] my-4 w-full"></div>
              <strong className="text-white font-bold text-lg font-merienda">Text 1 ID : </strong>
              <p className="font-poppins text-base text-white">{charIntro.text1Id}</p>
            </article>
          </SwiperSlide>
        )}
        {charIntro.text2En && (
          <SwiperSlide>
            <article key="text-2">
              <strong className="text-white font-bold text-lg font-merienda">Text 2 EN : </strong>
              <p className="font-poppins text-base my-2 text-white">{charIntro.text2En}</p>
              <div className="bg-white h-[2px] my-4 w-full"></div>
              <strong className="text-white font-bold text-lg font-merienda">Text 2 ID : </strong>
              <p className="font-poppins text-base text-white">{charIntro.text2Id}</p>
            </article>
          </SwiperSlide>
        )}
        {charIntro.text3En && (
          <SwiperSlide>
            <article key="text-3">
              <strong className="text-white font-bold text-lg font-merienda">Text 3 EN : </strong>
              <p className="font-poppins text-base my-2 text-white">{charIntro.text3En}</p>
              <div className="bg-white h-[2px] my-4 w-full"></div>
              <strong className="text-white font-bold text-lg font-merienda">Text 3 ID : </strong>
              <p className="font-poppins text-base text-white">{charIntro.text3Id}</p>
            </article>
          </SwiperSlide>
        )}
        {charIntro.text4En && (
          <SwiperSlide>
            <article key="text-4">
              <strong className="text-white font-bold text-lg font-merienda">Text 4 EN : </strong>
              <p className="font-poppins text-base my-2 text-white">{charIntro.text4En}</p>
              <div className="bg-white h-[2px] my-4 w-full"></div>
              <strong className="text-white font-bold text-lg font-merienda">Text 4 ID : </strong>
              <p className="font-poppins text-base text-white">{charIntro.text4Id}</p>
            </article>
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
};

const CiMode2 = ({ charIntro }: { charIntro: Evertale.Character.Intro }) => {
  return (
    <>
      <div className="hidden lg:block">
        {charIntro.gachaIntroEn && (
          <article key="gacha-intro">
            <p className="font-poppins text-base text-white">
              <strong>Gacha Intro : </strong>
              {charIntro.gachaIntroEn}
            </p>
          </article>
        )}
        {charIntro.gachaTextEn && (
          <article key="gacha-text" className="my-2">
            <p className="font-poppins text-base text-white">
              <strong>Gacha Text : </strong>
              {charIntro.gachaTextEn}
            </p>
          </article>
        )}
        {charIntro.loginTextEn && (
          <article key="login-text" className="my-2">
            <p className="font-poppins text-base text-white">
              <strong>Login Text : </strong>
              {charIntro.loginTextEn}
            </p>
          </article>
        )}
        {charIntro.text1En && (
          <article key="text-1" className="my-2">
            <p className="font-poppins text-base text-white">
              <strong>Text 1 : </strong>
              {charIntro.text1En}
            </p>
          </article>
        )}
        {charIntro.text2En && (
          <article key="text-2" className="my-2">
            <p className="font-poppins text-base text-white">
              <strong>Text 2 : </strong>
              {charIntro.text2En}
            </p>
          </article>
        )}
        {charIntro.text3En && (
          <article key="text-3" className="my-2">
            <p className="font-poppins text-base text-white">
              <strong>Text 3 : </strong>
              {charIntro.text3En}
            </p>
          </article>
        )}
        {charIntro.text4En && (
          <article key="text-4" className="my-2">
            <p className="font-poppins text-base text-white">
              <strong>Text 4 : </strong>
              {charIntro.text4En}
            </p>
          </article>
        )}
      </div>
      <Swiper modules={[Navigation]} slidesPerView={1} navigation={{ enabled: true, hideOnClick: true }} className="block lg:!hidden navigation-config">
        {charIntro.gachaIntroEn && (
          <SwiperSlide>
            <article key="gacha-intro">
              <strong className="text-white font-bold text-lg font-merienda">Gacha Intro EN : </strong>
              <p className="font-poppins text-base my-2 text-white">{charIntro.gachaIntroEn}</p>
            </article>
          </SwiperSlide>
        )}

        {charIntro.gachaTextEn && (
          <SwiperSlide>
            <article key="gacha-text">
              <strong className="text-white font-bold text-lg font-merienda">Gacha Text EN : </strong>
              <p className="font-poppins text-base my-2 text-white">{charIntro.gachaTextEn}</p>
            </article>
          </SwiperSlide>
        )}
        {charIntro.loginTextEn && (
          <SwiperSlide>
            <article key="login-text">
              <strong className="text-white font-bold text-lg font-merienda">Login Text EN : </strong>
              <p className="font-poppins text-base my-2 text-white">{charIntro.loginTextEn}</p>
            </article>
          </SwiperSlide>
        )}
        {charIntro.text1En && (
          <SwiperSlide>
            <article key="text-1">
              <strong className="text-white font-bold text-lg font-merienda">Text 1 EN : </strong>
              <p className="font-poppins text-base my-2 text-white">{charIntro.text1En}</p>
            </article>
          </SwiperSlide>
        )}
        {charIntro.text2En && (
          <SwiperSlide>
            <article key="text-2">
              <strong className="text-white font-bold text-lg font-merienda">Text 2 EN : </strong>
              <p className="font-poppins text-base my-2 text-white">{charIntro.text2En}</p>
            </article>
          </SwiperSlide>
        )}
        {charIntro.text3En && (
          <SwiperSlide>
            <article key="text-3">
              <strong className="text-white font-bold text-lg font-merienda">Text 3 EN : </strong>
              <p className="font-poppins text-base my-2 text-white">{charIntro.text3En}</p>
            </article>
          </SwiperSlide>
        )}
        {charIntro.text4En && (
          <SwiperSlide>
            <article key="text-4">
              <strong className="text-white font-bold text-lg font-merienda">Text 4 EN : </strong>
              <p className="font-poppins text-base my-2 text-white">{charIntro.text4En}</p>
            </article>
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
};

const CiMode3 = ({ charIntro }: { charIntro: Evertale.Character.Intro }) => {
  return (
    <>
      <div className="hidden lg:block">
        {charIntro.gachaIntroId && (
          <article key="gacha-intro">
            <p className="font-poppins text-base text-white">
              <strong>Gacha Intro: </strong>
              {charIntro.gachaIntroId}
            </p>
          </article>
        )}
        {charIntro.gachaTextId && (
          <article key="gacha-text" className="my-2">
            <p className="font-poppins text-base text-white">
              <strong>Gacha Text: </strong>
              {charIntro.gachaTextId}
            </p>
          </article>
        )}
        {charIntro.loginTextId && (
          <article key="login-text" className="my-2">
            <p className="font-poppins text-base text-white">
              <strong>Login Text: </strong>
              {charIntro.loginTextId}
            </p>
          </article>
        )}
        {charIntro.text1Id && (
          <article key="text-1" className="my-2">
            <p className="font-poppins text-base text-white">
              <strong>Text 1: </strong>
              {charIntro.text1Id}
            </p>
          </article>
        )}
        {charIntro.text2Id && (
          <article key="text-2" className="my-2">
            <p className="font-poppins text-base text-white">
              <strong>Text 2: </strong>
              {charIntro.text2Id}
            </p>
          </article>
        )}
        {charIntro.text3Id && (
          <article key="text-3" className="my-2">
            <p className="font-poppins text-base text-white">
              <strong>Text 3: </strong>
              {charIntro.text3Id}
            </p>
          </article>
        )}
        {charIntro.text4Id && (
          <article key="text-4" className="my-2">
            <p className="font-poppins text-base text-white">
              <strong>Text 4: </strong>
              {charIntro.text4Id}
            </p>
          </article>
        )}
      </div>

      <Swiper modules={[Navigation]} slidesPerView={1} navigation={{ enabled: true, hideOnClick: true }} className="block lg:!hidden navigation-config">
        {charIntro.gachaIntroEn && (
          <SwiperSlide>
            <article key="gacha-intro">
              <strong className="text-white font-bold text-lg font-merienda">Gacha Intro ID : </strong>
              <p className="font-poppins text-base text-white">{charIntro.gachaIntroId}</p>
            </article>
          </SwiperSlide>
        )}

        {charIntro.gachaTextEn && (
          <SwiperSlide>
            <article key="gacha-text">
              <strong className="text-white font-bold text-lg font-merienda">Gacha Text ID : </strong>
              <p className="font-poppins text-base text-white">{charIntro.gachaTextId}</p>
            </article>
          </SwiperSlide>
        )}
        {charIntro.loginTextEn && (
          <SwiperSlide>
            <article key="login-text">
              <strong className="text-white font-bold text-lg font-merienda">Login Text ID : </strong>
              <p className="font-poppins text-base text-white">{charIntro.loginTextId}</p>
            </article>
          </SwiperSlide>
        )}
        {charIntro.text1En && (
          <SwiperSlide>
            <article key="text-1">
              <strong className="text-white font-bold text-lg font-merienda">Text 1 ID : </strong>
              <p className="font-poppins text-base text-white">{charIntro.text1Id}</p>
            </article>
          </SwiperSlide>
        )}
        {charIntro.text2En && (
          <SwiperSlide>
            <article key="text-2">
              <strong className="text-white font-bold text-lg font-merienda">Text 2 ID : </strong>
              <p className="font-poppins text-base text-white">{charIntro.text2Id}</p>
            </article>
          </SwiperSlide>
        )}
        {charIntro.text3En && (
          <SwiperSlide>
            <article key="text-3">
              <strong className="text-white font-bold text-lg font-merienda">Text 3 ID : </strong>
              <p className="font-poppins text-base text-white">{charIntro.text3Id}</p>
            </article>
          </SwiperSlide>
        )}
        {charIntro.text4En && (
          <SwiperSlide>
            <article key="text-4">
              <strong className="text-white font-bold text-lg font-merienda">Text 4 ID : </strong>
              <p className="font-poppins text-base text-white">{charIntro.text4Id}</p>
            </article>
          </SwiperSlide>
        )}
      </Swiper>
    </>
  );
};

export default function CharIntro({ charIntro }: { charIntro: Evertale.Character.Intro }) {
  const [introMode, setIntroMode] = useState<string>("ci-mode1");

  return (
    <div className="block my-8 w-full bg-slate-800 px-4 md:px-8 py-4 rounded-xl">
      <OptionLanguage introMode={introMode} setIntroMode={setIntroMode} />
      <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Character Intro</h3>
      <Article charIntro={charIntro} introMode={introMode} />
    </div>
  );
}
