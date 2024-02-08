import Link from "next/link";

export default function WeaponsData({
  data,
}: {
  data: Evertale.Weapon.State[];
}) {
  return (
    <div className="px-4">
      <table className="border-2 border-white text-white mx-auto my-4 w-full">
        <thead>
          <tr>
            <th className="font-bold capitalize border-2 border-white">#</th>
            <th className="font-bold capitalize border-2 border-white">id</th>
            <th className="font-bold capitalize border-2 border-white">
              weapon name
            </th>
            <th className="font-bold capitalize border-2 border-white">action</th>
          </tr>
        </thead>
        {data.length === 0 ? (
          <tbody>
            <tr>
              <td colSpan={4} className="text-center border-2 border-white">
                No Data
              </td>
            </tr>
          </tbody>
        ) : (
          <tbody>
            {data.map((d, i: number) => (
              <tr key={`${d._id}`}>
                <td className="text-center border-2 border-white">{i + 1}</td>
                <td className="text-center border-2 border-white">{d._id}</td>
                <td className="text-center border-2 border-white">{d.weapName}</td>
                <td className="text-center border-2 border-white py-2">
                  <Link href={`/evertale/weapons/${d._id}`}>
                    <button className="bg-green-700 hover:bg-green-600 px-2 rounded font-bold text-white">
                      Lihat
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
