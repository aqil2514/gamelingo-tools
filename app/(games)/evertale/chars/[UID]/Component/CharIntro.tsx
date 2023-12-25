import { CharacterIntro } from "@/models/Evertale/Characters";

export default function CharIntro({ charIntro }: { charIntro: CharacterIntro }) {
  return (
    <div className="block my-8 w-full bg-slate-800 px-4 md:px-8 py-4 rounded-xl">
      <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Character Intro</h3>
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
}
