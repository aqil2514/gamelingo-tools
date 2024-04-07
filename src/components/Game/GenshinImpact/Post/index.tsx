import Image from "next/image";
import AscendComponent from "./PostComponent/ascend";
import PostComponent from "./PostComponent";

interface GenshinPostProps {
  category: "Character" | "Weapon";
  data: any;
}
export default function PostGenshinImpact({
  category,
  data,
}: GenshinPostProps) {
  if (category === "Character") return <CharacterPost data={data} />;
}

function CharacterPost({ data }: { data: GenshinImpact.Character }) {
  return (
    <div className="main-wrapper py-20">
      <h1 className="text-white font-nova-square text-center font-bold text-3xl my-8">
        {data.name}
      </h1>
      <div className="bg-slate-900 p-4 mx-auto w-3/5 rounded-xl md:grid md:grid-cols-2 gap-4">
        <div className="relative w-full min-h-[200px] max-h[392px]">
          <Image
            src={data.image.cover}
            fill
            sizes="auto"
            alt={data.name}
            className="w-auto h-auto max-w-[640px] max-h-[392px] object-cover"
          />
        </div>
        <div className="text-white font-poppins flex flex-col justify-center">
          <p className="mb-4">
            <strong>Nama Karakter</ strong> : {data.name}
          </p>
          <p className="mb-4">
            <strong>Jenis Kelamin</strong> : {data.gender}
          </p>
          <p className="mb-4">
            <strong>Region</strong> : {data.region}
          </p>
          <p className="mb-4">
            <strong>Element</strong> : {data.element}
          </p>
          <p className="mb-4">
            <strong>Rarity</strong> : {data.rarity}
          </p>
          <p className="mb-4">
            <strong>Senjata</strong> : Pengguna {data.weapon}
          </p>
          <p className="mb-4">
            <strong>Ascend Status</strong> : {data.ascendStatus}
          </p>
          <article className="mb-4">
            <strong>Deskripsi Singkat</strong> :<p>{data.description}</p>
          </article>
          <fieldset className="mb-4 border border-white rounded-lg p-2">
            <legend className="text-center">Aktor Suara</legend>
            <p>
              <strong>English</strong> : {data.cv.english}
            </p>
            <p>
              <strong>Chinese</strong> : {data.cv.chinese}
            </p>
            <p>
              <strong>Japanese</strong> : {data.cv.japanese}
            </p>
            <p>
              <strong>Korean</strong> : {data.cv.korean}
            </p>
          </fieldset>
        </div>
      </div>
      <div className="bg-slate-900 p-4 mx-auto w-4/5 rounded-xl my-4">
        <h2 className="text-white text-center font-nova-square font-bold text-3xl underline">Ascend Material</h2>
        <AscendComponent template="Character" ascend="ascend1" data={data} />
        <AscendComponent template="Character" ascend="ascend2" data={data} />
        <AscendComponent template="Character" ascend="ascend3" data={data} />
        <AscendComponent template="Character" ascend="ascend4" data={data} />
        <AscendComponent template="Character" ascend="ascend5" data={data} />
        <AscendComponent template="Character" ascend="ascend6" data={data} />
      </div>

      <PostComponent components="Talent" />

      <PostComponent components="Constellations" />
    </div>
  );
}
