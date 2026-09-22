import Image from "next/image";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      {/* Real Logo */}
      <Image
        src={`${basePath}/neovision.png`}
        alt="NV Logo"
        width={40}
        height={40}
        className="rounded-full object-contain"
        priority
      />

      <div className="flex flex-col">
        <span className="text-white font-semibold text-sm leading-tight">
          AI Detection
        </span>
        <span className="text-slate-400 text-xs">NeoVision</span>
      </div>
    </div>
  );
}
