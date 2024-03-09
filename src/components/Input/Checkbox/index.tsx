// TODO: CheckBox Component and create its documentation

export default function Checkbox({ forId, label, variant, ...props }: Components.Input.CheckboxProps) {
  return (
    <>
      <label htmlFor={forId} className="text-white font-bold font-poppins my-auto">
        <input type="checkbox" id={forId} className="mx-2" {...props} />
        {label}
      </label>
    </>
  );
}
