import React, { SetStateAction } from "react";

export interface BodyProps {
  characters: GenshinImpact.CharacterTable[];
}

export interface CharacterFilterProps {
  filter: FilterState;
  setFilter: React.Dispatch<SetStateAction<FilterState>>;
  setCharName?: React.Dispatch<SetStateAction<string>>;
}

export interface CharacterSortProps {
  sort: SortBy;
  setSort: React.Dispatch<SetStateAction<SortBy>>;
}

export interface FilterState {
  element: string;
  weapon: string;
  rarity: string;
}

export type SortBy = "Name" | undefined;
