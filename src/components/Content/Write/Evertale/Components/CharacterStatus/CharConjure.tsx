import Checkbox from "@/components/Input/Checkbox";
import TextField from "@/components/Input/TextField";
import { fetcher } from "@/lib/Data";
import { Route } from "next";
import { useState } from "react";
import useSWR from "swr";

export default function CharConjure() {
  const url: Route = "/api/gamelingo/evertale?category=conjuredChar";
  const [haveConjured, setHaveConjured] = useState<boolean>(false);
  const [selfConjured, setSelfConjured] = useState<boolean>(false);
  const { data, isLoading, error } = useSWR(url, fetcher);
  const [conjure, setConjure] = useState<string>("");

  const conChar: Evertale.Character.QuickInfo[] = data?.data;
  return (
    <div>
      <Checkbox variant={!data || isLoading ? "skeleton-variant-1" : "default-variant-1"} checked={haveConjured} onChange={() => setHaveConjured(!haveConjured)} forId="is-have-conjured" label="Punya Conjured" />

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
          <br />
          <TextField
            variant="default-variant-1"
            disabled={selfConjured}
            value={selfConjured ? "selfConjured" : conjure}
            onChange={(e) => setConjure(e.target.value)}
            list="conjured-list"
            forId="charConjure"
            label="Character Conjure"
            name="status-charConjure"
          />
        </>
      )}

      {conChar && (
        <datalist id="conjured-list">
          {conChar.map((c) => (
            <option value={c.name} key={c.id} />
          ))}
        </datalist>
      )}
    </div>
  );
}
