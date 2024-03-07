import type { Route } from "next";

/**
 *
 * General Data
 *
 */

// Fetcher for useSWR
export const fetcher = (...args: Parameters<typeof fetch>) => fetch(...args).then((res) => res.json());
export const fetcherWithAuth = async (url: string, token: string) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};

/**
 *
 * Home Section Data
 *
 */

interface homeIconsType {
  id: string;
  name: string;
  imgLoc: string;
  url: Route;
}

export const homeIcon: homeIconsType[] = [
  {
    id: "hi-genshin-impact",
    name: "Genshin Impact",
    imgLoc: "/icon/genshin-impact.jpg",
    url: "/genshin-impact",
  },
  {
    id: "hi-evertale",
    name: "Evertale",
    imgLoc: "/icon/evertale.jpg",
    url: "/evertale",
  },
  {
    id: "hi-mlbb",
    name: "Mobile Legends",
    imgLoc: "/icon/mlbb.jpg",
    url: "/mlbb",
  },
];

export const baseUrl = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://gamelingo-tools.vercel.app";

/**
 *
 * Admin Section Data
 *
 */

// <<<<< Interface >>>>>
interface AccountLink {
  label: string;
  subfield: General.AdminQueryUser["subfield"];
}

interface EvertaleLink {
  label: string;
  subfield: General.AdminQueryGameEvertale["subfield"];
}

interface GenshinLink {
  label: string;
  subfield: General.AdminQueryGameGenshin["subfield"];
}

// <<<<< Export Variabel >>>>>
export const adminId = "bf9abc1d-c04b-4dcf-9484-9ff5c099e3c5";
export const authorizationToken = process.env.AUTHORIZATIONTOKEN as string;
export const allowedRole = ["General Admin", "Admin", "Admin of Genshin Impact", "Admin of Evertale", "Moderator", "User"];

// Dipakai pada src\components\Layout\Admin\NavMenu\AccountLink.tsx
// subfield_AL = Subfield Account Link Data
export const subField_AL: AccountLink[] = [
  {
    label: "User",
    subfield: "userslogin",
  },
  {
    label: "Password Purify",
    subfield: "password_purify",
  },
  {
    label: "Verification Code",
    subfield: "verificationcode",
  },
];

// Dipakai pada src\components\Layout\Admin\NavMenu\EvertaleLink.tsx
// subfield_EL = Subfield Evertale Link Data

export const subfield_EL: EvertaleLink[] = [
  {
    label: "Characters",
    subfield: "chars",
  },
  {
    label: "Leader Skills",
    subfield: "leaderskills",
  },
  {
    label: "Passive Skills",
    subfield: "passives",
  },
  {
    label: "Type Skills",
    subfield: "typeskills",
  },
  {
    label: "Weapons",
    subfield: "weapons",
  },
];

// Dipakai pada src\components\Layout\Admin\NavMenu\GenshinLink.tsx
// subfield_GIL = Subfield Genshin Impact Link Data

export const subfield_GIL: GenshinLink[] = [
  {
    label: "Artifact",
    subfield: "Artifact",
  },
  {
    label: "Characters",
    subfield: "Character",
  },
  {
    label: "Constellations",
    subfield: "Constellations",
  },
  {
    label: "Material",
    subfield: "Material",
  },
  {
    label: "Talent",
    subfield: "Talent",
  },
  {
    label: "Weapon",
    subfield: "Weapon",
  },
];
