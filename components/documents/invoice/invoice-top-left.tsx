/* eslint-disable @next/next/no-img-element */

export default function InvoiceTopLeftPart({ img }: { img?: string }) {
  return (
    <div>
      <img
        src={img ?? "/doc-logo.png"}
        alt="Logo"
        className="h-20 w-auto px-8  object-contain"
      />
    </div>
  );
}
