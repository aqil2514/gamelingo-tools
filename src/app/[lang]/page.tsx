import type { Metadata } from "next";
import HomeIcon from "@/components/Layout/Home/Icon";
import {useTranslations} from 'next-intl';
import { getTranslations } from "next-intl/server";

interface Lang {
  params: {lang:"en" | "id"}  
}

export async function generateMetadata({params: {lang}} : Lang):Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: t('home')
}
}

export default function App() {
  const t = useTranslations("Home");
  return (
    <div className="min-h-screen w-full grid grid-rows-[10fr_2fr]">
      <div
        style={{ background: "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.8)), url('/background/hero-wallpaper.webp')" }}
        className="mt-14 flex flex-col justify-center flex-wrap content-center !bg-center !bg-cover !bg-no-repeat"
      >
        <h1 className="text-center text-white font-bold text-base sm:text-5xl font-merienda mb-2">{t("greetings")}</h1>
        <h1 className="text-center text-white font-bold text-xs font-mclaren mt-2">{t("sub")}</h1>
      </div>
      <HomeIcon />
    </div>
  );
}
