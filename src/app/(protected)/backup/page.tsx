import BackupComponents from "@/components/Backup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Backup Area",
};

export default function Backup() {
  return (
    <div className="main-wrapper py-20">
      <h1 className="text-white font-bold font-poppins text-2xl text-center">BackUp Area</h1>
      <BackupComponents />
    </div>
  );
}
