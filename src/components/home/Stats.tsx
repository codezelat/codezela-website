const statistics = [
  ["850+", "Clients Worldwide"],
  ["2400+", "Projects Completed"],
  ["14+", "Years of Experience"],
] as const;

export function Stats() {
  return (
    <section
      aria-label="Codezela Technologies in numbers"
      className="h-[329px] rounded-bl-[90px] rounded-tr-[90px] bg-[linear-gradient(270deg,#d300ff_0%,#710bc0_100%)] text-white md:h-[182px] md:rounded-bl-[50px] md:rounded-tr-[50px]"
    >
      <div className="site-shell grid h-full grid-rows-3 items-center md:grid-cols-3 md:grid-rows-1">
        {statistics.map(([value, label]) => (
          <div key={label} className="flex h-full flex-col items-center justify-center text-center">
            <strong className="font-display text-[38px] font-bold leading-none md:text-[48px]">
              {value}
            </strong>
            <span className="mt-2 text-[16px] font-medium leading-5 md:mt-3 md:text-[18px]">
              {label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
