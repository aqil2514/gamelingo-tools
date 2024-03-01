"use client";

import Error from "@/components/general/Error";
import Loading from "@/components/general/Loading";
import { Route } from "next";
import useSWR from "swr";
import UserData from "./UserData";
import VerificationCode from "./VerificationCode";
import PasswordPurify from "./PasswordPurify";
import { authorizationToken, fetcherWithAuth } from "@/components/general/Data";

export default function AccountData({ subfield, field }: { subfield: string; field: string }) {
  const url: Route = `/api/admin?field=${field}&subfield=${subfield}`;
  const res = useSWR(url, (url) => fetcherWithAuth(url, authorizationToken));

  const { data, isLoading, error } = res;
  if (!data || isLoading) return <Loading loading={1} textOn />;

  // SOON : Buat pagination

  if (error) return <Error />;

  if (subfield === "userslogin") return <UserData data={data.data as Account.AdminUserOutput[]} />;
  else if (subfield === "password_purify") return <PasswordPurify data={data.data as Account.PasswordPurify[]} />;
  else if (subfield === "verificationcode") return <VerificationCode data={data.data as Account.VerifCode[]} />;
}
