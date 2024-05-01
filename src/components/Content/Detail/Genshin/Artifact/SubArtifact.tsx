import DisplayImage from "@/components/DataDisplay/Image";
import { nullImageUrl } from "@/lib/Data";
import { useParams } from "next/navigation";

interface SubArtifactProps {
  keyValue: keyof Pick<GenshinImpact.ArtifactSubField, "flower" | "goblet" | "sands" | "circlet" | "plume">;
  data: GenshinImpact.Artifact;
}

export default function SubArtifact({ keyValue, data }: SubArtifactProps) {
  const {lang} = useParams();
  const langMapping = lang === "English" ? "en":"id";
  const langData = data[langMapping];
  const imageSelected = data.image ? data.image.find((d) => d.toLowerCase() === keyValue.toLowerCase()) : nullImageUrl;

  if(!langData) throw new Error("Terjadi kesalahan saat manajemen bahasa Data");
  if(!imageSelected) throw new Error("Terjadi kesalahan saat penentuan gambar");
  
  return (
    <div className="p-4">
      <h5 className="text-white font-bold font-merriweather">{keyValue}</h5>

      <DisplayImage template="variant1" src={imageSelected} alt={langData[keyValue].name} />

      <p className="font-poppins text-white">
        <strong className="font-bold capitalize">Sub Artifact Name : </strong>
        {langData[keyValue].name}
      </p>

      <p className="font-poppins text-white">
        <strong className="font-bold capitalize">Sub Artifact Lore : </strong>
        {langData[keyValue].lore}
      </p>

      <p className="font-poppins text-white">
        <strong className="font-bold capitalize">Sub Artifact Type : </strong>
        {langData[keyValue].type}
      </p>
    </div>
  );
}
