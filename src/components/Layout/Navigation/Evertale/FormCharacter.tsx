"use client";
import { useEffect, useRef, useState } from "react";
import { NONACTIVE_NAV_LIST } from "..";
import { ChevronDoubleLeft, ChevronDoubleRight } from "react-bootstrap-icons";

export default function EvertaleFormCharacterNavigation() {
    const navRef = useRef<HTMLDivElement|null>(null);
    const [navActive, setNavActive] = useState<boolean>(true);
  
    useEffect(() =>{
      if(!navRef.current) return;
      const clickHandler = (e:Event) => {
        const target = e.target as HTMLElement;
  
        if(target.id) return setNavActive(false)
  
      }
  
      window.addEventListener("click", clickHandler);
  
      return () => {
        window.removeEventListener("click", clickHandler)
      }
    }, [navRef])
  
    function clickHandler(e:React.MouseEvent<HTMLParagraphElement>){
      const target = e.target as HTMLParagraphElement;
      const targetDivId = target.innerHTML.toLowerCase().split(" ").join("-");
      const div = document.getElementById(targetDivId) as HTMLDivElement | null;
  
      if(!div)return;
      const offsetY = div.offsetTop;
      window.scrollTo({
        behavior:"smooth",
        top: offsetY - 100
      }) 
    }
  
    return (
      <div ref={navRef} className={`min-h-full bg-zinc-800 fixed transition duration-200 left-0 top-0 ${navActive ? `translate-x-0` : `translate-x-[-100%]`} min-w-[200px] p-4 text-center flex flex-col justify-center items-center`}>
        <p className={NONACTIVE_NAV_LIST} onClick={clickHandler}>Character Status</p>
        <p className={NONACTIVE_NAV_LIST} onClick={clickHandler}>Character Image</p>
        <p className={NONACTIVE_NAV_LIST} onClick={clickHandler}>Character Intro</p>
        <p className={NONACTIVE_NAV_LIST} onClick={clickHandler}>Character Profile</p>
        <p className={NONACTIVE_NAV_LIST} onClick={clickHandler}>Character Active Skill</p>
        <p className={NONACTIVE_NAV_LIST} onClick={clickHandler}>Character Passive Skill</p>
        {!navActive && <ChevronDoubleRight className="bi bi-chevron-double-right absolute right-[-32px] top-[45%] bg-zinc-800 text-white text-[2rem] rounded-[0_1rem_1rem_0] cursor-pointer hover:bg-white hover:text-zinc-800 transition-all duration-200" onClick={() => setNavActive(true)} />}
        {navActive && <ChevronDoubleLeft className="bi bi-chevron-double-right absolute right-[-32px] top-[45%] bg-zinc-800 text-white text-[2rem] rounded-[0_1rem_1rem_0] cursor-pointer hover:bg-white hover:text-zinc-800 transition-all duration-200" onClick={() => setNavActive(false)} />}
      </div>
    );
  }
  