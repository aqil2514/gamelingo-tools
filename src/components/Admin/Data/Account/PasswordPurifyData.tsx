export default function PasswordPurifyData({
  data,
}: {
  data: Account.PasswordPurify[];
}) {
  return (
    <div className="px-4">
      <table className="border-2 border-white text-white mx-auto my-4 w-full">
        <thead>
          <tr>
            <th className="font-bold capitalize border-2 border-white">#</th>
            <th className="font-bold capitalize border-2 border-white">id</th>
            <th className="font-bold capitalize border-2 border-white">
              email
            </th>
            <th className="font-bold capitalize border-2 border-white">
              craetedat
            </th>
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
              <tr key={`${d.uid}`}>
                <td className="text-center border-2 border-white">{i + 1}</td>
                <td className="text-center border-2 border-white">{d.uid}</td>
                <td className="text-center border-2 border-white">{d.email}</td>
                <td className="text-center border-2 border-white">
                  {d.createdat}
                </td>
                <td className="text-center border-2 border-white py-2">
                  <button className="bg-green-700 hover:bg-green-600 px-2 rounded font-bold text-white">
                    Detail
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        )}
      </table>
    </div>
  );
}
