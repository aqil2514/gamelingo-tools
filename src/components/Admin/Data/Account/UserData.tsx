export default function UserData({data}:{data: Account.AdminUserOutput[]}){

    return(
        <div className="px-4">
        <table className="border-2 border-white text-white mx-auto my-4 w-full">
            <thead>
                <tr>
                <th className="font-bold capitalize border-2 border-white">#</th>
                <th className="font-bold capitalize border-2 border-white">id</th>
                <th className="font-bold capitalize border-2 border-white">name</th>
                <th className="font-bold capitalize border-2 border-white">username</th>
                <th className="font-bold capitalize border-2 border-white">role</th>
                <th className="font-bold capitalize border-2 border-white">action</th>
                </tr>
            </thead>
            <tbody>
                {data.map((d, i:number) => (
                    <tr key={`${d.id}`}>
                        <td className="text-center border-2 border-white">{i + 1}</td>
                        <td className="text-center border-2 border-white">{d.id}</td>
                        <td className="text-center border-2 border-white">{d.name}</td>
                        <td className="text-center border-2 border-white">{d.username}</td>
                        <td className="text-center border-2 border-white">{d.role}</td>
                        <td className="text-center border-2 border-white py-2">
                            <button className="bg-green-700 hover:bg-green-600 px-2 rounded font-bold text-white">Detail</button>
                            </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
    )
}