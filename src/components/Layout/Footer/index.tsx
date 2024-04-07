import { Link } from "@/navigation";
import { useTranslations } from "next-intl";
import { useRouter, useSelectedLayoutSegment } from "next/navigation";
import { ChevronLeft, ChevronRight } from "react-bootstrap-icons";
import FooterContent from "./FooterContent";

export default function Footer() {
  // const router = useRouter();
  const t = useTranslations("Footer");

  return <FooterContent about={t("about")} news={t("news")} lang={t("lang")} />
}
