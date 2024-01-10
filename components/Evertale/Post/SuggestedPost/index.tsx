"use client";

const SuggestedPost = ({ grid, children }: { grid: number; children: React.ReactNode }) => {
  if (grid === 2) return <div className={`w-full flex flex-col md:flex-row justify-between gap-4 px-4 mt-8`}>{children}</div>;
  return <div className={`w-full grid grid-rows-${grid} grid-cols-1 md:grid-rows-1 md:grid-cols-${grid} gap-4 px-4 mt-8`}>{children}</div>;
};

export default SuggestedPost;
