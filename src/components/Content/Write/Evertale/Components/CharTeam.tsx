interface CharTeamProps {
  template: "Write" | "Edit";
}
export default function CharTeam({ template }: CharTeamProps) {
  if (template === "Write") return <WriteContent />;
}

function WriteContent() {
  return (
    <div className="border-white border rounded-xl p-4">
      <h1 className="font-bold text-white font-poppins">Character Team</h1>
    </div>
  );
}
