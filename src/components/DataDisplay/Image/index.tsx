import Image from "next/image";

type ImageComponent = Components.DisplayData.Image.ImageElement;
type ImageDefault = Components.DisplayData.Image.Default;

/**
 * Komponen untuk menampilkan gambar dengan variasi tampilan.
 * @param {Object} props - Properti untuk komponen DisplayImage.
 * @param {string} props.template - Jenis tampilan yang dipilih.
 * @param {string} props.src - URL gambar.
 * @param {string} props.alt - Teks alternatif gambar.
 *
 * @see ./README.md
 */
export default function DisplayImage({ template, src, alt }: ImageComponent) {
  if (template === "variant1") return <Variant1 src={src} alt={alt} />;
}

/**
 * Komponen untuk menampilkan gambar dengan variasi tampilan pertama.
 * @param {Object} props - Properti untuk komponen Variant1.
 * @param {string} props.src - URL gambar.
 * @param {string} props.alt - Teks alternatif gambar.
 * @returns {JSX.Element} - Element React untuk menampilkan gambar.
 */
function Variant1({ src, alt }: ImageDefault): JSX.Element {
  return (
    <div className="relative m-auto border border-dashed group border-white rounded-md min-h-[128px] min-w-[128px] max-h-[210px] max-w-[210px] flex justify-center items-center transition duration-200 cursor-pointer hover:border-zinc-500 overflow-hidden">
      {src ? (
        <Image src={src} fill sizes="auto" alt={alt + " Image"} className="w-auto group-hover:scale-125 transition duration-500" />
      ) : (
        <span className="transition duration-200 group-hover:text-zinc-500 text-white font-bold"> No Image</span>
      )}
    </div>
  );
}
