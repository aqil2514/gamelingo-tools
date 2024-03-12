import React from "react";
import TextFieldProvider, { useTextFieldContext } from "./TextFieldProvider";
import { cn } from "@/lib/utils";

type InputProps = Components.Input.InputProps<HTMLInputElement> & { ref?: React.Ref<HTMLInputElement> };

/** Buat input text baru */
export default function TextField({ variant, forId, label, ...props }: InputProps) {
  if (!variant) variant = "default-variant-1";
  return (
    <TextFieldProvider forId={forId} label={label} variant={variant} {...props}>
      {variant === "default-variant-1" && <DefaultInput />}
      {variant === "outline-variant-1" && <OutlineVariant1 />}
      {variant === "skeleton-variant-1" && <SkeletonVariant1 />}
      {variant === "hidden" && <HiddenInput />}
    </TextFieldProvider>
  );
}

/** variant === default-variant-1 */
function DefaultInput() {
  const { forId, label, type = "text", ...rest } = useTextFieldContext().props;

  if (type !== "email" && type !== "text" && type !== "password") throw new Error("Hanya input type email, text, dan password saja yang diizinkan");

  return (
    <label htmlFor={forId} className={`text-white text-base font-bold font-poppins`}>
      {label} :
      <input type={type} id={forId} className="block w-full py-2 rounded-lg px-2 text-zinc-950 text-base font-bold font-poppins my-2" {...rest} />
    </label>
  );
}

/** variant === outline-variant-1 */
function OutlineVariant1() {
  const { forId, label, type = "text", ...rest } = useTextFieldContext().props;

  if (type !== "email" && type !== "text" && type !== "password") throw new Error("Hanya input type email, text, dan password saja yang diizinkan");

  return (
    <label htmlFor={forId} className={`text-white text-base  font-bold font-poppins`}>
      {label} :
      <input type={type} id={forId} className={cn("block bg-transparent w-full py-2 px-2 text-white border-b-2 focus-visible:outline-none border-white text-base font-bold font-poppins my-2")} onFocus={focusHandler} {...rest} />
    </label>
  );
}

/** variant === skeleton-variant-1 */
function SkeletonVariant1() {
  const { forId, label, type = "text", ...rest } = useTextFieldContext().props;

  if (type !== "email" && type !== "text" && type !== "password") throw new Error("Hanya input type email, text, dan password saja yang diizinkan");

  return (
    <label htmlFor={forId} className={`text-slate-700 animate-pulse text-base bg-slate-700 font-bold font-poppins`}>
      {label} :
      <input type={type} disabled id={forId} className="block w-full py-2 rounded-lg px-2 text-zinc-950 bg-slate-700 text-base font-bold font-poppins my-2" {...rest} />
    </label>
  );
}

/** variant === hidden */
function HiddenInput() {
  const { ...rest } = useTextFieldContext().props;

  rest.forId= undefined;

  return <input type="hidden" {...rest} />;
}

// Soon: Lanjutin ini
function focusHandler(e: React.FocusEvent<HTMLInputElement>) {
  const target = e.target as HTMLInputElement;
  const dataList = target.getAttribute("data-list");
  if (dataList === "none" || !dataList) return;

  const list = JSON.parse(dataList);
  target.after(list);
}
