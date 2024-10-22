"use client"

import { useTranslations } from "next-intl";
import Image from "next/image";

export const PostContent = ({ data }: { data: GenshinImpact.Character }) => {
    const t = useTranslations("GenshinCharacterDetail");

  return (
    <div className="main-wrapper py-20">
      <h1 className="text-white font-nova-square text-center font-bold text-3xl my-8">
        {data.characterName}
      </h1>
      <div className="bg-slate-900 p-4 mx-auto w-[95%] md:w-3/5 rounded-xl md:grid md:grid-cols-2 gap-4">
        <div className="relative w-full min-h-[200px] max-h[392px]">
          <Image
            src={data.image.cover}
            fill
            sizes="auto"
            alt={data.characterName}
            className="w-auto h-auto max-w-[640px] max-h-[392px] object-cover"
          />
        </div>
        <div className="text-white font-poppins flex flex-col justify-center">
          <p className="mb-4">
            <strong>{t("characterName")}</ strong> : {data.characterName}
          </p>
          <p className="mb-4">
            <strong>{t("gender")}</strong> : {data.gender}
          </p>
          <p className="mb-4">
            <strong>{t("region")}</strong> : {data.region}
          </p>
          <p className="mb-4">
            <strong>{t("element")}</strong> : {data.element}
          </p>
          <p className="mb-4">
            <strong>{t("rarity")}</strong> : {data.rarity}
          </p>
          <p className="mb-4">
            <strong>{t("weapon")}</strong> : {data.weapon}
          </p>
          <p className="mb-4">
            <strong>Ascend Status</strong> : {data.ascendStatus}
          </p>
          <article className="mb-4">
            <strong>{t("description")}</strong> :<p>{data.description}</p>
          </article>
          <fieldset className="mb-4 border border-white rounded-lg p-2">
            <legend className="text-center">{t("va")}</legend>
            <p>
              <strong>English</strong> : {data.cv.english}
            </p>
            <p>
              <strong>Chinese</strong> : {data.cv.chinese}
            </p>
            <p>
              <strong>Japanese</strong> : {data.cv.japanese}
            </p>
            <p>
              <strong>Korean</strong> : {data.cv.korean}
            </p>
          </fieldset>
        </div>
      </div>
    </div>
  );
};
