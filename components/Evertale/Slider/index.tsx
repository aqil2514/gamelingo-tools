"use client";
import ButtonLink from "./ButtonLink";
import CharSlider from "./CharSlider";

interface SliderState {
  type: "character" | "weapons" | "acc";
  buttonLink: boolean;
}

const Slider = ({ type, buttonLink }: SliderState) => {
  if (type === "character")
    return (
      <>
        <CharSlider />
        {buttonLink && <ButtonLink linkHref="/evertale/chars" />}
      </>
    );
};

export default Slider;
