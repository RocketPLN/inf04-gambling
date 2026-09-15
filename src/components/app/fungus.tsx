export function FungusWhisper({ variant }: { variant?: string }) {
  if (variant === "corner") {
    return (
      <span className="absolute left-1.5 bottom-1.5 z-[5] -rotate-[14deg] text-[11px] opacity-30 saturate-50" title="grzybnia czuwa...">
        🍄
      </span>
    );
  }
  return (
    <span className="ml-1 align-super text-[9px] opacity-40 saturate-70" title="lekki nalot grzybni (0.3%) — nieszkodliwy">
      ·🍄·
    </span>
  );
}
