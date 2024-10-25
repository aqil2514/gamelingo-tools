"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

export function PostContent({ data }: { data: GenshinImpact.Character }) {
  return (
    <div className="main-wrapper py-20">
      <PostContentIntro data={data} />
      <PostContentTalent data={data} />
    </div>
  );
}

const PostContentIntro = ({ data }: { data: GenshinImpact.Character }) => {
  return (
    <>
      <h1 className="text-white font-nova-square text-center font-bold text-3xl my-8">
        {data.characterName}
      </h1>
      <div className="bg-slate-900 p-4 mx-auto w-[95%] md:w-3/5 rounded-xl md:grid md:grid-cols-2 gap-4">
        <PostContentIntroImage data={data} />
        <div className="text-white font-poppins flex flex-col justify-center">
          <PostContentIntroDetail data={data} />
          <PostContentIntroVoiceActor data={data} />
        </div>
      </div>
    </>
  );
};

const PostContentIntroDetail = ({
  data,
}: {
  data: GenshinImpact.Character;
}) => {
  const t = useTranslations("GenshinCharacterDetail");

  return (
    <>
      <p className="mb-4">
        <strong>{t("characterName")}</strong> : {data.characterName}
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
    </>
  );
};

const PostContentIntroImage = ({ data }: { data: GenshinImpact.Character }) => {
  return (
    <div className="relative w-full min-h-[200px] max-h[392px]">
      <Image
        src={data.image.cover}
        fill
        priority
        sizes="auto"
        alt={data.characterName}
        className="w-auto h-auto max-w-[640px] max-h-[392px] object-cover"
      />
    </div>
  );
};

const PostContentIntroVoiceActor = ({
  data,
}: {
  data: GenshinImpact.Character;
}) => {
  const t = useTranslations("GenshinCharacterDetail");

  return (
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
  );
};

const PostContentTalent = ({ data }: { data: GenshinImpact.Character }) => {
  if (!data.talents)
    return (
      <div className="bg-slate-900 mx-auto my-4 p-4 w-[90%] rounded-xl">
        <p className="font-nova-square text-white text-center font-bold">
          Data Talent belum tersedia
        </p>
      </div>
    );

  return (
    <div className="bg-slate-900 mx-auto my-4 p-4 w-[90%] rounded-xl">
      {data.talents.map((talent) => {
        return (
          <div
            key={talent.talentName}
            className="border-b-4 border-white border-double rounded py-2"
          >
            <PostContentTalentItem talent={talent} />
            <PostContentTalentDescription description={talent.description} />
          </div>
        );
      })}
    </div>
  );
};

const PostContentTalentDescription = ({
  description,
}: {
  description: GenshinImpact.TalentDescription[];
}) => {
  return (
    <div className="text-white font-poppins">
      <ul className="list-disc pl-5">
        {description.map((desc) =>
          desc.listItem ? (
            // Jika deskripsi merupakan list item, render sebagai li di dalam ul
            desc.text.map((text, i) => (
              <li key={`${desc._key}-${i}`}>{text.text}</li>
            ))
          ) : (
            // Jika bukan, render sebagai paragraf
            <div key={desc._key} className="flex gap-2">
              {desc.text.map((text, i) => {
                if (text.marks.includes("strong"))
                  return (
                    <strong key={`${desc._key}-text-${i}`} className="mb-2">
                      {text.text}
                    </strong>
                  );
                return (
                  <p key={`${desc._key}-text-${i}`} className="mb-2">
                    {text.text}
                  </p>
                );
              })}
            </div>
          )
        )}
      </ul>
    </div>
  );
};

const PostContentTalentItem = ({
  talent,
}: {
  talent: GenshinImpact.Talent;
}) => {
  return (
    <div className="flex gap-4">
      <Image
        src={talent.image}
        width={64}
        height={64}
        alt={`image ${talent.talentName}`}
      />
      <p className="font-bold font-nova-square text-white my-auto">
        {talent.talentName}
      </p>
    </div>
  );
};
