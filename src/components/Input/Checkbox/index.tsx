// TODO: CheckBox Component and create its documentation

import CheckboxProvider, { useCheckboxContext } from "./CheckboxProvider";

export default function Checkbox({ variant, ...props }: Components.Input.CheckboxProps) {
  return (
    <CheckboxProvider variant={variant} {...props}>
      {variant === "default-variant-1" && <DefaultCheckbox />}
    </CheckboxProvider>
  );
}

function DefaultCheckbox() {
  const { forId, label, ...rest } = useCheckboxContext().props;
  return (
    <label htmlFor={forId} className="text-white font-bold font-poppins my-auto">
      <input type="checkbox" id={forId} className="mx-2" {...rest} />
      {label}
    </label>
  );
}
