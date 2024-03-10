import TextField from "@/components/Input/TextField";
import TypeSkill from "./TypeSkill";
import Textarea, { TextareaStyle } from "@/components/Input/Textarea";

export default function CharacterActiveSkill() {
  let index = 1;
  return (
    <div>
      <h5 className="text-white text-xl underline text-center font-bold font-poppins my-4">Character Active Skill</h5>
      <div>
        <TextField forId={`active-skill-name-${index}`} label="Skill Name" variant="default-variant-1" name={`active-skill-name-${1}`} />
        <TypeSkill index={index} />
        <div className="grid grid-cols-3 gap-4">
          <TextField forId={`active-skill-spirit-${index}`} label="Skill Spirit" variant="default-variant-1" name={`active-skill-spirit-${1}`} />
          <TextField forId={`active-skill-target-${index}`} label="Skill Target" variant="default-variant-1" name={`active-skill-target-${1}`} />
          <TextField forId={`active-skill-tu-${index}`} label="Skill TU" variant="default-variant-1" name={`active-skill-tu-${1}`} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Textarea forId={`active-skill-desc-en-${index}`} className={TextareaStyle.variant_1} name={`active-skill-desc-en-${index}`} label="Description" />
          <Textarea forId={`active-skill-desc-id-${index}`} className={TextareaStyle.variant_1} name={`active-skill-desc-id-${index}`} label="Description" />
        </div>
      </div>
    </div>
  );
}
