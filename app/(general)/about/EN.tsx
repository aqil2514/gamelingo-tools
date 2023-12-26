import Link from "next/link";

export default function EnglishSection() {
  return (
    <>
      <h1 className="text-center text-white font-merienda font-bold text-lg md:text-xl">About the Site</h1>
      <div className="my-4 flex flex-col justify-between content-between bg-slate-800 w-full min-h-[350px] px-4 py-4 rounded-xl">
        <article className="font-poppins text-white text-justify my-4 px-2 md:px-8 text-base">
          <p>
            <strong>Released On: Sunday, December 17, 2023</strong>
          </p>
          <p>Hello! Welcome to GameLingo Tools - Your Ultimate Resource for Game Information!</p>
          <h1 className="font-semibold text-lg font-merienda my-4">What is GameLingo Tools?</h1>
          <p>
            GameLingo Tools is a website application that stores guides, information, data, and more related to games. Initially, the site originated from a{" "}
            <Link className="underline" href={"https://gamelingo30.blogspot.com/"} target="_blank">
              personal Blogspot
            </Link>
            . Due to feature limitations, the admin decided to create a site utilizing all the knowledge they had.
          </p>
          <h1 className="font-semibold text-lg font-merienda my-4">Built with What Technologies?</h1>
          <p>
            GameLingo Tools is built using Next Js, a React Js framework. The database used is MongoDB and PostgreSQL. For those curious about the source code,{" "}
            <Link href={"https://github.com/aqil2514/gamelingo-tools"} target="_blank" className="underline">
              you can visit it here
            </Link>
          </p>
          <h1 className="font-semibold text-lg font-merienda my-4">What Games are Available?</h1>
          <p>Since it&quot;s still new, there are only a few games available. Currently (26/12/2023), the only available game is Evertale. After completing Evertale, the next games will be Genshin Impact and Mobile Legends.</p>
          <h1 className="font-semibold text-lg font-merienda my-4">Want to Contribute?</h1>
          <p>If you want to contribute, please contact the admin via email at clevergaming68@gmail.com</p>
          <h1 className="font-semibold text-lg font-merienda my-4 text-center">Thank you for reading ^_^. Enjoy exploring the site.</h1>
        </article>
      </div>
    </>
  );
}
