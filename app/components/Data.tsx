import Link from "next/link";

export default function Data() {
  return (
    <div className="flex justify-center w-full pt-10">
      {datas.map((data) => (
        <Link key={data.id} href={data.path} className="mx-5 h-0">
          <button className="bg-orange-600 rounded px-2 py-1 font-merriweather text-white hover:bg-orange-500 hover:text-black">{data.name}</button>
        </Link>
      ))}
    </div>
  );
}

const datas = [
  {
    id: "data-01",
    name: "GameLingo",
    path: "/gamelingo",
  },
  {
    id: "data-02",
    name: "MelodiMix",
    path: "/melodimix",
  },
];

const dataGameLingo = [
  {
    id: "dgl-et",
    name: "Evertale",
    path: "/gamelingo/evertale",
  },
];

const dataEvertale = [
  {
    id: "de-char",
    name: "Character",
    path: "/gamelingo/evertale/characters",
    pathAdmin: "/admin/gamelingo/evertale/characters",
  },
  {
    id: "de-conjures",
    name: "Conjure",
    path: "/gamelingo/evertale/conjures",
    pathAdmin: "/admin/gamelingo/evertale/conjures",
  },
];

export { dataGameLingo, dataEvertale };
