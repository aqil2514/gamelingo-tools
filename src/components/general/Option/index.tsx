export const OptionLanguage = ({ activeIndex, setActiveIndex }: { activeIndex: number; setActiveIndex: React.ComponentState }) => {
  return (
    <div className="w-full mx-auto">
      <label className={`font-semibold font-merriweather mx-2 my-2 px-4 py-2 rounded-xl text-white transition-all cursor-pointer ${activeIndex === 1 && " bg-white !text-slate-800 !cursor-default"}`} htmlFor="mode-1">
        <input className="hidden" onChange={() => setActiveIndex(1)} value={"cp-mode1"} type="radio" name="language" id="mode-1" />
        EN | ID
      </label>
      <label className={`font-semibold font-merriweather mx-2 my-2 px-4 py-2 rounded-xl text-white transition-all cursor-pointer ${activeIndex === 2 && " bg-white !text-slate-800 !cursor-default"}`} htmlFor="mode-2">
        <input className="hidden" onChange={() => setActiveIndex(2)} value={"cp-mode2"} type="radio" name="language" id="mode-2" />
        EN
      </label>
      <label className={`font-semibold font-merriweather mx-2 my-2 px-4 py-2 rounded-xl text-white transition-all cursor-pointer ${activeIndex === 3 && " bg-white !text-slate-800 !cursor-default"}`} htmlFor="mode-3">
        <input className="hidden" onChange={() => setActiveIndex(3)} value={"cp-mode3"} type="radio" name="language" id="mode-3" />
        ID
      </label>
    </div>
  );
};

export const Option = ({ status, setStatus, value, name, title, variant = 1 }: { status: string; name: string; setStatus: React.ComponentState; value: string; title: string; variant?: number }) => {
  if (variant === 1) return <Option1 status={status} setStatus={setStatus} value={value} name={name} title={title} />;
  if (variant === 2) return <Option2 status={status} setStatus={setStatus} value={value} name={name} title={title} />;
};

const Option1 = ({ status, setStatus, value, name, title }: { status: string; name: string; setStatus: React.ComponentState; value: string; title: string }) => {
  return (
    <label
      className={`font-semibold font-merriweather mx-2 my-2 px-4 py-2 rounded-xl text-[11px] md:text-base lg:text-xl text-white transition-all cursor-pointer ${status === value && " bg-white !text-slate-800 !cursor-default"}`}
      htmlFor={`status-${value}`}
    >
      <input className="hidden" onChange={(e) => setStatus(e.target.value)} value={value} type="radio" name={`option-${name}`} id={`status-${value}`} />
      {title}
    </label>
  );
};

const Option2 = ({ status, setStatus, value, name, title }: { status: string; name: string; setStatus: React.ComponentState; value: string; title: string }) => {
  return (
    <label className="my-2" htmlFor={`status-${value}`}>
      <input onChange={(e) => setStatus(e.target.value)} value={value} checked={value === status} type="radio" name={`option-${name}`} id={`status-${value}`} />
      <span className="capitalize text-white font-semibold mx-2 font-mclaren">{title}</span>
    </label>
  );
};
