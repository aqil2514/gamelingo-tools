import Image from "next/image";

interface SubArtifactProps {
  keyValue: keyof Pick<GenshinImpact.Artifact, "flower" | "goblet" | "sands" | "circlet" | "plume">;
  data: GenshinImpact.Artifact;
}

const IMAGE_CONTAINER_CLASS =
  "relative m-auto border border-dashed group border-white rounded-md min-h-[128px] min-w-[128px] max-h-[210px] max-w-[210px] flex justify-center items-center transition duration-200 cursor-pointer hover:border-zinc-500 overflow-hidden";

export default function SubArtifact({ keyValue, data }: SubArtifactProps) {
  return (
    <div className="p-4">
      <h5 className="text-white font-bold font-merriweather">{keyValue}</h5>

      <div className={IMAGE_CONTAINER_CLASS}>
        {data[keyValue].image ? (
          <Image src={data[keyValue].image as string} fill sizes="auto" alt={data[keyValue].name + " Image"} className="w-auto group-hover:scale-125 transition duration-500" />
        ) : (
          <span className="transition duration-200 group-hover:text-zinc-500 text-white font-bold"> No Image</span>
        )}
      </div>

      <p className="font-poppins text-white">
        <strong className="font-bold capitalize">Sub Artifact Name : </strong>
        {data[keyValue].name}
      </p>

      <p className="font-poppins text-white">
        <strong className="font-bold capitalize">Sub Artifact Lore : </strong>
        {data[keyValue].lore}
      </p>

      <p className="font-poppins text-white">
        <strong className="font-bold capitalize">Sub Artifact Type : </strong>
        {data[keyValue].type}
      </p>
    </div>
  );
}
