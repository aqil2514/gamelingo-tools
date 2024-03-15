import { useState } from "react";

const OptionLanguage = ({ activeIndex, setActiveIndex }: { activeIndex: number; setActiveIndex: React.Dispatch<React.SetStateAction<number>> }) => {
  return (
    <div className="w-full mx-auto">
      <label className={`font-semibold font-merriweather mx-2 my-4 px-4 py-2 rounded-xl text-white transition-all cursor-pointer ${activeIndex === 1 && " bg-white !text-slate-800 !cursor-default"}`} htmlFor="cps-mode-1">
        <input className="hidden" onChange={() => setActiveIndex(1)} value={"cp-mode1"} type="radio" name="language" id="cps-mode-1" />
        EN | ID
      </label>
      <label className={`font-semibold font-merriweather mx-2 my-2 px-4 py-2 rounded-xl text-white transition-all cursor-pointer ${activeIndex === 2 && " bg-white !text-slate-800 !cursor-default"}`} htmlFor="cps-mode-2">
        <input className="hidden" onChange={() => setActiveIndex(2)} value={"cp-mode2"} type="radio" name="language" id="cps-mode-2" />
        EN
      </label>
      <label className={`font-semibold font-merriweather mx-2 my-2 px-4 py-2 rounded-xl text-white transition-all cursor-pointer ${activeIndex === 3 && " bg-white !text-slate-800 !cursor-default"}`} htmlFor="cps-mode-3">
        <input className="hidden" onChange={() => setActiveIndex(3)} value={"cp-mode3"} type="radio" name="language" id="cps-mode-3" />
        ID
      </label>
    </div>
  );
};

export default function CharPassiveSkill({ charPassiveSkill }: { charPassiveSkill: Evertale.Character.PassiveSkill[] }) {
  const [activeIndex, setActiveIndex] = useState<number>(1);

  return (
    <div className="w-full md:w1/2 mt-8 ml-2 px-4 py-4 rounded-xl bg-slate-800 h-[460px] overflow-y-scroll scrollbar-style">
      <OptionLanguage activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

      {charPassiveSkill.map((nps, i: number) => (
        <div key={`passive-skill-${i++}`} className="border-b-2 last-of-type:border-none my-4 border-white text-white font-poppins">
          <div className="flex flex-row justify-start content-center cursor-default">
            <p className="text-base md:text-lg font-bold my-auto">{nps.skillName}</p>
          </div>
          <div className="my-2 cursor-default">
            {nps.typeSkill.map((type: any) => (
              <span key={type} className="bg-white !text-slate-800 mx-1 my-1 first:ml-0 rounded-xl px-2 font-bold flex-wrap">
                {type}{" "}
              </span>
            ))}
          </div>
          {activeIndex === 1 && (
            <div className="flex flex-row">
              <article className="text-justify mr-1">{nps.skillDescEn}</article>
              <article className="text-justify ml-1">{nps.skillDescId}</article>
            </div>
          )}
          {activeIndex === 2 && (
            <div>
              <article className="text-justify my-1">{nps.skillDescEn}</article>
            </div>
          )}
          {activeIndex === 3 && (
            <div>
              <article className="text-justify my-1">{nps.skillDescId}</article>
            </div>
          )}
        </div>
      ))}
      {/* <Swiper modules={[Navigation]} slidesPerView={1} navigation={{ enabled: true, hideOnClick: true }} className="navigation-config">
        {charPassiveSkill.map((nps: CharacterPassiveSkill, i: number) => (
          <SwiperSlide key={`passive-skill-${i++}`}>
            <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Passive Skill {i + 1}</h3>
            <p className="text-white font-poppins">
              <strong>Skill Name : </strong> {nps.skillName}
            </p>
            <p className="text-white font-poppins">
              <strong>Skill Type : </strong> {nps.typeSkill.join(", ")}
            </p>
            {activeIndex === 1 && (
              <>
                <article className="text-white font-poppins">
                  <strong>Description : </strong>
                  <p>{nps.skillDescEn}</p>
                </article>
                <article className="text-white font-poppins">
                  <strong>Deskripsi : </strong>
                  <p></p>
                  {nps.skillDescId}
                </article>
              </>
            )}
            {activeIndex === 2 && (
              <article className="text-white font-poppins">
                <strong>Description : </strong>
                <p>{nps.skillDescEn}</p>
              </article>
            )}
            {activeIndex === 3 && (
              <article className="text-white font-poppins">
                <strong>Deskripsi : </strong>
                <p>{nps.skillDescId}</p>
              </article>
            )}
          </SwiperSlide>
        ))}
      </Swiper> */}
    </div>
  );
}
