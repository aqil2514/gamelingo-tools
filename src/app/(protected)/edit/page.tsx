import WriteData from "@/components/Content/Write/Misc";
import SelectSubTemplate from "@/components/Content/Misc/SelectSubTemplate";
import SelectTemplate from "@/components/Content/Misc/SelectTemplate";
import { Metadata } from "next";
import { PencilSquare } from "react-bootstrap-icons";
import EditPage from "@/components/Content/Edit";

export const metadata: Metadata = {
  title: "Edit Data",
};

export default function Edit({searchParams}:any) {
  return (
    <div className="main-wrapper p-20">
      <div className="flex flex-row justify-start gap-4">
        <PencilSquare className="text-2xl text-white" />
        <h1 className="font-bold text-white font-mclaren">Edit Data</h1>
      </div>
      <div className="my-4 flex flex-row gap-4">
        <SelectTemplate template="edit"/>
        <SelectSubTemplate template="edit" />
      </div>
      <EditPage searchParams={searchParams}/>
    </div>
  );
}
