import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { HomeIcon, HomeIntro } from "./_components";

interface Lang {
  params: { lang: "en" | "id" };
}

export async function generateMetadata({
  params: { lang },
}: Lang): Promise<Metadata> {
  const t = await getTranslations("Metadata");

  return {
    title: t("home"),
  };
}

export default function App() {
  return (
    <div className="min-h-screen w-full grid grid-rows-[80%_auto]">
      <HomeIntro />
      <HomeIcon />
    </div>
  );
}
