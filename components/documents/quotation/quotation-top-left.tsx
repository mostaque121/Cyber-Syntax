import Image from "next/image";
export default function QuotationTopLeftPart({ img }: { img?: string }) {
  return (
    <div className="relative">
      <Image
        src={img ?? "/logo-icon-2.png"}
        alt="Logo"
        width={120}
        height={120}
        className="w-full  px-8  object-contain"
      />
    </div>
  );
}
