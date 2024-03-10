import Textarea, { TextareaStyle } from "@/components/Input/Textarea";
import { hideTextareaMessage, showTextareMessage } from "@/utils/fe";

const profileName = [
  "part1En",
  "part1Id",
  "part2En",
  "part2Id",
  "part3En",
  "part3Id",
];
const profileLabel: Record<string, string> = {
  part1En: "Part 1 EN",
  part1Id: "Part 1 ID",
  part2En: "Part 2 EN",
  part2Id: "Part 2 ID",
  part3En: "Part 3 EN",
  part3Id: "Part 3 ID",
};

export default function CharacterProfile() {
  return (
    <div>
      <h5 className="text-white text-xl underline text-center font-bold font-poppins my-4">
        Character Profile
      </h5>
      <div className="grid grid-cols-2 gap-4">
        {profileName.map((el) => {
          if (el.toLowerCase().includes("en"))
            return (
              <div key={el}>
                <Textarea
                  className={TextareaStyle.variant_1}
                  forId={el}
                  label={profileLabel[el]}
                  name={el}
                  onFocus={showTextareMessage}
                  onBlur={hideTextareaMessage}
                />
                <p className="absolute bottom-[10%] right-[3%] bg-white w-[95%] text-right px-8 hidden">
                  CTRL + Enter untuk terjemahkan langsung
                </p>{" "}
              </div>
            );
          return (
            <div key={el}>
              <Textarea
                className={TextareaStyle.variant_1}
                forId={el}
                label={profileLabel[el]}
                name={el}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
