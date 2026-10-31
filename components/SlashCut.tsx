export default function SlashCut() {
  return (
    <div aria-hidden="true" className="relative z-10 h-20 overflow-hidden md:h-28">
      <div
        data-cut
        className="absolute -left-[10%] -right-[10%] top-1/2 h-[3px] origin-left -rotate-2 bg-gradient-to-r from-transparent via-crimson to-transparent shadow-[0_0_18px_3px_rgb(230_46_58/0.7)]"
      />
    </div>
  );
}
