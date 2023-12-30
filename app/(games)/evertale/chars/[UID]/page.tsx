import { DIV_MAIN_STYLE } from "@/app/components/Styles";
import Post from "@/components/Evertale/Post";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Info Character",
};
export default function Character({ params }: any) {
  const { UID } = params;

  return (
    <div className={DIV_MAIN_STYLE + " py-20"}>
      <Post type="chars" UID={UID} />
    </div>
  );
}
