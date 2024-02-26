import { notif } from "@/utils/fe";
import { ContextMenuState } from "../UserData";
import { Route } from "next";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Input, VariantClass as InputClass } from "@/components/general/Input";
import Button, { VariantClass } from "@/components/general/Button";
import Loading from "@/components/general/Loading";
import { allowedRole } from "@/components/general/Data";

interface ContextMenuProps {
  contextMenu: ContextMenuState;
  setEditMenu: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  data: Account.AdminUserOutput[];
}

export default function ContextMenu({ contextMenu, setEditMenu, setIsLoading, data }: ContextMenuProps) {
  const router = useRouter();
  async function copyHandler() {
    if (contextMenu.target) {
      await navigator.clipboard.writeText(contextMenu.target?.innerText);
      notif("Berhasil copy data", "green", "table-user-data", "before");
    }
  }

  async function deleteHandler() {
    const id = contextMenu.target?.getAttribute("data-id");
    const username = data.find((d) => d.id === id)?.username;
    // TODO: Validasi backend ajah
    if (username === "aqil2514") return notif("Tidak dapat menghapus diri anda sendiri", "red", "table-user-data", "before");
    const allow = confirm(`Yakin ingin hapus user dengan username ${username}?`);
    if (!allow) return notif("Aksi dibatalkan", "green", "table-user-data", "before");
    const url: Route = "/api/users";
    try {
      setIsLoading(true);

      const res = await axios.delete(url, {
        data: {
          id,
        },
      });

      notif(res.data.msg, "green", "table-user-data", "before");
      router.refresh();
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div style={{ top: contextMenu.y + "px", left: contextMenu.x + "px" }} className="absolute z-50 bg-slate-700 rounded-xl min-h-[50px] min-w-[100px] p-4">
      <ul>
        <li className="text-white rounded-md transition duration-200 font-semibold text-base font-mclaren px-2 hover:bg-white hover:text-black cursor-pointer my-2" onClick={copyHandler}>
          Copy Content
        </li>
        <li className="text-white rounded-md transition duration-200 font-semibold text-base font-mclaren px-2 hover:bg-white hover:text-black cursor-pointer my-2" onClick={deleteHandler}>
          Delete Data
        </li>
        <li className="text-white rounded-md transition duration-200 font-semibold text-base font-mclaren px-2 hover:bg-white hover:text-black cursor-pointer my-2" onClick={() => setEditMenu(true)}>
          Edit Data
        </li>
      </ul>
    </div>
  );
}

/**
 *
 * EDIT MENU
 *
 */

export function EditMenu({ contextMenu, setEditMenu }: { contextMenu: ContextMenuState; setEditMenu: React.Dispatch<React.SetStateAction<boolean>> }) {
  const [data, setData] = useState<Account.AdminUserOutput>({} as Account.AdminUserOutput);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/users?userId=${contextMenu.target?.getAttribute("data-id")}`;
      axios(url).then((res) => setData(res.data.data));
    }
  }, [contextMenu]);

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      setIsLoading(true);
      const res = await axios.putForm("/api/admin/user", formData);

      console.info(res);

      notif(res.data.msg, "green", "buttons", "before");
      setTimeout(() => {
        setEditMenu(false);
        router.refresh();
      }, 3000);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) {
          notif(error.response.data.msg, "red", "buttons", "before");
        }
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const isDisabled = isLoading;

  return (
    <div className="w-1/2 max-h-[450px] overflow-y-scroll scrollbar-style absolute top-36 left-[35%] bg-zinc-700 rounded-xl border-2 border-white p-4">
      {Object.keys(data).length === 0 ? (
        <Loading loading={1} textOn text="Mengambil data user..." />
      ) : (
        <form method="post" onSubmit={submitHandler}>
          <input type="hidden" name="user-id" defaultValue={data.id} />

          <input type="hidden" name="oauth-id" defaultValue={data.oauthid} />

          <Input variant={InputClass.dashboard} forId="userId" disabled label="User Id" defaultValue={data.id} />

          <Input variant={InputClass.dashboard} forId="oauthId" disabled label="Oauth Id" defaultValue={data.oauthid} />

          <Input variant={InputClass.dashboard} disabled={isDisabled} name="name" forId="username" label="Name" defaultValue={data.name} />

          <Input variant={InputClass.dashboard} disabled={isDisabled} name="username" forId="username" label="Username" defaultValue={data.username} />

          <Input variant={InputClass.dashboard} disabled={isDisabled} name="email" forId="email" label="Email" defaultValue={data.email} />

          <Input variant={InputClass.dashboard} disabled={isDisabled} name="role" forId="role" label="Role" defaultValue={data.role} list="data-role-user" />

          <Input variant={InputClass.dashboard} disabled={isDisabled} name="image" forId="image" label="Image" defaultValue={data.image} />

          <Input
            variant={InputClass.dashboard}
            name="created-at"
            forId="createdat"
            disabled
            label="Created"
            defaultValue={new Date(data.createdat)?.toLocaleDateString("id-ID", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
          />

          <label htmlFor="password-exist" className="text-white font-bold font-poppins mx-4">
            Password Exist
          </label>
          <input type="checkbox" disabled={isDisabled} name="password-exist" id="password-exist" defaultChecked={data.passwordExist} />

          <label htmlFor="account-verified" className="text-white font-bold font-poppins mx-4">
            Account Verified
          </label>
          <input type="checkbox" disabled={isDisabled} name="account-verified" id="account-verified" defaultChecked={data.account_verified} />

          <div id="buttons" className="flex justify-center gap-4">
            <Button type="button" disabled={isDisabled} className={VariantClass.danger} onClick={() => setEditMenu(false)}>
              Batal
            </Button>
            <Button className={VariantClass.submit} disabled={isDisabled}>
              {isDisabled ? "Submitting..." : "Submit"}
            </Button>
          </div>

          <datalist id="data-role-user">
            {allowedRole.map((role) => (
              <option key={role} value={role} />
            ))}
          </datalist>
        </form>
      )}
    </div>
  );
}
