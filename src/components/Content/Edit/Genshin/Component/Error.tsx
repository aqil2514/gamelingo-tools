export default function ErrorFeching({template}: {template:"Characer"}){
    if(template === "Characer") return <CharacterError />
}

function CharacterError(){
    return (
        <div>
        <p className="text-red-500 font-bold font-nova-square text-center">
          Tidak ada Karakter yang dimaksud
        </p>
        <p className="text-red-500 font-bold font-nova-square text-center">
          Pastikan nama karakter sesuai dengan yang ada di list
        </p>
        <p className="text-red-500 font-bold font-nova-square text-center">
          Perhatikan pula kapital hurufnya. &ldquo;nama character&rdquo; berbeda dengan &ldquo;Nama Character&rdquo;
        </p>
      </div>
    )
}