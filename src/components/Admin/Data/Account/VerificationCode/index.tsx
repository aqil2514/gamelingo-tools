import ContextProvider from "../../../../Providers/Admin/ContextProvider";
import CodeData from "./CodeData";

export default function VerificationCode({ data }: { data: Account.VerifCode[] }) {
  return (
    <ContextProvider>
      <CodeData data={data} />
    </ContextProvider>
  );
}
