import axios, { isAxiosError } from "axios";
import { useDashboardData } from ".";
import { StateActionKind } from "./reducer";
import React from "react";
import { useRouter } from "next/navigation";

export default function Buttons() {
  const { state, dispatch } = useDashboardData();
  const router = useRouter();

  async function editingHandler() {
    try {
      dispatch({ type: StateActionKind.IS_EDITING_START });

      const res = await axios.put("/api/users/dashboard", {
        data: state.data,
        oldData: state.initialData,
      });

      if (res.data.popupEmail) {
        dispatch({ type: StateActionKind.SHOW_POPUP_EMAIL });
        return;
      }

      const divElement = document.getElementById("confirm-buttons") as HTMLDivElement;
      const pElement = document.createElement("p");

      pElement.innerHTML = res.data.msg;
      pElement.classList.add("text-green-500");
      pElement.classList.add("font-bold");

      divElement.before(pElement);
      setTimeout(() => {
        pElement.remove();
        router.refresh();
      }, 3000);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) {
          const divElement = document.getElementById("confirm-buttons") as HTMLDivElement;
          const pElement = document.createElement("p");

          pElement.innerHTML = error.response.data.msg;
          pElement.classList.add("text-red-500");
          pElement.classList.add("font-bold");

          divElement.before(pElement);
          setTimeout(() => {
            pElement.remove();
          }, 3000);
        }
        console.log(error);
      }
    } finally {
      dispatch({ type: StateActionKind.IS_EDITING_END });
    }
  }

  React.useEffect(() => {
    const dataCollection = Object.keys(state.data);

    for (const data of dataCollection) {
      if (state.data[data as keyof Account.User] !== state.initialData[data as keyof Account.User]) {
        dispatch({ type: StateActionKind.DATA_CHANGE });
        return;
      }
    }

    dispatch({ type: StateActionKind.NO_DATA_CHANGE });
  }, [state.initialData, state.data, dispatch]);

  return (
    <div id="confirm-buttons" className="my-2 flex md:flex-row flex-col justify-center flex-wrap">
      <button
        className="hover:bg-slate-300 disabled:bg-slate-300 bg-slate-400 px-6 py-2 block font-poppins my-4 mx-2 font-bold text-black text-base rounded-xl"
        onClick={() => dispatch({ type: StateActionKind.TOGGLE_EDIT_MODE })}
        disabled={state.isEditing}
      >
        {state.editMode ? "Batal Edit" : "Edit Data"}
      </button>
      {state.editMode && (
        <button
          id="confirmation-button"
          onClick={editingHandler}
          disabled={state.isEditing || !state.isChanged}
          className="hover:bg-green-400 disabled:bg-green-50 bg-green-800 px-6 py-2 block font-poppins my-4 mx-2 font-bold text-white hover:text-black disabled:text-black text-base rounded-xl"
        >
          {state.isEditing ? "Editing..." : "Konfirmasi"}
        </button>
      )}
    </div>
  );
}
