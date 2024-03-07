import clsx from "clsx";
import React from "react";

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  forId: string;
  label: string;
}

export enum TextareaStyle {
  variant_1 = "w-full h-[100px] block  my-4 rounded-xl p-4 text-zinc-950 text-base font-bold font-poppins",
}

//Edit later

export default function Textarea({ forId, className, label, ...props }: TextareaProps) {
  return (
    <>
      <label htmlFor={forId} className="text-white font-bold">
        {label} :
      </label>
      <textarea className={clsx(TextareaStyle, className)} name="setValue-2" id={forId} {...props}></textarea>
    </>
  );
}
