import { CharacterIntro } from "@/models/Evertale/Characters";
import { useState } from "react";

const OptionLanguage = ({ introMode, setIntroMode }: { introMode: string; setIntroMode: React.ComponentState }) => {
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

const Article = ({ introMode, charIntro }: { introMode: string; charIntro: CharacterIntro }) => {
  if (introMode === "ci-mode1")
    return (
      <div>
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
    );
  else if (introMode === "ci-mode2")
    return (
      <div>
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
    );
  else if (introMode === "ci-mode3")
    return (
      <div>
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
    );
};

export default function CharIntro({ charIntro }: { charIntro: CharacterIntro }) {
  const [introMode, setIntroMode] = useState<string>("ci-mode1");

  return (
    <div className="block my-8 w-full bg-slate-800 px-4 md:px-8 py-4 rounded-xl">
      <OptionLanguage introMode={introMode} setIntroMode={setIntroMode} />
      <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Character Intro</h3>
      <Article charIntro={charIntro} introMode={introMode} />
    </div>
  );
}
