import "./swiper-config.css";
import "swiper/css";
import "swiper/css/navigation";
import { useState } from "react";
import Image from "next/image";
import { Bullseye } from "react-bootstrap-icons";

const OptionLanguage = ({ activeIndex, setActiveIndex }: { activeIndex: number; setActiveIndex: React.Dispatch<React.SetStateAction<number>> }) => {
  return (
    <div className="w-full mx-auto">
      <label className={`font-semibold font-merriweather mx-2 my-4 px-4 py-2 rounded-xl text-white transition-all cursor-pointer ${activeIndex === 1 && " bg-white !text-slate-800 !cursor-default"}`} htmlFor="cas-mode-1">
        <input className="hidden" onChange={() => setActiveIndex(1)} value={"cp-mode1"} type="radio" name="language" id="cas-mode-1" />
        EN | ID
      </label>
      <label className={`font-semibold font-merriweather mx-2 my-2 px-4 py-2 rounded-xl text-white transition-all cursor-pointer ${activeIndex === 2 && " bg-white !text-slate-800 !cursor-default"}`} htmlFor="cas-mode-2">
        <input className="hidden" onChange={() => setActiveIndex(2)} value={"cp-mode2"} type="radio" name="language" id="cas-mode-2" />
        EN
      </label>
      <label className={`font-semibold font-merriweather mx-2 my-2 px-4 py-2 rounded-xl text-white transition-all cursor-pointer ${activeIndex === 3 && " bg-white !text-slate-800 !cursor-default"}`} htmlFor="cas-mode-3">
        <input className="hidden" onChange={() => setActiveIndex(3)} value={"cp-mode3"} type="radio" name="language" id="cas-mode-3" />
        ID
      </label>
    </div>
  );
};

export default function CharActiveSkill({ charActiveSkill }: { charActiveSkill: Evertale.Character.ActiveSkill[] }) {
  const [activeIndex, setActiveIndex] = useState<number>(1);

  return (
    <div className="w-full md:w1/2 mt-8 ml-2 px-4 py-4 rounded-xl bg-slate-800 h-[460px] overflow-y-scroll scrollbar-style">
      <OptionLanguage activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      {charActiveSkill.map((nas, i: number) => (
        <div key={`nas-${i++}`} className="border-b-2 last-of-type:border-none my-4 border-white text-white font-poppins">
          <div className="flex flex-col md:flex-row justify-start content-center cursor-default">
            <p className="text-base md:text-lg font-bold my-auto">{nas.skillName}</p>
            <div className="flex flex-row justify-start content-center">
              <div className="flex flex-row justify-start content-center mx-2 px-1 rounded-xl">
                <Image src="/Evertale/Icon/Spirit.png" width={32} height={32} alt="Spirit-Icon" className="my-auto" />
                {(nas.skillSpirit as number) > 0 && <span className="my-auto bg-white px-2 rounded-full font-bold text-green-700">+{nas.skillSpirit as number}</span>}
                {(nas.skillSpirit as number) < 0 && <span className="my-auto bg-white px-2 rounded-full font-bold text-red-700">{nas.skillSpirit as number}</span>}
                {(nas.skillSpirit as number) === 0 && <span className="my-auto bg-white px-2 rounded-full font-bold text-slate-800">{nas.skillSpirit as number}</span>}
              </div>
              <div className="flex flex-row justify-start content-center px-1 ">
                <Image src="/Evertale/Icon/TU.png" width={32} height={32} alt="Spirit-Icon" className="my-auto" />
                <span className="my-auto ml-1 font-bold">{nas.skillTu as number}</span>
              </div>
              <div className="flex flex-row justify-start content-center mx-2 px-1 rounded-xl">
                <Bullseye className="my-auto mr-1 w-[25px] h-[25px]" />
                <span className="my-auto ml-1 font-bold">{nas.skillTarget as number}</span>
              </div>
            </div>
          </div>
          <div className="my-2 cursor-default">
            {nas.typeSkill.map((type: any) => (
              <span key={type} className="bg-white !text-slate-800 mx-1 my-1 first:ml-0 rounded-xl px-2 font-bold flex-wrap">
                {type}{" "}
              </span>
            ))}
          </div>
          {activeIndex === 1 && (
            <div className="flex flex-row">
              <article className="text-justify mr-1">{nas.skillDescEn}</article>
              <article className="text-justify ml-1">{nas.skillDescId}</article>
            </div>
          )}
          {activeIndex === 2 && (
            <div>
              <article className="text-justify my-1">{nas.skillDescEn}</article>
            </div>
          )}
          {activeIndex === 3 && (
            <div>
              <article className="text-justify my-1">{nas.skillDescId}</article>
            </div>
          )}
        </div>

        // <SwiperSlide key={`active-skill-${i++}`}>
        //   <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Active Skill {i + 1}</h3>
        //   <p className="text-white font-poppins">
        //     <strong>Skill Name : </strong> {nas.skillName}
        //   </p>
        //   <p className="text-white font-poppins">
        //     <strong>Skill Type : </strong> {nas.typeSkill.join(", ")}
        //   </p>
        //   <p className="text-white font-poppins">
        //     <strong>Spirit : </strong> {nas.skillSpirit as number}
        //   </p>
        //   <p className="text-white font-poppins">
        //     <strong>TU : </strong> {nas.skillTu as number}
        //   </p>
        //   <p className="text-white font-poppins">
        //     <strong>Target : </strong> {nas.skillTarget as number}
        //   </p>
        //   {activeIndex === 1 && (
        //     <>
        //       <article className="text-white font-poppins">
        //         <strong>Description : </strong>
        //         <p>{nas.skillDescEn}</p>
        //       </article>
        //       <article className="text-white font-poppins">
        //         <strong>Deskripsi : </strong>
        //         <p></p>
        //         {nas.skillDescId}
        //       </article>
        //     </>
        //   )}
        //   {activeIndex === 2 && (
        //     <article className="text-white font-poppins">
        //       <strong>Description : </strong>
        //       <p>{nas.skillDescEn}</p>
        //     </article>
        //   )}
        //   {activeIndex === 3 && (
        //     <article className="text-white font-poppins">
        //       <strong>Deskripsi : </strong>
        //       <p>{nas.skillDescId}</p>
        //     </article>
        //   )}
        // </SwiperSlide>
      ))}
    </div>
  );
}
