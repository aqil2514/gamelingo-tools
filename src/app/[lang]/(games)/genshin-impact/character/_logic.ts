import { useEffect, useState } from "react";
import { FilterState } from "../_interface";
import { useMessages } from "next-intl";

export const useCharacters = ({
  data,
}: {
  data: GenshinImpact.CharacterTable[];
}) => {
  const [chars, setChars] = useState<GenshinImpact.CharacterTable[]>([]);
  const [initChars, setInitChars] = useState<GenshinImpact.CharacterTable[]>(
    []
  );
  const [charNameInput, setCharNameInput] = useState<string>("");
  const [filter, setFilter] = useState<FilterState>({} as FilterState);
  const messages = useMessages();
  const message =
    messages.GenshinCharacterPage as unknown as Internationalization.GenshinCharacterPage;


  useEffect(() => {
    setChars(data);
    setInitChars(data);
  }, [data]);

  useEffect(() => {
    if (!charNameInput) return setChars(initChars);

    const charName = initChars.filter((c) =>
      c.name.toLowerCase().includes(charNameInput.toLowerCase())
    );
    setChars(charName);
  }, [charNameInput, initChars]);

  useEffect(() => {
    if (Object.keys(filter).length === 0) {
      setChars(initChars);
      return;
    }

    const filteredChars = initChars.filter((c) => {
      const isElementMatch =
        !filter.element || (c.element as unknown as string) === filter.element;
      const isWeaponMatch =
        !filter.weapon || (c.weapon as unknown as string) === filter.weapon;
      const isRarityMatch =
        !filter.rarity || (c.rarity as unknown as string) === filter.rarity;

      return isElementMatch && isWeaponMatch && isRarityMatch;
    });

    setChars(filteredChars);
  }, [initChars, filter]);

  return {chars, message, setCharNameInput, setFilter}
};
