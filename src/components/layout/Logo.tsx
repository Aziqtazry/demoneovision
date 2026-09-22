import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Logo() {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <Image
        src={`${basePath}/neovision.png`}
        alt="NeoVision Logo"
        width={40}
        height={40}
        className="shrink-0 object-contain"
        priority
      />

      <div className="flex min-w-0 flex-col">
        <span className="text-white font-semibold text-sm leading-tight">
          AI Detection
        </span>
        <span className="text-slate-400 text-xs">NeoVision</span>
      </div>
    </div>
  );
}
