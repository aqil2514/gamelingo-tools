"use client";

import React from "react";
import IndonesianSection from "./ID";
import EnglishSection from "./EN";

const OptionLanguage = ({ activeIndex, setActiveIndex }: React.ComponentState) => {
  return (
    <div className="w-full mx-auto">
      <label className={`font-semibold font-merriweather mx-2 my-2 px-4 py-2 rounded-xl text-white transition-all cursor-pointer ${activeIndex === 2 && " bg-white !text-slate-800 !cursor-default"}`} htmlFor="mode-2">
        <input className="hidden" onChange={() => setActiveIndex(2)} value={"cp-mode2"} type="radio" name="language" id="mode-2" />
        ID
      </label>
      <label className={`font-semibold font-merriweather mx-2 my-2 px-4 py-2 rounded-xl text-white transition-all cursor-pointer ${activeIndex === 3 && " bg-white !text-slate-800 !cursor-default"}`} htmlFor="mode-3">
        <input className="hidden" onChange={() => setActiveIndex(3)} value={"cp-mode3"} type="radio" name="language" id="mode-3" />
        EN
      </label>
    </div>
  );
};

export default function Data() {
  const [activeIndex, setActiveIndex] = React.useState(2);
  return (
    <>
      <OptionLanguage activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      {activeIndex === 2 && <IndonesianSection />}
      {activeIndex === 3 && <EnglishSection />}
    </>
  );
}
