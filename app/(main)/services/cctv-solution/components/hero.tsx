import Image from "next/image";

export function CctvSolutionHero() {
  return (
    <div className="relative">
      <Image
        src="/cctv-banner-pc.png"
        alt="banner"
        width={1200}
        height={300}
        className="w-full h-auto"
      />
    </div>
  );
}
