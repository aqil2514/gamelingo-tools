export default function EnglishSection() {
  return (
    <>
      <h1 className="text-center text-white font-merienda font-bold text-lg md:text-xl">About the Site</h1>
      <div className="my-4 flex flex-col justify-between content-between bg-slate-800 w-full min-h-[350px] px-4 py-4 rounded-xl">
        <article className="font-poppins text-white text-justify my-4 px-8 text-base">
          <h2 className="font-semibold text-lg font-merienda my-4">December 25, 2023</h2>
          <ol>
            <li className="list-disc">Character Data Adjustment</li>
            <li className="list-disc">Speed Insight Handling</li>
            <li className="list-disc">Zoom in Image</li>
            <li className="list-disc">Option Language CharProfile</li>
            <li className="list-disc">Option Language CharIntro</li>
            <li className="list-disc">Option Language CharActiveSkill</li>
            <li className="list-disc">Option Language CharPassiveSkill</li>
            <li className="list-disc">Adjustment UI CharStatus</li>
            <li className="list-disc">Search Feature Fixed</li>
          </ol>

          <h2 className="font-semibold text-lg font-merienda my-4">December 26, 2023</h2>
          <ol>
            <li className="list-disc">Search Bug Fixed</li>
            <li className="list-disc">Element Storm Icon Bug Fixed</li>
            <li className="list-disc">About Page</li>
            <li className="list-disc">What is New Page</li>
          </ol>
        </article>
      </div>
    </>
  );
}
