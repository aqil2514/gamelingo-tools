import GenshinCharacterEdit from "./Genshin/Character";
import GenshinTalentEdit from "./Genshin/Talent";

interface EditPageProps {
  searchParams: {
    game: General.AdminQuery["field"];
    category: General.AdminQuery["subfield"];
  };
}

export default function EditPage({ searchParams }: EditPageProps) {
  const { game, category } = searchParams;
  if (game === "genshin-impact") {
    if (category === "Character") return <GenshinCharacterEdit searchParams={searchParams} />;
    else if(category === "Talent") return <GenshinTalentEdit searchParams={searchParams} />
  }

  return (
    <p className="text-center my-4 font-bold text-white">
      Halaman {category} belum dibuat
    </p>
  );
}
