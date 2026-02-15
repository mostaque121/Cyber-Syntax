import Image from "next/image";

export function ItSupportHero() {
  return (
    <div className="relative">
      <Image
        src="/it support-banner-pc.png"
        alt="banner"
        width={1200}
        height={300}
        className="w-full h-auto"
      />
    </div>
  );
}
