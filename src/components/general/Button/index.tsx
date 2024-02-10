import clsx from "clsx";
import React from "react";

export enum VariantClass {
  submit = "block px-4 py-2 bg-green-700 mt-4 hover:bg-green-600 disabled:bg-green-600 text-white",
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button {...props} className={clsx(VariantClass, className)}>
      {children}
    </button>
  );
}
