"use client";
import axios, { isAxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { INITIAL_STATE, StateActionKind, reducer } from "./reducer";
import { baseUrl } from "@/components/general/Data";

export default function Verification({ initData }: { initData: Account.VerifCode }) {
  const [state, dispatch] = React.useReducer(reducer, INITIAL_STATE);
  const buttonRef = React.useRef<null | HTMLButtonElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  useEffect(() => {
    if (code) {
      (document.getElementById("code") as HTMLInputElement).value = code;
    }
  }, [code]);

  async function resendHandler() {
    try {
      dispatch({ type: StateActionKind.RESENDING_START });

      const { data } = await axios.put("/api/users/verify", {
        UID: initData.uid,
        email: initData.email,
        putType: "code",
      });

      const pElement = document.createElement("p");
      pElement.innerHTML = data.msg;
      pElement.classList.add("text-blue-300");
      pElement.classList.add("font-bold");
      pElement.classList.add("text-center");

      buttonRef.current?.before(pElement);

      router.refresh();
      setTimeout(() => {
        pElement.remove();
      }, 3000);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch({ type: StateActionKind.RESENDING_END });
    }
  }

  async function changeEmailHandler() {
    try {
      dispatch({ type: StateActionKind.CHANGING_START });

      const newEmail = (document.getElementById("email") as HTMLInputElement).value;

      const allow = confirm(`Yakin ingin ganti email jadi ${newEmail} ?`);
      if (!allow) {
        return;
      }

      const { data } = await axios.put("/api/users/verify", {
        putType: "email",
        UID: initData.uid,
        email: newEmail,
        oldEmail: initData?.email,
      });

      alert(data.msg);
      dispatch({ type: StateActionKind.NON_CHANGE_MODE });
      router.refresh();
    } catch (error) {
    } finally {
      dispatch({ type: StateActionKind.CHANGING_END });
    }
  }

  async function clickHandler() {
    try {
      // CHECK: Fix ini. Halaman tidak beralih ketika verifcode berhasil
      dispatch({ type: StateActionKind.LOADING_START });

      const res = await axios.post("/api/users/verify", {
        code: (document.getElementById("code") as HTMLInputElement).value,
        email: initData.email,
        action: "verify-account",
      });

      const pElement = document.createElement("p");
      pElement.innerHTML = res.data.msg;
      pElement.classList.add("text-green-500");
      pElement.classList.add("font-bold");

      buttonRef.current!.before(pElement);

      setTimeout(() => {
        pElement.remove();
        window.location.replace(new URL("/login", baseUrl).href);
      }, 3000);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) {
          const pElement = document.createElement("p");
          pElement.innerHTML = error.response.data.msg;
          pElement.classList.add("text-red-500");
          pElement.classList.add("font-bold");

          buttonRef.current!.before(pElement);

          setTimeout(() => {
            pElement.remove();
          }, 3000);
        }
        console.error(error);
      }
    } finally {
      dispatch({ type: StateActionKind.LOADING_END });
    }
  }

  return (
    <div className="sm:w-1/3 w-4/5 mx-auto my-4 rounded-lg bg-[rgba(0,0,0,0.4)] p-4">
      <label htmlFor="email" className="text-white text-base font-bold font-poppins my-8 py-10">
        Email :
        <input
          type="email"
          disabled={!state.changeMode || state.isChanging || state.isLoading || state.isResending}
          name="email"
          id="email"
          defaultValue={initData.email}
          className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
          required
        />
      </label>
      <label htmlFor="code" className="text-white text-base font-bold font-poppins my-8 py-10">
        <input
          name="name"
          disabled={state.isLoading || state.isResending || state.isChanging}
          id="code"
          minLength={6}
          maxLength={6}
          placeholder="Masukkan Kode Verifikasi..."
          className="block w-full py-2 rounded-lg px-2 text-zinc-950 my-2"
          required
        />
      </label>
      <div className="my-2 flex">
        <button disabled={state.isLoading || state.isResending || state.isChanging} className="bg-slate-200 hover:bg-slate-100 rounded text-sm font-semibold px-2 mr-2" onClick={resendHandler}>
          {state.isResending ? "Resending..." : "Resend"}
        </button>
        {!state.changeMode && (
          <button disabled={state.isLoading || state.isResending || state.isChanging} onClick={() => dispatch({ type: StateActionKind.CHANGE_MODE })} className="bg-slate-200 hover:bg-slate-100 rounded text-sm font-semibold px-2 ml-2">
            Change Email
          </button>
        )}
        {state.changeMode && (
          <button disabled={state.isLoading || state.isResending || state.isChanging} onClick={changeEmailHandler} className="bg-green-600 hover:bg-green-500 disabled:bg-green-500 rounded text-sm font-semibold px-2 ml-2">
            {state.isChanging ? "Changing..." : "Change"}
          </button>
        )}
        {state.changeMode && (
          <button
            disabled={state.isLoading || state.isResending || state.isChanging}
            onClick={() => dispatch({ type: StateActionKind.NON_CHANGE_MODE })}
            className="bg-red-600 hover:bg-red-500 disabled:bg-red-500 rounded text-sm font-semibold px-2 ml-2"
          >
            Cancel
          </button>
        )}
      </div>
      <button
        ref={buttonRef}
        type="button"
        className="bg-rose-950 disabled:text-black disabled:bg-slate-50 px-6 py-2 block mx-auto font-poppins my-4 font-bold text-white text-xl rounded-xl"
        disabled={state.isLoading || state.isResending || state.isChanging}
        onClick={clickHandler}
      >
        {state.isLoading ? "Sedang Verifikasi..." : "Verifikasi"}
      </button>
    </div>
  );
}
