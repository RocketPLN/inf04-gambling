import { cn } from "@/lib/utils";

function Input({ className, type = "text", ...props }) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "w-full border-4 border-white bg-white px-3 py-2.5 font-mono text-[13px] font-black text-cke-blue shadow-[inset_3px_3px_0_#808080] outline-none [border-style:inset] placeholder:text-cke-blue/50 focus:bg-ugly-yellow focus:text-ugly-pink",
        className
      )}
      {...props}
    />
  );
}

export { Input };
