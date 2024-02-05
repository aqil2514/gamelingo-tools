import { useDashboardData } from "..";
import { StateActionKind } from "../reducer";

export default function Buttons() {
  const { dispatch } = useDashboardData();

  async function resendHandler() {
    alert("Resend Code Handler");
  }

  async function sendHandler() {
    alert("Send Code Handler");
  }
  return (
    <div className="w-full my-4 flex justify-center">
      <button className="hover:bg-blue-500 disabled:bg-blue-500 bg-blue-600 px-6 py-2 block font-poppins my-4 mx-2 font-bold text-black text-base rounded-xl" onClick={resendHandler}>
        Kirim ulang
      </button>
      <button className="hover:bg-red-500 disabled:bg-red-500 bg-red-600 px-6 py-2 block font-poppins my-4 mx-2 font-bold text-black text-base rounded-xl" onClick={() => dispatch({ type: StateActionKind.HIDE_POPUP_EMAIL })}>
        Batalkan aksi
      </button>
      <button className="hover:bg-green-500 disabled:bg-green-500 bg-green-600 px-6 py-2 block font-poppins my-4 mx-2 font-bold text-black text-base rounded-xl" onClick={sendHandler}>
        Konfirmasi
      </button>
    </div>
  );
}
