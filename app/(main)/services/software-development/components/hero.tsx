import Image from "next/image";

export function SoftwareDevelopmentHero() {
  return (
    <div className="relative">
      <Image
        src="/Software-banner-pc.png"
        alt="banner"
        width={1200}
        height={300}
        className="w-full h-auto"
      />
    </div>
  );
}
