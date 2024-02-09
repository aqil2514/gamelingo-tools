import WriteData from "@/components/Write";
import SelectSubTemplate from "@/components/Write/SelectSubTemplate";
import SelectTemplate from "@/components/Write/SelectTemplate";
import { Metadata } from "next";
import { PencilSquare } from "react-bootstrap-icons";

export const metadata: Metadata = {
  title: "Write Data",
};

export default function Write() {
  return (
    <div className="main-wrapper p-20">
      <div className="flex flex-row justify-start gap-4">
        <PencilSquare className="text-2xl text-white" />
        <h1 className="font-bold text-white font-mclaren">Write Data</h1>
      </div>
      <div className="my-4 flex flex-row gap-4">
        <SelectTemplate />
        <SelectSubTemplate />
      </div>
      <WriteData />
    </div>
  );
}
