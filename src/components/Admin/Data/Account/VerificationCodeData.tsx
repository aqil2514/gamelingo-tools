export default function VerificationCodeData({data}:{data:Account.VerifCode[]}){
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
                  code
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
                    <td className="text-center border-2 border-white">{d.code}</td>
                  </tr>
                ))}
              </tbody>
            )}
          </table>
        </div>
      );
}