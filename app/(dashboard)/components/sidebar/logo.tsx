import Image from "next/image";
export default function LogoAdmin() {
  return (
    <div className="flex gap-2 items-center">
      <div className="relative">
        <Image
          src={"/fav.png"}
          alt="logo-admin"
          width={50}
          height={50}
          className="w-5 h-5"
        />
      </div>
      <h2 className="text-base font-semibold">RPLFASTRACK</h2>
    </div>
  );
}
