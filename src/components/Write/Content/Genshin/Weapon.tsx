import React from "react";
import { submitFormHandler } from "./formState";
import Button, {
  VariantClass as ButtonStyle,
} from "@/components/general/Button";
import { Input, VariantClass } from "@/components/general/Input";
import Textarea, { TextareaStyle } from "@/components/general/Textarea";
import ImageInput, {changeHandler as imageHandler} from "@/components/general/ImageInput";

export default function WeaponForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [fileName, setFilename] = React.useState<string>("");
  const [previewLink, setPreviewLink] = React.useState<string>("");

  function changeHandler(e:React.ChangeEvent<HTMLTextAreaElement>){
    const textareas = document.querySelectorAll("textarea[data-textarea='weapon-ref'") as NodeListOf<HTMLTextAreaElement>;

    textareas.forEach((textarea) => {
      textarea.value = e.target.value;
    })
  }
  return (
    <>
    <form
      className="my-4"
      onSubmit={(e) =>
        submitFormHandler(
          e,
          "/api/post",
          setIsLoading,
          "Genshin Impact",
          "Weapon",
          "weapon-button-submit"
        )
      }
    >
      <Input 
      disabled={isLoading}
        forId="weapon-name"
        name="name"
        label="Weapon Name"
        variant={VariantClass.dashboard}
        />

      <Input 
      disabled={isLoading}
        forId="weapon-type"
        name="type"
        label="Weapon Type"
        list="weapon-type-list"
        variant={VariantClass.dashboard}
        />
      
      <Input 
      disabled={isLoading}
        forId="weapon-sub-status"
        name="subStatus"
        label="Weapon Sub Status"
        variant={VariantClass.dashboard}
        />

      <Input 
      disabled={isLoading}
        forId="weapon-ref-1"
        name="weap-ref-1"
        label="Weapon Ref 1"
        variant={VariantClass.dashboard}
        />

      <Textarea
        forId="weapon-ref-1-effect"
        name="weap-ref-1-effect"
        label="Weapon Ref 1 Effect"
        data-textarea="weapon-ref"
        onChange={changeHandler}
        className={TextareaStyle.variant_1}
      />

      <Input 
      disabled={isLoading}
        forId="weapon-ref-2"
        name="weap-ref-2"
        label="Weapon Ref 2"
        variant={VariantClass.dashboard}
        />

      <Textarea
        forId="weapon-ref-2-effect"
        name="weap-ref-2-effect"
        label="Weapon Ref 2 Effect"
        data-textarea="weapon-ref"
        className={TextareaStyle.variant_1}
      />

      <Input 
      disabled={isLoading}
        forId="weapon-ref-3"
        name="weap-ref-3"
        label="Weapon Ref 3"
        variant={VariantClass.dashboard}
        />

      <Textarea
        forId="weapon-ref-3-effect"
        name="weap-ref-3-effect"
        label="Weapon Ref 3 Effect"
        data-textarea="weapon-ref"
        className={TextareaStyle.variant_1}
      />

      <Input 
      disabled={isLoading}
        forId="weapon-ref-4"
        name="weap-ref-4"
        label="Weapon Ref 4"
        variant={VariantClass.dashboard}
        />

      <Textarea
        forId="weapon-ref-4-effect"
        name="weap-ref-4-effect"
        label="Weapon Ref 4 Effect"
        data-textarea="weapon-ref"
        className={TextareaStyle.variant_1}
      />

      <Input 
      disabled={isLoading}
        forId="weapon-ref-5"
        name="weap-ref-5"
        label="Weapon Ref 5"
        variant={VariantClass.dashboard}
        />

      <Textarea
        forId="weapon-ref-5-effect"
        name="weap-ref-5-effect"
        label="Weapon Ref 5 Effect"
        data-textarea="weapon-ref"
        className={TextareaStyle.variant_1}
      />

      <Textarea
        forId="weapon-lore"
        name="lore"
        label="Weapon Lore"
        className={TextareaStyle.variant_1}
      />

      <Input 
      disabled={isLoading}
        forId="weapon-rarity"
        name="rarity"
        label="Weapon Rarity"
        variant={VariantClass.dashboard}
        />

        <ImageInput changeHandler={(e) => imageHandler(e, setFilename, setPreviewLink)} fileName={fileName} previewLink={previewLink} />
        
      <Button className={ButtonStyle.submit} id="weapon-button-submit">
        {isLoading ? "Submitting" : "Submit"}
      </Button>
    </form>
    <datalist id="weapon-type-list">
      <option value="Bow" />
      <option value="Catalyst" />
      <option value="Claymore" />
      <option value="Polearm" />
      <option value="Sword" />
    </datalist>
    </>
  );
}
