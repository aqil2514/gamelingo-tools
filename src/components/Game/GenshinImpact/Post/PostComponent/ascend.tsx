import Image from "next/image";

interface AscendComponentProps{
    template:"Character" | "Weapon";
    ascendNumber: number;
    data: GenshinImpact.Character;
}
export default function AscendComponent({template, ascendNumber, data}: AscendComponentProps){}

function Character({ascendNumber, data}: Omit<AscendComponentProps, "template">){
    return(
        <div className="my-4">
          <h3>Ascend {ascendNumber}</h3>
          {data.ascendMaterial?.ascend[`${ascendNumber}` as keyof GenshinImpact.Character["ascendMaterial"]].map((asc, i:number) => (
            <div key={`asc-${i}`}>
              <Image src={"https://placehold.jp/64x64.png"} alt={asc.name} width={64} height={64}/>
              <p className="text-white font-semibold font-poppins">{asc.count}{asc.name === "Mora" ? "": "x"} {asc.name}</p>
            </div>
          ))}
        </div>
    )
}