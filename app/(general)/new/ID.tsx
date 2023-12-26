export default function IndonesianSection() {
  return (
    <>
      <h1 className="text-center text-white font-merienda font-bold text-lg md:text-xl">Tentang Situs</h1>
      <div className="my-4 flex flex-col justify-between content-between bg-slate-800 w-full min-h-[350px] px-4 py-4 rounded-xl">
        <article className="font-poppins text-white text-justify my-4 px-8 text-base">
          <h2 className="font-semibold text-lg font-merienda my-4">25 Desember 2023</h2>
          <ol>
            <li className="list-disc">Penyesuaian Data Karakter</li>
            <li className="list-disc">Penanganan Kecepatan Insight</li>
            <li className="list-disc">Zoom pada Gambar</li>
            <li className="list-disc">Pilihan Bahasa CharProfile</li>
            <li className="list-disc">Pilihan Bahasa CharIntro</li>
            <li className="list-disc">Pilihan Bahasa CharActiveSkill</li>
            <li className="list-disc">Pilihan Bahasa CharPassiveSkill</li>
            <li className="list-disc">Penyesuaian UI CharStatus</li>
            <li className="list-disc">Perbaikan Fitur Pencarian</li>
          </ol>

          <h2 className="font-semibold text-lg font-merienda my-4">26 Desember 2023</h2>
          <ol>
            <li className="list-disc">Perbaikan Bug Pencarian</li>
            <li className="list-disc">Perbaikan Bug Ikon Elemental Storm</li>
            <li className="list-disc">Halaman Tentang</li>
            <li className="list-disc">Halaman Apa yang Baru</li>
          </ol>
        </article>
      </div>
    </>
  );
}
