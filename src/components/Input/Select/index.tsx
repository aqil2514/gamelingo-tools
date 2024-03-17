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
  ...props
}: Components.Input.SelectProps<string>) {
  return (
    <>
      <select id={forId} {...props}>
        {data.map((d) => (
        <option key={d.value} value={d.value}>{d.label}</option>
        ))}
      </select>
    </>
  );
}
