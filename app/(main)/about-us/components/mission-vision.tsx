import { Card } from "@/components/ui/card";
import { Eye, Lightbulb, Target } from "lucide-react";

export function MissionVision() {
  return (
    <section className="mb-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white border border-primary p-8 rounded-[5px] text-center">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Target className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            To deliver reliable and innovative technology solutions that empower
            businesses and individuals to achieve their goals efficiently.
          </p>
        </Card>

        <Card className="bg-white border border-primary p-8 rounded-[5px] text-center">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Eye className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed">
            To become the go-to technology partner for businesses seeking
            quality IT services, security solutions, and tech products.
          </p>
        </Card>

        <Card className="bg-white border border-primary p-8 rounded-[5px] text-center">
          <div className="w-14 h-14 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lightbulb className="w-7 h-7 text-primary" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-3">Our Values</h3>
          <p className="text-gray-600 leading-relaxed">
            Quality, integrity, and customer satisfaction drive everything we
            do. We believe in transparent pricing and honest service.
          </p>
        </Card>
      </div>
    </section>
  );
}
