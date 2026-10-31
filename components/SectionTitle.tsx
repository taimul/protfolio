export default function SectionTitle({
  kanji,
  label,
  title,
}: {
  kanji: string;
  label: string;
  title: string;
}) {
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        data-parallax
        className="font-jp pointer-events-none absolute -left-2 -top-16 select-none text-[11rem] leading-none text-bone/[0.05] md:text-[16rem]"
      >
        {kanji}
      </span>
      <p className="mono-label relative flex items-center gap-3">
        <span className="star text-crimson" />
        {label}
      </p>
      <h2 data-slash className="display relative mt-4 text-[clamp(1.9rem,8.5vw,6rem)]">
        {title}
      </h2>
    </div>
  );
}
