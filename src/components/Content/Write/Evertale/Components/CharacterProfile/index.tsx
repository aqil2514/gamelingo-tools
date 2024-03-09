import Textarea, { TextareaStyle } from "@/components/Input/Textarea";

const profileName = ["part1En", "part1Id", "part2En", "part2Id", "part3En", "part3Id"];
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
      <h5 className="font-bold font-poppins text-white text-center my-4">Character Intro</h5>
      <div className="grid grid-cols-2 gap-4">
        {profileName.map((el) => (
          <div key={el}>
            <Textarea className={TextareaStyle.variant_1} forId={el} label={profileLabel[el]} name={el} />
          </div>
        ))}
      </div>
    </div>
  );
}
