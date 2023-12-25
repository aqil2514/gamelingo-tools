import { CharacterActiveSkill } from "@/models/Evertale/Characters";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "../../scrollbar.css";
import "./swiper-config.css";
import "swiper/css";
import "swiper/css/navigation";

export default function CharActiveSkill({ charActiveSkill }: { charActiveSkill: CharacterActiveSkill[] }) {
  return (
    <div className="w-full md:w1/2 mt-8 ml-2 px-4 py-4 rounded-xl bg-slate-800 h-[460px] overflow-y-scroll scrollbar-style">
      <Swiper modules={[Navigation]} slidesPerView={1} navigation={{ enabled: true, hideOnClick: true }} className="navigation-config">
        {charActiveSkill.map((nas: CharacterActiveSkill, i: number) => (
          <SwiperSlide key={`active-skill-${i++}`}>
            <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Active Skill {i + 1}</h3>
            <p className="text-white font-poppins">
              <strong>Skill Name : </strong> {nas.skillName}
            </p>
            <p className="text-white font-poppins">
              <strong>Skill Type : </strong> {nas.typeSkill.join(", ")}
            </p>
            <p className="text-white font-poppins">
              <strong>Spirit : </strong> {nas.skillSpirit as number}
            </p>
            <p className="text-white font-poppins">
              <strong>TU : </strong> {nas.skillTu as number}
            </p>
            <p className="text-white font-poppins">
              <strong>Target : </strong> {nas.skillTarget as number}
            </p>
            <article className="text-white font-poppins">
              <strong>Description : </strong>
              <p>{nas.skillDescEn}</p>
            </article>
            <article className="text-white font-poppins">
              <strong>Deskripsi : </strong>
              <p></p>
              {nas.skillDescId}
            </article>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
