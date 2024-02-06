import React from "react";
import { useDashboardData } from "..";
import { StateActionKind } from "../reducer";
import axios, { isAxiosError } from "axios";
import { notif } from "@/utils/fe";
import { useRouter } from "next/navigation";

interface VerifState {
  code: string;
  isSending: boolean;
  isResending: boolean;
}

export default function Buttons({ verif, setVerif }: { verif: VerifState; setVerif: React.Dispatch<React.SetStateAction<VerifState>> }) {
  const { state, dispatch } = useDashboardData();
  const router = useRouter();

  async function resendHandler() {
    try {
      setVerif({ ...verif, isResending: true });

      const res = await axios.put("/api/users/verify", {
        putType: "code",
        email: state.data.email,
      });

      notif(res.data.msg, "green", "verif-code-buttons", "before");
    } catch (error) {
      if (isAxiosError(error)) {
        notif("Terjadi kesalahan", "red", "verif-code-buttons", "before");
        console.error(error);
      }
    } finally {
      setVerif({ ...verif, isResending: false });
    }
  }

  async function sendHandler() {
    try {
      setVerif({ ...verif, isSending: true });

      const res = await axios.post("/api/users/verify", {
        code: verif.code,
        newEmail: state.data.email,
        email: state.initialData.email,
        action: "change-email",
      });

      notif(res.data.msg, "green", "verif-code-buttons", "before");
      setTimeout(() => {
        dispatch({ type: StateActionKind.HIDE_POPUP_EMAIL });
        router.refresh();
      }, 3000);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) {
          notif(error.response?.data.msg, "red", "verif-code-buttons", "before");
        }
      }
      console.error(error);
    } finally {
      setVerif({ ...verif, isSending: false });
    }
  }

  const disabledIn = verif.isResending || verif.isSending;
  return (
    <div id="verif-code-buttons" className="w-full my-4 flex justify-center">
      <button disabled={disabledIn} className="hover:bg-blue-500 disabled:bg-blue-500 bg-blue-600 px-6 py-2 block font-poppins my-4 mx-2 font-bold text-black text-base rounded-xl" onClick={resendHandler}>
        {verif.isResending ? "Mengirim Ulang..." : "Kirim ulang"}
      </button>
      <button
        disabled={disabledIn}
        className="hover:bg-red-500 disabled:bg-red-500 bg-red-600 px-6 py-2 block font-poppins my-4 mx-2 font-bold text-black text-base rounded-xl"
        onClick={() => dispatch({ type: StateActionKind.HIDE_POPUP_EMAIL })}
      >
        Batalkan aksi
      </button>
      <button disabled={disabledIn} className="hover:bg-green-500 disabled:bg-green-500 bg-green-600 px-6 py-2 block font-poppins my-4 mx-2 font-bold text-black text-base rounded-xl" onClick={sendHandler}>
        Konfirmasi
      </button>
    </div>
  );
}
