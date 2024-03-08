import Checkbox from "@/components/Input/Checkbox";
import TextField from "@/components/Input/TextField";
import { useState } from "react";

export default function CharConjure() {
  const [haveConjured, setHaveConjured] = useState<boolean>(false);
  const [selfConjured, setSelfConjured] = useState<boolean>(false);
  const [conjure, setConjure] = useState<string>("");
  return (
    <div>
      <Checkbox variant="default-variant-1" checked={haveConjured} onChange={() => setHaveConjured(!haveConjured)} forId="is-have-conjured" label="Punya Conjured" />

      {haveConjured && (
        <>
          <Checkbox
            variant="default-variant-1"
            checked={selfConjured}
            onChange={() => {
              setSelfConjured(!selfConjured);
              if (!selfConjured) {
                setConjure("");
              }
            }}
            forId="self-conjure"
            label="Conjure diri sendiri"
          />

          <TextField variant="default-variant-1" disabled={selfConjured} value={selfConjured ? "selfConjured" : conjure} onChange={(e) => setConjure(e.target.value)} forId="charConjure" label="Character Conjure" name="charConjure" />
        </>
      )}
    </div>
  );
}
