import { Metadata } from "next";

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
};

const subFieldTitle: Record<string, string> = {
  userslogin: "User",
  password_purify: "Password Purify",
  verifcode: "Verification Code",
  chars: "Characters",
  leaderskills: "Leader Skills",
  weapons: "Weapons",
};

export function generateMetadata({ searchParams }: { searchParams: SearchParamsProps }): Metadata {
  return {
    title: `${fieldTitle[searchParams.field]} : ${subFieldTitle[searchParams.subfield]}`,
  };
}

export default function AdminData({ searchParams }: { searchParams: SearchParamsProps }) {
  return (
    <div className="py-20">
      <h1 className="font-nova-square text-white font-bold text-center text-5xl capitalize">
        {fieldTitle[searchParams.field]} : {subFieldTitle[searchParams.subfield]}
      </h1>
    </div>
  );
}
