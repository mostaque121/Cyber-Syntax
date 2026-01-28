/* eslint-disable @next/next/no-img-element */

export default function InvoiceTopLeftPart({ img }: { img?: string }) {
  return (
    <div>
      <img
        src={img ?? "/logo-icon-2.png"}
        alt="Logo"
        className="h-30 px-8  object-contain"
      />
    </div>
  );
}
