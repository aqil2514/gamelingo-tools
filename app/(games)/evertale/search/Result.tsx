import Image from "next/image";
import Link from "next/link";

type DataState = {
  id: string;
  name: string;
  image: string;
};

export default function Result({ data, s, loading }: { data: DataState[]; s: string | null; loading: Boolean }) {
  return loading ? (
    <></>
  ) : data?.length !== 0 ? (
    <div className="mx-10 my-8">
      <h1 className="font-poppins font-semibold text-base lg:text-2xl text-center text-white">
        Ditemukan {data?.length} data dengan keyword pencarian "{s}"{" "}
      </h1>
      <div className="my-8 flex flex-row justify-center flex-wrap w-full">
        {data?.map((d: DataState) => (
          <Link href={`/evertale/chars/${d?.id}`}>
            <figure className="mx-4 my-4 flex flex-col justify-between content-between bg-slate-800 min-w-[240px] max-w-[240px] min-h-[350px] px-4 py-4 rounded-xl">
              <Image src={d?.image} width={240} height={240} alt={d?.name} className="rounded-xl h-[312px] object-cover" />
              <figcaption className="text-white font-poppins text-sm lg:text-base mt-4">{d?.name}</figcaption>
            </figure>
          </Link>
        ))}
      </div>
    </div>
  ) : (
    <div className="mx-10 my-8">
      <h1 className="font-poppins font-semibold text-base lg:text-2xl text-white">Data tidak ditemukan</h1>
    </div>
  );
}
