import { useOnClickOutside } from "@/hooks/use-on-click-outside";
import Image from "next/image";
import React from "react";
import MenuProfile from "./MenuProfile";

export default function SessionNav({ user }: { user: Account.User }) {
  const [isActive, setIsActive] = React.useState<true | false>(false);
  const menu = React.useRef<HTMLDivElement | null>(null);
  useOnClickOutside(menu, () => setIsActive(false));

  function clickHandler() {
    setIsActive(!isActive);
  }
  return (
    <div className="mx-2 sm:mx-6 my-auto">
      <div>
        <Image className="rounded-full cursor-pointer" onClick={clickHandler} quality={50} src={user.image || "https://i.imgur.com/A28Nksb.png"} alt="image-user" height={32} width={32} />
      </div>
      <MenuProfile isActive={isActive} menu={menu} user={user} />
    </div>
  );
}
