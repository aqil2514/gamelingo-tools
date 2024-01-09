import { DIV_MAIN_STYLE } from "@/components/Styles";
import WeaponImage from "./WeapImage";
import Title from "./Title";
import WeapLore from "./WeapLore";
import WeaponStatus from "./WeaponStatus";

export default function WeapPost({ data }: any) {
  console.log(data);
  return (
    <div className={DIV_MAIN_STYLE + " px-2 lg:px-8"}>
      <Title title={data.weapName} />
      <div className="flex my-4 flex-col md:flex-row justify-between content-center">
        <WeaponImage weapImage={data.weapImage.webp} weapName={data.weapName} />
        <WeapLore lore={data.weapLore} />
      </div>
      <WeaponStatus weapAscend={data.weapAscend} weapMax={data.weapMax} />

      <div className="text-white mt-8 -mb-8 font-bold font-nova-square text-2xl">Related Article : </div>
    </div>
  );
}
