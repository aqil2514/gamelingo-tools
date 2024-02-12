import React from "react";
import { submitFormHandler } from "./genshinUtils";
import { Input, VariantClass } from "@/components/general/Input";
import Button, {
  VariantClass as ButtonClass,
} from "@/components/general/Button";
import ImageInput, { changeHandler } from "@/components/general/ImageInput";

export default function ArtifactForm() {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [fileName, setFileName] = React.useState<string>("");
  const [previewLink, setPreviewLink] = React.useState<string>("");
  return (
    <>
      <form
        onSubmit={(e) =>
          submitFormHandler(
            e,
            "/api/post",
            setIsLoading,
            "Genshin Impact",
            "Artifact",
            "artifact-button-submit"
          )
        }
        className="my-4"
      >
        <Input
          forId="name"
          required
          name="name"
          variant={VariantClass.dashboard}
          label="Artifact Name"
        />

        <Input
          forId="artifact-type"
          name="type"
          variant={VariantClass.dashboard}
          label="Artifact Type"
          list="artifact-type-list"
        />

        <Input
          forId="artifact-set"
          name="set"
          variant={VariantClass.dashboard}
          label="Artifact Set Name"
        />

        <Input
          forId="artifact-set-1"
          name="setName-1"
          variant={VariantClass.dashboard}
          label="Artifact Set 1 Name"
        />

        <label htmlFor="artifact-set-1-desc" className="text-white font-bold">
          Artifact Set 1 Description :
        </label>
        <textarea
          disabled={isLoading}
          className="w-full h-[100px] block  my-4 rounded-xl p-4 text-zinc-950 text-base font-bold font-poppins"
          name="setValue-1"
          id="artifact-set-1-desc"
        ></textarea>

        <Input
          forId="artifact-set-2"
          name="setName-2"
          variant={VariantClass.dashboard}
          label="Artifact Set 2 Name"
        />

        <label htmlFor="artifact-set-2-desc" className="text-white font-bold">
          Artifact Set 2 Description :
        </label>
        <textarea
          disabled={isLoading}
          className="w-full h-[100px] block  my-4 rounded-xl p-4 text-zinc-950 text-base font-bold font-poppins"
          name="setValue-2"
          id="artifact-set-2-desc"
        ></textarea>

        <Input
          forId="artifact-rarity"
          name="rarity"
          variant={VariantClass.dashboard}
          label="Artifact Rarity"
        />

        <Input
          forId="artifact-source"
          name="source"
          variant={VariantClass.dashboard}
          label="Artifact Source"
        />

        <ImageInput
          changeHandler={(e) => changeHandler(e, setFileName, setPreviewLink)}
          fileName={fileName}
          previewLink={previewLink}
        />

        <Button className={ButtonClass.submit} id="artifact-button-submit">
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>

      <datalist id="artifact-type-list">
        <option value="Flower of Life" />
        <option value="Plume of Death" />
        <option value="Sands of Eon" />
        <option value="Goblet of Eonothem" />
        <option value="Circlet of Logos" />
      </datalist>
    </>
  );
}
