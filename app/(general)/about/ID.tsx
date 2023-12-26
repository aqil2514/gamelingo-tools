import Link from "next/link";

export default function IndonesianSection() {
  return (
    <>
      <h1 className="text-center text-white font-merienda font-bold text-lg md:text-xl">Tentang Situs</h1>
      <div className="my-4 flex flex-col justify-between content-between bg-slate-800 w-full min-h-[350px] px-4 py-4 rounded-xl">
        <article className="font-poppins text-white text-justify my-4 px-8 text-base">
          <p>
            <strong>Rilis Pada : Minggu, 17 Desember 2023</strong>
          </p>
          <p>Halo! Selamat datang di GameLingo Tools - Sumber Daya Utama untuk Informasi Game!</p>
          <h1 className="font-semibold text-lg font-merienda my-4">Apa Itu GameLingo Tools?</h1>
          <p>
            GameLingo Tools adalah sebuah aplikasi situs yang menyimpan panduan, informasi, data, dan lain sebagainya yang berkaitan dengan game. Awalnya, situs ini bermula dari sebuah{" "}
            <Link className="underline" href={"https://gamelingo30.blogspot.com/"} target="_blank">
              Blogspot pribadi
            </Link>
            . Dikarenakan ada keterbatasan fitur, alhasil admin memutuskan untuk membuat situs dengan memanfaatkan segala pengetahuan yang admin punya.
          </p>
          <h1 className="font-semibold text-lg font-merienda my-4">Dengan apa GameLingo dibangun?</h1>
          <p>
            GameLingo Tools dibangun dengan menggunakan teknologi Next Js, sebuah framework React Js. Database yang digunakan adalah MongoDB dan juga PostgreSQL. Bagi yang penasaran dengan Source Codenya,{" "}
            <Link href={"https://github.com/aqil2514/gamelingo-tools"} target="_blank" className="underline">
              bisa kunjungi di sini
            </Link>
          </p>
          <h1 className="font-semibold text-lg font-merienda my-4">Game apa saja yang tersedia?</h1>
          <p>
            Dikarenakan masih baru rilis, tentu masih sedikit game yang tersedia. Untuk saat ini (26/12/2023), game yang tersedia hanya Evertale saja. Setelah game Evertale sudah cukup lengkap, game selanjutnya adalah Genshin Impact dan
            Mobile Legends.
          </p>
          <h1 className="font-semibold text-lg font-merienda my-4">Ingin kontribusi?</h1>
          <p>Jika Anda ingin berkontribusi, silahkan hubungi admin melalui email clevergaming68@gmail.com</p>
          <h1 className="font-semibold text-lg font-merienda my-4">Tertarik ingin donasi?</h1>
          <p>
            Dengan adanya bantuan finansial dari para pengunjung, tentu saja perkembangan web akan semakin signifikan dan semakin cepat. Anda bisa mengirim donasi melalui Dana.
            <ul>
              <li>Dana : 081779174118 (Muhamad Aqil Maulana)</li>
            </ul>
          </p>
          <h1 className="font-semibold text-lg font-merienda my-4 text-center">Terimakasih telah membaca ^_^. Selamat menjelajahi situs.</h1>
        </article>
      </div>
    </>
  );
}
