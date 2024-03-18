export default function Select({
  forId,
  data,
  template = "default-variant-1",
  ...props
}: Components.Input.SelectProps<string>) {
  if (!forId) throw new Error("forId props wajib diisi");

  if (template === "default-variant-1")
    return <DefaultSelect forId={forId} data={data} {...props} />;
}

function DefaultSelect<T>({
  forId,
  data,
  defaultChoice,
  ...props
}: Components.Input.SelectProps<string>) {
  return (
    <>
      <select id={forId} {...props} className="bg-zinc-800 rounded-xl h-8 font-poppins text-white font-bold px-4">
        <option value={undefined}>{defaultChoice}</option>
        {data.map((d) => (
        <option key={d.value} value={d.value}>{d.label}</option>
        ))}
      </select>
    </>
  );
}
