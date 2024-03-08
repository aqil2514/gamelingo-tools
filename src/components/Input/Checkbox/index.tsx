// TODO: CheckBox Component and create its documentation

export default function Checkbox({ forId, label, variant, ...props }: Components.Input.CheckboxProps) {
  return (
    <div className="block">
      <label htmlFor="is-conjured-char" className="text-white font-bold font-poppins my-auto">
        <input type="checkbox" id="is-conjured-char" className="mx-2" {...props} />
        Conjured
      </label>
    </div>
  );
}
