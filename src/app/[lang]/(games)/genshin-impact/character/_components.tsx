"use client";

import { SetStateAction, useState } from "react";
import { Characters_List } from "../_components";
import { convertToTable } from "../_utils";
import { useMessages } from "next-intl";
import Button, { VariantClass } from "@/components/Input/Button";
import { CharacterFilterProps, FilterState } from "../_interface";
import { element, weapon } from "../_data";
import Image from "next/image";

export function Characters({
  characters,
}: {
  characters: GenshinImpact.Character[];
}) {
  const data = convertToTable(characters);
  return (
    <div className="grid lg:grid-cols-7 md:grid-cols-6 grid-cols-3 gap-4 rounded-md p-4">
      {data.map((d) => (
        <Characters_List key={d.name} character={d} />
      ))}
    </div>
  );
}

const Characters_Filter = ({ filter, setFilter }: CharacterFilterProps) => {
  const [filterPopup, setFilterPopUp] = useState<boolean>(false);
  const messages = useMessages();
  const message =
    messages.GenshinCharacterPage as unknown as Internationalization.GenshinCharacterPage;

  return (
    <>
      <div className="py-4 hidden lg:block">
        <h3 className="text-center text-xl font-bold font-nova-square text-white">
          {message.sortText}
        </h3>
        <div className="p-4 my-4 border-4 border-double border-white rounded-xl grid gap-4 grid-cols-3">
          <Characters_Filter_Element filter={filter} setFilter={setFilter} />
          <Characters_Filter_Weapon filter={filter} setFilter={setFilter} />
          <Character_Filter_Rarity filter={filter} setFilter={setFilter} />
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
            <Characters_Filter_Element filter={filter} setFilter={setFilter} />
            <Characters_Filter_Weapon filter={filter} setFilter={setFilter} />
            <Character_Filter_Rarity filter={filter} setFilter={setFilter} />
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
};

const Characters_Filter_Element = ({
  filter,
  setFilter,
}: CharacterFilterProps) => {
  return (
    <div className="text-center white font-merienda text-lg font-semibold text-white">
      <h4>Element</h4>
      <div className="flex gap-4 justify-center py-2">
        {element.map((el) => (
          <label htmlFor={el.id} key={el.id}>
            <input
              type="radio"
              name="element-filter"
              value={el.name}
              id={el.id}
              className="hidden"
              onChange={(e) =>
                setFilter({ ...filter, element: e.target.value })
              }
            />
            <Image
              src={el.img}
              alt={el.name}
              width={32}
              height={32}
              className={`h-auto hover:opacity-100 transition-all duration-200 ${
                filter.element === el.name
                  ? "opacity-100 cursor-default"
                  : "opacity-50 cursor-pointer"
              }`}
            />
          </label>
        ))}
      </div>
      {filter.element && (
        <h4 className="text-center text-xl font-bold font-nova-square text-white">
          {filter.element}
        </h4>
      )}
    </div>
  );
};

const Character_Filter_Rarity = ({ filter, setFilter }: CharacterFilterProps) => {
    return(
        <div className="text-center white font-merienda text-lg font-semibold text-white">
            Rarity
            <div className="flex gap-4 justify-center py-2">
              <label
                htmlFor={"rarity-4"}
                onClick={() => setFilter({ ...filter, rarity: "4" })}
              >
                <input
                  type="radio"
                  name="rarity-filter"
                  id={"rarity-4"}
                  className="hidden"
                />
                <div className="flex">
                  <p
                    className={`font-bold text-red-600 font-merriweather my-auto ${
                      filter.rarity === "4"
                        ? "opacity-100 cursor-default"
                        : "opacity-50 cursor-pointer"
                    }`}
                  >
                    4
                  </p>
                  <Image
                    src={"/Genshin-Impact/assets/General_Star.webp"}
                    alt={"Rarity 4"}
                    width={32}
                    height={32}
                    className={`h-auto hover:opacity-100 transition-all duration-200 ${
                      filter.rarity === "4"
                        ? "opacity-100 cursor-default"
                        : "opacity-50 cursor-pointer"
                    }`}
                  />
                </div>
              </label>

              <label
                htmlFor={"rarity-5"}
                onClick={() => setFilter({ ...filter, rarity: "5" })}
              >
                <input
                  type="radio"
                  name="rarity-filter"
                  id={"rarity-5"}
                  className="hidden"
                />
                <div className="flex">
                  <p
                    className={`font-bold text-red-600 font-merriweather my-auto ${
                      filter.rarity === "5"
                        ? "opacity-100 cursor-default"
                        : "opacity-50 cursor-pointer"
                    }`}
                  >
                    5
                  </p>
                  <Image
                    src={"/Genshin-Impact/assets/General_Star.webp"}
                    alt={"Rarity 5"}
                    width={32}
                    height={32}
                    className={`h-auto hover:opacity-100 transition-all duration-200 ${
                      filter.rarity === "5"
                        ? "opacity-100 cursor-default"
                        : "opacity-50 cursor-pointer"
                    }`}
                  />
                </div>
              </label>
            </div>
            {filter.rarity && (
              <h4 className="text-center text-xl font-bold font-nova-square text-white">
                {filter.rarity} Stars
              </h4>
            )}
          </div>
    )
}

const Characters_Filter_Weapon = ({
  filter,
  setFilter,
}: CharacterFilterProps) => {
    return(
        <div className="text-center white font-merienda text-lg font-semibold text-white">
            Weapon
            <div className="flex gap-4 justify-center py-2">
              {weapon.map((el) => (
                <label htmlFor={el.id} key={el.id}>
                  <input
                    type="radio"
                    name="element-filter"
                    value={el.name}
                    id={el.id}
                    className="hidden"
                    onChange={(e) =>
                      setFilter({ ...filter, weapon: e.target.value })
                    }
                  />
                  <Image
                    src={el.img}
                    alt={el.name}
                    width={32}
                    height={32}
                    className={`h-auto hover:opacity-100 transition-all duration-200 ${
                      filter.weapon === el.name
                        ? "opacity-100 cursor-default"
                        : "opacity-50 cursor-pointer"
                    }`}
                  />
                </label>
              ))}
            </div>
            <h4 className="text-center text-xl font-bold font-nova-square text-white">
              {filter.weapon}
            </h4>
          </div>
    )
};