import { Link } from "@/navigation";

export default function TypeSkillData({
  data,
}: {
  data: Evertale.Misc.TypeSkill[];
}) {
  return (
    <div className="px-4">
      <table className="border-2 border-white text-white mx-auto my-4 w-full">
        <thead>
          <tr>
            <th className="font-bold capitalize border-2 border-white">#</th>
            <th className="font-bold capitalize border-2 border-white">
              Active Skill
            </th>
            <th className="font-bold capitalize border-2 border-white">
              Passive Skill
            </th>
            <th className="font-bold capitalize border-2 border-white">
              Char Team
            </th>
            <th className="font-bold capitalize border-2 border-white">
              Leader Skill
            </th>
          </tr>
        </thead>
        <tbody>
          {data[0].typeActiveSkill.map((activeSkill, i) => (
            <tr key={i}>
              <td className="text-center border-2 border-white">{i + 1}</td>
              <td className="text-center border-2 border-white">{activeSkill}</td>
              <td className="text-center border-2 border-white">{data[0].typePassiveSkill[i]}</td>
              <td className="text-center border-2 border-white">{data[0].typeCharTeam[i]}</td>
              <td className="text-center border-2 border-white">{data[0].typeLeaderSkill[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
