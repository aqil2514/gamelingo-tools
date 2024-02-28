import ContextProvider from "../ContextMenu/ContextProvider";
import PasswordPurifyData from "./Data";

export default function PasswordPurify({ data }: { data: Account.PasswordPurify[] }) {
  return (
    <ContextProvider>
      <PasswordPurifyData data={data} />
    </ContextProvider>
  );
}
