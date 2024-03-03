import { notif } from "@/utils/fe";
import { Route } from "next";
import axios, { isAxiosError } from "axios";
import { adminId } from "@/components/general/Data";
import { useMenuContextData } from "./ContextProvider";
import { ContextSelectFieldProps } from "./interface";
import { LI_Style } from "../Resources";

/**
 *
 * Context Menu
 *
 */

export default function ContextMenu({ field, subfield, passData }: ContextSelectFieldProps) {
  if (field === "account") {
    if (subfield === "userslogin") return <UserContextMenu data={passData} />;
    else if (subfield === "verificationcode") return <CodeContextMenu data={passData} />;
    else if (subfield === "password_purify") return <PasswordPurifyContextMenu data={passData} />;
  } else if (field === "genshin-impact") {
    if (subfield === "Material") return <GIMaterialContextMenu data={passData} />;
  }
}

// <<<<< User Context Menu Section >>>>>

const UserContextMenu = ({ data }: { data: Account.AdminUserOutput[] }) => {
  const { contextMenu, setIsDeleting, router, setDetailMenu, setEditMenu } = useMenuContextData();
  async function copyHandler() {
    if (contextMenu.target) {
      await navigator.clipboard.writeText(contextMenu.target?.innerText);
      notif("Berhasil copy data", { color: "green", refElement: "table-user-data", location: "before" });
    }
  }

  async function deleteHandler() {
    const id = contextMenu.target?.getAttribute("data-id");
    const username = data.find((d) => d.id === id)?.username;
    if (id === adminId) return notif("Tidak dapat menghapus diri anda sendiri", { color: "red", refElement: "table-user-data", location: "before" });
    const allow = confirm(`Yakin ingin hapus user dengan username ${username}?`);
    if (!allow) return notif("Aksi dibatalkan", { color: "green", refElement: "table-user-data", location: "before" });
    const url: Route = "/api/users";
    try {
      setIsDeleting(true);

      const res = await axios.delete(url, {
        data: {
          id,
        },
      });

      notif(res.data.msg, { color: "green", refElement: "table-user-data", location: "before" });
      router.refresh();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) notif(error.response.data.msg, { color: "red", refElement: "table-user-data", location: "before" });
      }
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div style={{ top: contextMenu.y + "px", left: contextMenu.x + "px" }} className="absolute z-50 bg-slate-700 rounded-xl min-h-[50px] min-w-[100px] p-4">
      <ul>
        <li className={LI_Style.style1} onClick={() => setDetailMenu(true)}>
          Details
        </li>
        <li className={LI_Style.style1} onClick={copyHandler}>
          Copy Content
        </li>
        <li className={LI_Style.style1} onClick={deleteHandler}>
          Delete Data
        </li>
        <li className={LI_Style.style1} onClick={() => setEditMenu(true)}>
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
      notif("Berhasil copy data", { color: "green", refElement: "table-code-data", location: "before" });
    }
  }

  async function deleteHandler() {
    const id = contextMenu.target?.getAttribute("data-id");
    const email = data.find((d) => d.uid === id)?.email;

    const allow = confirm(`Yakin ingin hapus user dengan verification code untuk alamat email ${email}?`);
    if (!allow) return notif("Aksi dibatalkan", { color: "green", refElement: "table-code-data", location: "before" });
    const url: Route = "/api/users/verify";
    try {
      setIsDeleting(true);

      const res = await axios.delete(url, {
        data: {
          id,
        },
      });

      notif(res.data.msg, { color: "green", refElement: "table-code-data", location: "before" });
      router.refresh();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) notif(error.response.data.msg, { color: "red", refElement: "table-code-data", location: "before" });
      }
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }
  return (
    <div style={{ top: contextMenu.y + "px", left: contextMenu.x + "px" }} className="absolute z-50 bg-slate-700 rounded-xl min-h-[50px] min-w-[100px] p-4">
      <ul>
        <li className={LI_Style.style1} onClick={() => setDetailMenu(true)}>
          Details
        </li>
        <li className={LI_Style.style1} onClick={copyHandler}>
          Copy Content
        </li>
        <li className={LI_Style.style1} onClick={deleteHandler}>
          Delete Data
        </li>
        <li className={LI_Style.style1} onClick={() => setEditMenu(true)}>
          Edit Data
        </li>
      </ul>
    </div>
  );
};

const PasswordPurifyContextMenu = ({ data }: { data: Account.PasswordPurify[] }) => {
  const { contextMenu, setIsDeleting, router, setDetailMenu } = useMenuContextData();

  async function copyHandler() {
    if (contextMenu.target) {
      await navigator.clipboard.writeText(contextMenu.target?.innerText);
      notif("Berhasil copy data", { color: "green", refElement: "table-code-data", location: "before" });
    }
  }

  async function deleteHandler() {
    const id = contextMenu.target?.getAttribute("data-id");
    const email = data.find((d) => d.uid === id)?.email;

    const allow = confirm(`Yakin ingin hapus user dengan verification code untuk alamat email ${email}?`);
    if (!allow) return notif("Aksi dibatalkan", { color: "green", refElement: "table-code-data", location: "before" });
    const url: Route = "/api/users/reset-password";
    try {
      setIsDeleting(true);

      const res = await axios.delete(url, {
        data: {
          id,
        },
      });

      notif(res.data.msg, { color: "green", refElement: "table-code-data", location: "before" });
      router.refresh();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) notif(error.response.data.msg, { color: "red", refElement: "table-code-data", location: "before" });
      }
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }
  return (
    <div style={{ top: contextMenu.y + "px", left: contextMenu.x + "px" }} className="absolute z-50 bg-slate-700 rounded-xl min-h-[50px] min-w-[100px] p-4">
      <ul>
        <li className={LI_Style.style1} onClick={() => setDetailMenu(true)}>
          Details
        </li>
        <li className={LI_Style.style1} onClick={copyHandler}>
          Copy Content
        </li>
        <li className={LI_Style.style1} onClick={deleteHandler}>
          Delete Data
        </li>
      </ul>
    </div>
  );
};

// <<<<< Genhsin Impact Context Menu Section >>>>>

const GIMaterialContextMenu = ({ data }: { data: GenshinImpact.Material[] }) => {
  const { contextMenu, setIsDeleting, router, setDetailMenu, setEditMenu } = useMenuContextData();
  async function copyHandler() {
    if (contextMenu.target) {
      await navigator.clipboard.writeText(contextMenu.target?.innerText);
      notif("Berhasil copy data", { color: "green", refElement: "table-user-data", location: "before" });
    }
  }

  async function deleteHandler() {
    const id = contextMenu.target?.getAttribute("data-id");
    const lang = contextMenu.target?.getAttribute("data-lang");
    const name = data.find((d) => d._id === id)?.name;

    const allow = confirm(`Yakin ingin hapus data material dengan nama ${name}?`);
    if (!allow) return notif("Aksi dibatalkan", { color: "green", refElement: "table-material-data", location: "before" });
    const url = "/api/gamelingo/genshin-impact";
    try {
      setIsDeleting(true);

      const res = await axios.delete(url, {
        headers: {
          "DB-Content": "Material",
          "Content-Lang": lang,
        },
        data: {
          id,
        },
      });

      notif(res.data.msg, { color: "green", refElement: "table-material-data", location: "before" });
      router.refresh();
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) notif(error.response.data.msg, { color: "red", refElement: "table-material-data", location: "before" });
        else if (error.response?.status === 400) notif(error.response.data.msg, { color: "red", refElement: "table-material-data", location: "before" });
      }
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div style={{ top: contextMenu.y + "px", left: contextMenu.x + "px" }} className="absolute z-50 bg-slate-700 rounded-xl min-h-[50px] min-w-[100px] p-4">
      <ul>
        <li className={LI_Style.style1} onClick={() => setDetailMenu(true)}>
          Details
        </li>
        <li className={LI_Style.style1} onClick={copyHandler}>
          Copy Content
        </li>
        <li className={LI_Style.style1} onClick={deleteHandler}>
          Delete Data
        </li>
        <li className={LI_Style.style1} onClick={() => setEditMenu(true)}>
          Edit Data
        </li>
      </ul>
    </div>
  );
};