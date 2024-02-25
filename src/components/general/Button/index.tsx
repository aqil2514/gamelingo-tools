import clsx from "clsx";
import React from "react";

export enum VariantClass {
  submit = "block px-4 py-2 bg-green-700 mt-4 rounded-lg hover:bg-green-600 disabled:bg-green-600 text-white font-bold",
  fetch = "block px-4 py-2 bg-blue-700 mt-4 rounded-lg hover:bg-blue-600 disabled:bg-blue-600 text-white font-bold",
  danger = "block px-4 py-2 bg-red-700 mt-4 rounded-lg hover:bg-red-600 disabled:bg-red-600 text-white font-bold",
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
