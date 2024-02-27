import { notif } from "@/utils/fe";
import { Route } from "next";
import axios, { isAxiosError } from "axios";
import { adminId } from "@/components/general/Data";
import { useMenuContextData } from "./ContextProvider";
import { ContextSelectFieldProps } from "./interface";

/**
 *
 * Context Menu
 *
 */

export default function ContextMenu({ field, subfield, passData }: ContextSelectFieldProps) {
  if (field === "account") {
    if (subfield === "userslogin") return <UserContextMenu data={passData} />;
    else if (subfield === "verificationcode") return <CodeContextMenu data={passData} />;
  }
}

/**
 *
 * Account Field Section
 *
 */

const UserContextMenu = ({ data }: { data: Account.AdminUserOutput[] }) => {
  const { contextMenu, setIsDeleting, router, setDetailMenu, setEditMenu } = useMenuContextData();
  async function copyHandler() {
    if (contextMenu.target) {
      await navigator.clipboard.writeText(contextMenu.target?.innerText);
      notif("Berhasil copy data", "green", "table-user-data", "before");
    }
  }

  async function deleteHandler() {
    const id = contextMenu.target?.getAttribute("data-id");
    const username = data.find((d) => d.id === id)?.username;
    if (id === adminId) return notif("Tidak dapat menghapus diri anda sendiri", "red", "table-user-data", "before");
    const allow = confirm(`Yakin ingin hapus user dengan username ${username}?`);
    if (!allow) return notif("Aksi dibatalkan", "green", "table-user-data", "before");
    const url: Route = "/api/users";
    try {
      setIsDeleting(true);

      const res = await axios.delete(url, {
        data: {
          id,
        },
      });

      notif(res.data.msg, "green", "table-user-data", "before");
      router.refresh();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) notif(error.response.data.msg, "red", "table-user-data", "before");
      }
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div style={{ top: contextMenu.y + "px", left: contextMenu.x + "px" }} className="absolute z-50 bg-slate-700 rounded-xl min-h-[50px] min-w-[100px] p-4">
      <ul>
        <li className="text-white rounded-md transition duration-200 font-semibold text-base font-mclaren px-2 hover:bg-white hover:text-black cursor-pointer my-2" onClick={() => setDetailMenu(true)}>
          Details
        </li>
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
};

const CodeContextMenu = ({ data }: { data: Account.VerifCode[] }) => {
  const { contextMenu, setIsDeleting, router, setDetailMenu, setEditMenu } = useMenuContextData();

  async function copyHandler() {
    if (contextMenu.target) {
      await navigator.clipboard.writeText(contextMenu.target?.innerText);
      notif("Berhasil copy data", "green", "table-code-data", "before");
    }
  }

  async function deleteHandler() {
    const id = contextMenu.target?.getAttribute("data-id");
    const email = data.find((d) => d.uid === id)?.email;

    const allow = confirm(`Yakin ingin hapus user dengan verification code untuk alamat email ${email}?`);
    if (!allow) return notif("Aksi dibatalkan", "green", "table-code-data", "before");
    const url: Route = "/api/users/verify";
    try {
      setIsDeleting(true);

      const res = await axios.delete(url, {
        data: {
          id,
        },
      });

      notif(res.data.msg, "green", "table-code-data", "before");
      router.refresh();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) notif(error.response.data.msg, "red", "table-code-data", "before");
      }
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }
  return (
    <div style={{ top: contextMenu.y + "px", left: contextMenu.x + "px" }} className="absolute z-50 bg-slate-700 rounded-xl min-h-[50px] min-w-[100px] p-4">
      <ul>
        <li className="text-white rounded-md transition duration-200 font-semibold text-base font-mclaren px-2 hover:bg-white hover:text-black cursor-pointer my-2" onClick={() => setDetailMenu(true)}>
          Details
        </li>
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
};
