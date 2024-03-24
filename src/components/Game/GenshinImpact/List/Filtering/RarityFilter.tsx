import { SetStateAction } from "react";
import { FilterState } from "..";
import Image from "next/image";

interface Props {
    filter: FilterState;
    setFilter: React.Dispatch<SetStateAction<FilterState>>;
  }

export default function RarityFilter({ filter, setFilter }: Props){
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