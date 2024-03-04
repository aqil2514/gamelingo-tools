/**
 *
 * EDIT MENU
 *
 */

import { useEffect, useState } from "react";
import { useMenuContextData } from "../../Providers/Admin/ContextProvider";
import axios, { isAxiosError } from "axios";
import { Route } from "next";
import { notif } from "@/utils/fe";
import Loading from "@/components/general/Loading";
import { Input, VariantClass as InputClass } from "@/components/general/Input";
import Button, { VariantClass } from "@/components/general/Button";
import { allowedRole } from "@/components/general/Data";
import { ContextSelectFieldProps } from "./interface";
import { getDate } from "./utils";
import Image from "next/image";
import ArtifactContentForm from "@/components/Write/Content/Genshin/Artifact/Form";

export default function EditMenu({ field, subfield }: ContextSelectFieldProps) {
  if (field === "account") {
    if (subfield === "userslogin") return <UserEdit />;
    else if (subfield === "verificationcode") return <CodeEdit />;
  }
  if (field === "genshin-impact") {
    if (subfield === "Material") return <GIMaterialEdit />;
    if (subfield === "Artifact") return <GIArtifactEdit />;
  }
}

// <<<<< User Account Edit Menu >>>>>

const UserEdit = () => {
  const [data, setData] = useState<Account.AdminUserOutput>({} as Account.AdminUserOutput);
  const { router, contextMenu, setIsLoading, setEditMenu, isLoading } = useMenuContextData();
  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/users?userId=${contextMenu.target?.getAttribute("data-id")}&db=supabase`;
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

      notif(res.data.msg, { color: "green", refElement: "buttons", location: "before" });
      setTimeout(() => {
        setEditMenu(false);
        router.refresh();
      }, 3000);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) {
          notif(error.response.data.msg, { color: "red", refElement: "buttons", location: "before" });
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

          <input type="checkbox" disabled={isDisabled} name="password-exist" id="password-exist" defaultChecked={data.passwordExist} />
          <label htmlFor="password-exist" className="text-white font-bold font-poppins mx-4">
            Password Exist
          </label>

          <input type="checkbox" disabled={isDisabled} name="account-verified" id="account-verified" defaultChecked={data.account_verified} />
          <label htmlFor="account-verified" className="text-white font-bold font-poppins mx-4">
            Account Verified
          </label>

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
};

const CodeEdit = () => {
  const [data, setData] = useState<Account.VerifCode>({} as Account.VerifCode);
  const [date, setDate] = useState<string>("");
  const { contextMenu, setIsLoading, setEditMenu, isLoading } = useMenuContextData();
  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/users/verify?uniqueId=${contextMenu.target?.getAttribute("data-id")}`;
      axios(url).then((res) => setData(res.data.data));
    }

    if (Object.keys(data).length !== 0) {
      const { year, month, day, hour, minutes } = getDate(data.createdat as string);

      setDate(`${year}-${month}-${day}T${hour}:${minutes}`);
    }
  }, [contextMenu, data]);

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const oldEmail = formData.get("oldEmail");
    const oldCode = formData.get("oldCode");
    const email = formData.get("email");
    const code = formData.get("code");
    const getPutType = (code: FormDataEntryValue | null, oldCode: FormDataEntryValue | null, email: FormDataEntryValue | null, oldEmail: FormDataEntryValue | null): "code" | "email" | undefined => {
      if (oldCode !== code) return "code";
      else if (oldEmail !== email) return "email";
    };

    try {
      setIsLoading(true);
      const res = await axios.put("/api/users/verify" as Route, {
        UID: data.uid,
        oldEmail,
        email,
        putType: getPutType(code, oldCode, email, oldEmail),
      });

      notif(res.data.msg, { color: "green", refElement: "buttons", location: "before" });
      setTimeout(() => {
        setEditMenu(false);
        window.location.reload();
      }, 3000);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) {
          notif(error.response.data.msg, { color: "red", refElement: "buttons", location: "before" });
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
          <input type="hidden" name="uid" defaultValue={data.uid} />
          <input type="hidden" name="oldEmail" defaultValue={data.email} />
          <input type="hidden" name="oldCode" defaultValue={data.code} />

          <Input variant={InputClass.dashboard} forId="userId" disabled label="Code Id" defaultValue={data.uid} />

          <Input variant={InputClass.dashboard} forId="email" name="email" disabled={isDisabled} label="Code for email" defaultValue={data.email} />

          <Input variant={InputClass.dashboard} disabled={isDisabled} name="code" forId="code" label="Verification Code" defaultValue={data.code} />

          <Input variant={InputClass.dashboard} type="datetime-local" disabled={isDisabled} defaultValue={date} name="createdat" forId="createdat" label="Dibuat pada" />

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
};

// TODO : User password reset beloman

// <<<<< Genshin Impact Edit Menu >>>>>
const GIMaterialEdit = () => {
  const [data, setData] = useState<GenshinImpact.Material>({} as GenshinImpact.Material);
  const [date, setDate] = useState<string>("");
  const { contextMenu, setIsLoading, setEditMenu, isLoading, searchParams } = useMenuContextData();
  const langParams = searchParams.get("lang");
  const lang = contextMenu.target?.getAttribute("data-lang");
  const id = contextMenu.target?.getAttribute("data-id");
  const [previewLink, setPreviewLink] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/gamelingo/genshin-impact?_id=${id}&category=Material&lang=${lang}`;
      axios(url).then((res) => setData(res.data.data));
    }

    if (Object.keys(data).length !== 0) {
      const { year, month, day, hour, minutes } = getDate(data.createdAt as string);

      setDate(`${year}-${month}-${day}T${hour}:${minutes}`);
    }
  }, [contextMenu, data, id, lang]);

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const _id = formData.get("id") as string;

    try {
      setIsLoading(true);
      const res = await axios.putForm("/api/gamelingo/genshin-impact" as Route, formData, {
        headers: { "Data-Category": "Material", "Old-Id": _id, "Content-Lang": langParams },
      });

      notif(res.data.msg, { color: "green", refElement: "buttons", location: "before" });
      console.log(res);
      setTimeout(() => {
        setEditMenu(false);
        window.location.reload();
      }, 3000);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) {
          notif(error.response.data.msg, { color: "red", refElement: "buttons", location: "before" });
        }
        if (error.response?.status === 400) {
          notif(error.response.data.msg, { color: "red", refElement: "buttons", location: "before" });
        }
        if (error.response?.status === 401) {
          notif(error.response.data.msg, { color: "red", refElement: "buttons", location: "before" });
        }
      }
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement;

    if (!target.files || (target.files && target.files.length === 0)) {
      target.value = "";
      setFileName("");
      setPreviewLink("");

      return;
    }

    const image = target.files[0];
    const urlSrc = URL.createObjectURL(image);

    setFileName(image.name);
    setPreviewLink(urlSrc);
  }

  const isDisabled = isLoading;

  return (
    <div className="w-1/2 max-h-[450px] overflow-y-scroll scrollbar-style absolute top-36 left-[35%] bg-zinc-700 rounded-xl border-2 border-white p-4">
      <h1 id="test" className="text-white text-center font-bold font-poppins">
        Edit Material
      </h1>
      {Object.keys(data).length === 0 ? (
        <Loading loading={1} textOn text="Mengambil data material..." />
      ) : (
        <form method="post" onSubmit={submitHandler}>
          <input type="hidden" name="id" defaultValue={data._id} />

          <div>
            <label
              className="relative m-auto border border-dashed group border-white rounded-md min-h-[128px] min-w-[128px] max-h-[210px] max-w-[210px] flex justify-center items-center transition duration-200 cursor-pointer hover:border-zinc-500 overflow-hidden"
              htmlFor="input-image"
            >
              <input type="file" name="image" id="input-image" className="hidden" onChange={changeHandler} />
              {/* Apakah gambar datanya ada di database ? */}
              {data.image ? (
                // Jika ada, tampilkan data tersebut dalam komponen Image
                <Image src={data.image} fill sizes="auto" alt={data.name + " Image"} className="w-auto group-hover:scale-125 transition duration-500" />
              ) : // Jika tidak ada, cek dulu apakah gambarnya sudah disetting melalui input?
              fileName && previewLink ? (
                // Jika sudah disetting melalui input, tampilkan gambar tersebut dengan komponen Image
                <Image src={previewLink} width={64} height={64} alt={fileName + " Image"} className="w-auto group-hover:scale-125 transition duration-500" />
              ) : (
                // Jika belum disetting melalui input, tampilkan gambar blum disetting
                <span className="transition duration-200 group-hover:text-zinc-500 text-white font-bold"> No Image</span>
              )}
            </label>
          </div>

          <Input variant={InputClass.dashboard} forId="id" disabled label="Material Id" defaultValue={data._id} />

          <Input variant={InputClass.dashboard} forId="material-name" name="name" disabled={isDisabled} label="Material Name" defaultValue={data.name} />

          <Input variant={InputClass.dashboard} forId="material-type" name="typeMaterial" disabled={isDisabled} label="Material Type" defaultValue={data.typeMaterial} />

          <Input variant={InputClass.dashboard} forId="material-rarity" name="rarity" disabled={isDisabled} label="Material Rarity" defaultValue={data.rarity} />

          <Input variant={InputClass.dashboard} forId="gainedFrom" name="gainedFrom" disabled={isDisabled} label="Gained From" defaultValue={typeof data.gainedFrom === "object" ? data.gainedFrom.join(", ") : data.gainedFrom} />

          <div>
            <label htmlFor="material-lore" className="text-white font-bold">
              Material Lore :
            </label>
            <textarea disabled={isLoading} className="w-full h-[100px] block  my-4 rounded-xl p-4 text-zinc-950 text-base font-bold font-poppins" name="lore" defaultValue={data.lore} id="material-lore"></textarea>
          </div>

          <Input variant={InputClass.dashboard} type="datetime-local" disabled defaultValue={date} name="createdat" forId="createdat" label="Dibuat pada" />

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
};

const GIArtifactEdit = () => {
  const [data, setData] = useState<GenshinImpact.Artifact>({} as GenshinImpact.Artifact);
  const [date, setDate] = useState<string>("");
  const { contextMenu, setIsLoading, setEditMenu, isLoading, searchParams } = useMenuContextData();
  const langParams = searchParams.get("lang");
  const lang = contextMenu.target?.getAttribute("data-lang");
  const id = contextMenu.target?.getAttribute("data-id");

  // TODO: Akalin ini nanti ajah

  useEffect(() => {
    if (contextMenu.target) {
      const url: Route = `/api/gamelingo/genshin-impact?_id=${id}&category=Artifact&lang=${lang}`;
      axios(url).then((res) => setData(res.data.data));
    }

    if (Object.keys(data).length !== 0) {
      const { year, month, day, hour, minutes } = getDate(data.createdAt as string);

      setDate(`${year}-${month}-${day}T${hour}:${minutes}`);
    }
  }, [contextMenu, data, id, lang]);

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const _id = formData.get("id") as string;

    try {
      setIsLoading(true);
      const res = await axios.putForm("/api/gamelingo/genshin-impact" as Route, formData, {
        headers: { "Data-Category": "Artifact", "Old-Id": _id, "Content-Lang": langParams },
      });

      notif(res.data.msg, { color: "green", refElement: "buttons", location: "before" });
      console.log(res);
      setTimeout(() => {
        setEditMenu(false);
        window.location.reload();
      }, 3000);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) {
          notif(error.response.data.msg, { color: "red", refElement: "buttons", location: "before" });
        }
        if (error.response?.status === 400) {
          notif(error.response.data.msg, { color: "red", refElement: "buttons", location: "before" });
        }
        if (error.response?.status === 401) {
          notif(error.response.data.msg, { color: "red", refElement: "buttons", location: "before" });
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
      <h1 id="test" className="text-white text-center font-bold font-poppins">
        Edit Artifact
      </h1>

      <ArtifactContentForm template="Edit" data={data} isDisabled={isDisabled} submitHandler={submitHandler} />
    </div>
  );
};
