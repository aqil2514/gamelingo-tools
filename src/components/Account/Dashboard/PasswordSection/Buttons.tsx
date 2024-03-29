import axios from "axios";
import { useDashboardData } from "..";
import { StateActionKind } from "../reducer";
import { notif } from "@/utils/fe";
import { useRouter } from "next/navigation";
import { Route } from "next";

interface PasswordState {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export default function Buttons({ password, data }: { password: PasswordState; data: Account.User }) {
  const { state, dispatch } = useDashboardData();
  const router = useRouter();
  const url: Route = data.passwordExisting ? "/api/users/dashboard" : "/api/users/reset-password";

  const passwordExistData = {
    oldPassword: password.oldPassword,
    newPassword: password.newPassword,
    confirmNewPassword: password.confirmNewPassword,
    username: state.data.username,
    action: "change-password",
  };

  const noPasswordData = {
    password: password.newPassword,
    confirmPassword: password.confirmNewPassword,
    email: data.email,
  };

  const reqData = data.passwordExisting ? passwordExistData : noPasswordData;

  async function clickHandler() {
    try {
      dispatch({ type: StateActionKind.IS_EDITING_START });
      const res = data.passwordExisting ? await axios.post(url, reqData) : await axios.put(url, reqData);

      notif(res.data.msg, { color: "green", refElement: "confirm-password-change", location: "before" });
      setTimeout(() => {
        router.refresh();
      }, 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 422) {
          notif(error.response.data.msg, { color: "red", refElement: "confirm-password-change", location: "before" });
        }
      }
      console.error(error);
    } finally {
      dispatch({ type: StateActionKind.IS_EDITING_END });
    }
  }
  return (
    <div id="confirm-password-change" className="my-2 flex md:flex-row flex-col justify-center flex-wrap">
      <button
        className="hover:bg-yellow-300 disabled:bg-yellow-300 bg-yellow-700 px-6 py-2 block font-poppins my-4 mx-2 font-bold text-white hover:text-black text-base rounded-xl"
        onClick={() => dispatch({ type: StateActionKind.HIDE_PASSWORD_SECTION })}
        disabled={state.isEditing}
      >
        Informasi Akun
      </button>
      <button className="hover:bg-green-300 disabled:bg-green-300 bg-green-700 px-6 py-2 block font-poppins my-4 mx-2 font-bold text-white hover:text-black text-base rounded-xl" disabled={state.isEditing} onClick={clickHandler}>
        {state.isEditing ? "Mengganti Password..." : "Konfirmasi"}
      </button>
    </div>
  );
}
