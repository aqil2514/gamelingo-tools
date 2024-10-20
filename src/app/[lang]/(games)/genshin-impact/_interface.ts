import { SetStateAction } from "react";

export interface BodyProps{
    characters: GenshinImpact.CharacterTable[];
}

export interface CharacterFilterProps {
    filter: FilterState;
    setFilter: React.Dispatch<SetStateAction<FilterState>>;
  }

export interface FilterState {
    element: string;
    weapon: string;
    rarity: string;
  }