import { OptionLanguage } from "@/components/general/Option";
import React from "react";

export default function WeapLore({ lore }: { lore: Evertale.Weapon.WeapLore }) {
  const [activeIndex, setActiveIndex] = React.useState(1);
  return (
    <div className="w-full md:w1/2 mt-8 lg:ml-2 px-4 py-4 rounded-xl bg-slate-800 h-[460px] overflow-y-scroll scrollbar-style">
      <OptionLanguage activeIndex={activeIndex} setActiveIndex={setActiveIndex} />
      <Article weapLore={lore} activeIndex={activeIndex} />
    </div>
  );
}

const WeapLore1 = ({ weapLore }: { weapLore: Evertale.Weapon.WeapLore }) => {
  return (
    <div>
      <article key="lore">
        <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Part 1</h3>
        <p className="text-white italic font-poppins">{weapLore.loreEn}</p>
        <div className="bg-white w-full h-1 my-4"></div>
        <p className="text-white font-poppins">{weapLore.loreId}</p>
      </article>
    </div>
  );
};

const WeapLore2 = ({ weapLore }: { weapLore: Evertale.Weapon.WeapLore }) => {
  return (
    <div>
      <article key="lore">
        <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Part 1</h3>
        <p className="text-white italic font-poppins">{weapLore.loreEn}</p>
      </article>
    </div>
  );
};

const WeapLore3 = ({ weapLore }: { weapLore: Evertale.Weapon.WeapLore }) => {
  return (
    <div>
      <article key="lore">
        <h3 className="text-white text-lg md:text-xl text-center mb-4 font-merienda font-bold">Part 1</h3>
        <p className="text-white italic font-poppins">{weapLore.loreId}</p>
      </article>
    </div>
  );
};

const Article = ({ weapLore, activeIndex }: { weapLore: Evertale.Weapon.WeapLore; activeIndex: number }) => {
  if (activeIndex === 1) return <WeapLore1 weapLore={weapLore} />;
  else if (activeIndex === 2) return <WeapLore2 weapLore={weapLore} />;
  else if (activeIndex === 3) return <WeapLore3 weapLore={weapLore} />;
};
