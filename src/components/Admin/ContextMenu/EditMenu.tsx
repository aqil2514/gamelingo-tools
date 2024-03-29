// <<<<< React Import >>>>>
import { useEffect, useState } from "react";

// <<<<< Next Import >>>>>
import { Route } from "next";

// <<<<< Axios Import >>>>>
import axios, { isAxiosError } from "axios";

// <<<<< Utils Import >>>>>
import { useMenuContextData } from "../../Providers/Admin/ContextProvider";
import { isSubfieldData, notif } from "@/utils/fe";
import { ContextSelectFieldProps } from "./interface";

// <<<<< Local Utils Import >>>>>
import { getDate } from "./utils";

// <<<<< General Components Import >>>>>
import { Input, VariantClass as InputClass } from "@/components/general/Input";
import { allowedRole } from "@/lib/Data";
import Loading from "@/components/general/Loading";
import Button, { VariantClass } from "@/components/Input/Button";

// <<<<< Content Component Import >>>>>
import GIMaterialContentForm from "@/components/Content/Write/Genshin/Material/Form";
import GIArtifactContentForm from "@/components/Content/Write/Genshin/Artifact/Form";
import GIWeaponContentForm from "@/components/Content/Write/Genshin/Weapon/Form";
import GICharacterContentForm from "@/components/Content/Write/Genshin/Character/Form";
import GIConstellationsContentForm from "@/components/Content/Write/Genshin/Constellations/Form";
import GITalentContentForm from "@/components/Content/Write/Genshin/Talent/Form";

export default function EditMenu({ field, subfield }: ContextSelectFieldProps) {
  if (field === "account" && isSubfieldData.account(subfield)) {
    if (subfield === "userslogin") return <UserEdit />;
    else if (subfield === "verificationcode") return <CodeEdit />;
  }
  if (field === "genshin-impact" && isSubfieldData.genshinImpact(subfield)) {
    if (subfield === "Material") return <GIMaterialContentForm template="Edit" />;
    if (subfield === "Artifact") return <GIArtifactContentForm template="Edit" />;
    if (subfield === "Weapon") return <GIWeaponContentForm template="Edit" />;
    if (subfield === "Character") return <GICharacterContentForm template="Edit" />;
    if (subfield === "Constellations") return <GIConstellationsContentForm template="Edit" />;
    if (subfield === "Talent") return <GITalentContentForm template="Edit" />;
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

      notif(res.data.msg, {
        color: "green",
        refElement: "buttons",
        location: "before",
      });
      setTimeout(() => {
        setEditMenu(false);
        router.refresh();
      }, 3000);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) {
          notif(error.response.data.msg, {
            color: "red",
            refElement: "buttons",
            location: "before",
          });
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
            defaultValue={new Date(data.createdat)?.toLocaleDateString("id-ID", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
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

      notif(res.data.msg, {
        color: "green",
        refElement: "buttons",
        location: "before",
      });
      setTimeout(() => {
        setEditMenu(false);
        window.location.reload();
      }, 3000);
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response?.status === 422) {
          notif(error.response.data.msg, {
            color: "red",
            refElement: "buttons",
            location: "before",
          });
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

/** Local Components */
export const EditContextButton = () => {
  const { isLoading, setEditMenu } = useMenuContextData();
  return (
    <div id="buttons" className="flex justify-center gap-4">
      <Button type="button" disabled={isLoading} className={VariantClass.danger} onClick={() => setEditMenu(false)}>
        Batal
      </Button>
      <Button className={VariantClass.submit} disabled={isLoading}>
        {isLoading ? "Submitting..." : "Submit"}
      </Button>
    </div>
  );
};
