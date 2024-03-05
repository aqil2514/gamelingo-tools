import AdminData from "@/components/Admin/Data";
import { getUser } from "@/utils/api";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type SearchParamsProps = AccountRoutes | EvertaleRoutes;

interface AccountRoutes {
  field: "account";
  subfield: "userslogin" | "password_purify" | "verifcode";
}

interface EvertaleRoutes {
  field: "evertale";
  subfield: "chars" | "leaderskills" | "weapons";
}

const fieldTitle: Record<string, string> = {
  account: "Account",
  evertale: "Evertale",
  "genshin-impact": "Genshin Impact",
};

const subFieldTitle: Record<string, string> = {
  userslogin: "User",
  password_purify: "Password Purify",
  verificationcode: "Verification Code",
  chars: "Characters",
  leaderskills: "Leader Skills",
  weapons: "Weapons",
  passives: "Passive Skills",
  typeskills: "Type Skills",
  Material: "Material",
  Artifact: "Artifact",
  Weapon: "Weapon",
  Character: "Character",
};

export function generateMetadata({ searchParams }: { searchParams: SearchParamsProps }): Metadata {
  return {
    title: `${fieldTitle[searchParams.field]} : ${subFieldTitle[searchParams.subfield]}`,
  };
}

export default async function Data({ searchParams }: { searchParams: SearchParamsProps }) {
  const user = await getUser();

  if (!user) redirect("/");

  return (
    <div className="py-20">
      <h1 className="font-nova-square text-white font-bold text-center text-5xl capitalize">
        {fieldTitle[searchParams.field]} : {subFieldTitle[searchParams.subfield]}
      </h1>
      <AdminData field={searchParams.field} subfield={searchParams.subfield} user={user} />
    </div>
  );
}
