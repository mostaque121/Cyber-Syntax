import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="bg-white border border-gray-200 rounded-xl p-8 md:p-12 text-center">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-gray-600 mb-8">
          Whether you need IT support, security solutions, custom software, or
          quality tech products – we&apos;re here to help you succeed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold px-6 py-2.5">
              Contact Us Now
            </Button>
          </Link>
          <Link href="/products">
            <Button
              variant="outline"
              className="w-full sm:w-auto border border-primary text-primary hover:bg-primary/5 font-semibold px-6 py-2.5"
            >
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
