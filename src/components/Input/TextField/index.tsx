import React from "react";
import TextFieldProvider, { useTextFieldContext } from "./TextFieldProvider";

type InputProps = Components.Input.InputProps<HTMLInputElement> & { ref?: React.Ref<HTMLInputElement> };

export enum VariantClass {
  dashboard = "block w-full py-2 rounded-lg px-2 text-zinc-950 text-base font-bold font-poppins my-2",
}

/** Buat inpput text baru */
export default function TextField({ variant, forId, label, ...props }: InputProps) {
  if (!variant) variant = "default-variant-1";
  // if(variant === "default-variant-1") return <DefaultInput forId={forId} label={label} />
  return (
    <TextFieldProvider forId={forId} label={label} variant={variant} {...props}>
      {variant === "default-variant-1" && <DefaultInput />}
      {variant === "hidden" && <HiddenInput />}
    </TextFieldProvider>
  );
}

/** variant === default-variant-1 */
function DefaultInput() {
  const { props } = useTextFieldContext();
  const { forId, label, type = "text" } = props;

  if (type !== "email" && type !== "text" && type !== "password") throw new Error("Hanya input type email, text, dan password saja yang diizinkan");

  return (
    <label htmlFor={forId} className={`text-white text-base font-bold font-poppins`}>
      {label} :
      <input type={type} id={forId} className="block w-full py-2 rounded-lg px-2 text-zinc-950 text-base font-bold font-poppins my-2" {...props} />
    </label>
  );
}

/** variant === hidden */
function HiddenInput() {
  const { props } = useTextFieldContext();
  return <input type="hidden" {...props} />;
}
