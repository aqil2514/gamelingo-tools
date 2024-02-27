/**
 *
 * EDIT MENU
 *
 */

import { useEffect, useState } from "react";
import { useMenuContextData } from "./ContextProvider";
import axios, { isAxiosError } from "axios";
import { Route } from "next";
import { notif } from "@/utils/fe";
import Loading from "@/components/general/Loading";
import { Input, VariantClass as InputClass } from "@/components/general/Input";
import Button, { VariantClass } from "@/components/general/Button";
import { allowedRole } from "@/components/general/Data";
import { ContextSelectFieldProps } from "./interface";

export default function EditMenu({ field, subfield }: ContextSelectFieldProps) {
  if (field === "account") {
    if (subfield === "userslogin") return <UserEdit />;
    // TODO: Atur untuk codeeditnya
  }
}

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
