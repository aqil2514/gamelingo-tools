import Image from "next/image";

interface AscendComponentProps {
  template: "Character" | "Weapon";
  ascend: keyof GenshinImpact.UpgradeMaterial;
  data: GenshinImpact.Character;
}

const title: Record<keyof GenshinImpact.UpgradeMaterial, string> = {
  ascend1: "Ascend 1",
  ascend2: "Ascend 2",
  ascend3: "Ascend 3",
  ascend4: "Ascend 4",
  ascend5: "Ascend 5",
  ascend6: "Ascend 6",
};

export default function AscendComponent({
  template,
  ascend,
  data,
}: AscendComponentProps) {
  if (template === "Character")
    return <Character ascend={ascend} data={data} />;
}

function Character({ ascend, data }: Omit<AscendComponentProps, "template">) {
  if (!data.ascendMaterial) throw new Error("ups.... Terjadi kesalahan");
  return (
    <div>
      <h3 className="text-white font-nova-square font-bold text-xl">
        {title[ascend]}
      </h3>
      <div className="my-4 gap-4 overflow-x-scroll">
        {data.ascendMaterial[`${ascend}`].map((asc, i: number) => (
          <div key={`asc-${i}`} className="grid grid-cols-[100px_auto] ">
            <Image
              src={"https://placehold.jp/64x64.png"}
              alt={asc.name}
              width={64}
              height={64}
              className="block mx-auto my-2"
            />
            <p className="text-white font-semibold font-poppins my-auto">
              {asc.count}
              {asc.name === "Mora" ? "" : "x"} {asc.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
