"use client";
import Loading from "@/components/general/Loading";
import ButtonLink from "./ButtonLink";
import CharSlider from "./CharSlider";
import useSWR from "swr";
import Error from "@/components/general/Error";
import WeaponSlider from "./WeaponSlider";

interface SliderState {
  type: "chars" | "weapons" | "acc";
  buttonLink: boolean;
  loadingAnimation: boolean;
  length: number;
  textOn: boolean;
  text?: string;
}

const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());

const Slider = ({ type, buttonLink, loadingAnimation, length, textOn = false, text }: SliderState) => {
  const URL = `/api/gamelingo/evertale/${type}?maxResult=${length}`;
  const { data, isLoading, error } = useSWR(URL, fetcher);

  if (!data || isLoading) {
    if (loadingAnimation) return <Loading loading={1} textOn={textOn} text={text} />;
    return <></>;
  }
  if (error) return <Error />;

  if (type === "chars")
    return (
      <>
        <CharSlider characters={data.characters} />
        {buttonLink && <ButtonLink linkHref="/evertale/chars" />}
      </>
    );
  else if (type === "weapons")
    return (
      <>
        <WeaponSlider weapons={data.data} />
        {buttonLink && <ButtonLink linkHref="/evertale/weapons" />}
      </>
    );
};

export default Slider;
