import { Button } from "@/components/ui/button";
import { ArrowRight, Headphones, MessageCircle } from "lucide-react";
import Link from "next/link";

export function ProductsCTASection() {
  return (
    <section className="mt-12 bg-linear-to-r from-primary to-teal-600 rounded-2xl p-8 md:p-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Can&apos;t Find What You&apos;re Looking For?
          </h2>
          <p className="text-teal-50 text-lg max-w-xl">
            Our team is here to help you find the perfect device that fits your
            needs and budget. Get personalized recommendations today!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            asChild
            size="lg"
            className="bg-white text-teal-600 hover:bg-teal-50 font-semibold"
          >
            <Link href="/contact">
              <MessageCircle className="w-5 h-5 mr-2" />
              Contact Us
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="font-semibold">
            <Link href="/services">
              Our Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Support Info */}
      <div className="mt-8 pt-6 border-t border-white/20 flex flex-col sm:flex-row items-center justify-center gap-6 text-white">
        <div className="flex items-center gap-2">
          <Headphones className="w-5 h-5" />
          <span className="text-sm">24/7 Customer Support</span>
        </div>
        <div className="hidden sm:block w-px h-4 bg-white/30" />
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <span className="text-sm">Live Chat Available</span>
        </div>
      </div>
    </section>
  );
}
