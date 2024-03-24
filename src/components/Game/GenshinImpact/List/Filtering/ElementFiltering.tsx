import { element } from "@/lib/Data/gi";
import Image from "next/image";
import { FilterState } from "..";
import { SetStateAction } from "react";

interface Props {
    filter: FilterState;
    setFilter: React.Dispatch<SetStateAction<FilterState>>;
  }

export default function ElementFilter({ filter, setFilter }: Props){
    return(
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
    )
}