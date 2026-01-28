import Image from "next/image";

export function ProductNotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-4 p-4">
      <Image
        src="/empty-cart.png"
        className=""
        alt="empty"
        width={378}
        height={229}
      />
      <h4 className="text-3xl font-semibold text-center text-black">
        Product Not Found
      </h4>
    </div>
  );
}
