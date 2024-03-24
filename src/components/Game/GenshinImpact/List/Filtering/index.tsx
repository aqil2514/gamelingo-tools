import Button, { VariantClass } from "@/components/Input/Button";
import { FilterState } from "..";
import React, { SetStateAction, useState } from "react";
import ElementFilter from "./ElementFiltering";
import WeaponFilter from "./WeaponFilter";
import RarityFilter from "./RarityFilter";

interface Props {
  filter: FilterState;
  setFilter: React.Dispatch<SetStateAction<FilterState>>;
}

export default function FilterCharacter({ filter, setFilter }: Props) {
  const [filterPopup, setFilterPopUp] = useState<boolean>(true);
  return (
    <>
      <div className="py-4 hidden lg:block">
        <h3 className="text-center text-xl font-bold font-nova-square text-white">
          Urutkan Berdasarkan:
        </h3>
        <div className="p-4 my-4 border-4 border-double border-white rounded-xl grid gap-4 grid-cols-3">
          <ElementFilter filter={filter} setFilter={setFilter} />
          <WeaponFilter filter={filter} setFilter={setFilter} />
          <RarityFilter filter={filter} setFilter={setFilter} />
        </div>
        {Object.keys(filter).length !== 0 && (
          <Button
            className={VariantClass.danger}
            onClick={() => setFilter({} as FilterState)}
          >
            Reset Filter
          </Button>
        )}
      </div>
      <div className="py-4 flex lg:hidden gap-4">
        <Button
          className={VariantClass.fetch}
          onClick={() => setFilterPopUp(true)}
        >
          Filter
        </Button>
        {Object.keys(filter).length !== 0 && (
          <Button
            className={VariantClass.danger}
            onClick={() => {
              setFilter({} as FilterState);
              setFilterPopUp(false);
            }}
          >
            Hapus Filter
          </Button>
        )}
      </div>
      {filterPopup && (
        <div className="block lg:hidden fixed w-4/5 bg-slate-900 z-50 p-4 rounded-xl top-20 max-h-[400px] overflow-y-scroll scrollbar-style">
          <h3 className="text-center text-xl mb-4 underline font-bold font-nova-square text-white">
            Urutkan Berdasarkan:
          </h3>

          <div className="flex flex-col gap-4 divide-y-2">
            <ElementFilter filter={filter} setFilter={setFilter} />
            <WeaponFilter filter={filter} setFilter={setFilter} />
            <RarityFilter filter={filter} setFilter={setFilter} />
          </div>

          <div className="flex justify-center gap-4">
            <Button
              className={VariantClass.danger}
              onClick={() => {
                setFilter({} as FilterState);
                setFilterPopUp(false);
              }}
            >
              Batal Filter
            </Button>
            <Button
              className={VariantClass.submit}
              onClick={() => setFilterPopUp(false)}
            >
              Terapkan
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
