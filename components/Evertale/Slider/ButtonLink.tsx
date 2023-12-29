import Link from "next/link";

const ButtonLink = ({ linkHref }: { linkHref: string }) => {
  return (
    <Link href={linkHref}>
      <button className="block mx-auto text-center font-mclaren text-slate-200 bg-yellow-600 px-4 py-2">Lihat lebih banyak &rarr;</button>
    </Link>
  );
};

export default ButtonLink;
