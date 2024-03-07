import DisplayImage from "@/components/DataDisplay/Image";

interface SubArtifactProps {
  keyValue: keyof Pick<GenshinImpact.Artifact, "flower" | "goblet" | "sands" | "circlet" | "plume">;
  data: GenshinImpact.Artifact;
}

export default function SubArtifact({ keyValue, data }: SubArtifactProps) {
  return (
    <div className="p-4">
      <h5 className="text-white font-bold font-merriweather">{keyValue}</h5>

      <DisplayImage template="variant1" src={data[keyValue].image} alt={data[keyValue].name} />

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
