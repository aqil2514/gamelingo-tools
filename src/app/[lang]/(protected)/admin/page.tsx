import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Page",
};

export default async function Admin() {
  return (
    <div className="py-20">
      <h1 className="font-nova-square text-white font-bold text-center text-5xl">Admin Page</h1>
    </div>
  );
}
