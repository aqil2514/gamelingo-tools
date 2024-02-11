import clsx from "clsx";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  forId: string;
  label: string;
  labelMarginY?:string;
  variant: VariantClass;
}

export enum VariantClass {
  dashboard = "block w-full py-2 rounded-lg px-2 text-zinc-950 text-base font-bold font-poppins my-2",
}

export function Input({ forId, label, variant, className, labelMarginY="8", ...props }: InputProps) {
  return (
    <label htmlFor={forId} className={`text-white text-base font-bold font-poppins my-${labelMarginY}`}>
      {label} :
      <input type="text" id={forId} className={clsx(variant, className)} {...props} />
    </label>
  );
}
