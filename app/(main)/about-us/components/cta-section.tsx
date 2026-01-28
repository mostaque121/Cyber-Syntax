import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="bg-primary/5 border border-primary rounded-[5px] p-8 md:p-12 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">
        Ready to Get Started?
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-8">
        Whether you need IT support, security solutions, custom software, or
        quality tech products – we're here to help.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/contact">
          <Button className="bg-primary hover:bg-green-600 text-white font-semibold px-8">
            Contact Us
          </Button>
        </Link>
        <Link href="/products">
          <Button
            variant="outline"
            className="border-primary text-primary hover:bg-primary/5 font-semibold px-8"
          >
            Browse Products
          </Button>
        </Link>
      </div>
    </section>
  );
}
