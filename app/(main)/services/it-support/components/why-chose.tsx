import Image from "next/image";
// If you want to use Lucide icons later, uncomment this:
// import { Wrench, ShieldCheck, Clock } from "lucide-react";

export function WhyChooseForITSupport() {
  return (
    <section id="about-it" className="w-full py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
              Why Trust Cyber Syntax & Engineering for IT Support?
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We ensure your business never stops. From rapid hardware repairs
              to 24/7 network monitoring, our dedicated support team keeps your
              infrastructure secure, optimized, and running at peak performance
              so you can focus on your work, not your tools.
            </p>

            <div className="space-y-4">
              {/* 1 */}
              <div className="flex gap-4">
                <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Rapid Response & Repair
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Fast turnaround times for hardware fixes and immediate
                    remote support for software issues.
                  </p>
                </div>
              </div>

              {/* 2 */}
              <div className="flex gap-4">
                <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Proactive System Maintenance
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We prevent problems before they happen with regular updates,
                    virus scans, and optimization.
                  </p>
                </div>
              </div>

              {/* 3 */}
              <div className="flex gap-4">
                <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Certified Technical Experts
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Our technicians are certified professionals experienced in
                    resolving complex IT challenges.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xl font-bold text-primary mt-8">
              Reliable support. Minimized downtime. Maximum efficiency.
            </p>
          </div>

          {/* Right Side Illustration */}
          <div className="bg-linear-to-br from-primary/10 to-accent/10 rounded-2xl p-12 h-96 flex items-center justify-center relative overflow-hidden">
            {/* Optional: Add a subtle background pattern or illustration here if you have one */}
            <div className="text-center z-10">
              <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center bg-background shadow-sm">
                <Image
                  src="/logo-icon-2.png"
                  alt="IT Support Icon"
                  width={64}
                  height={64}
                  className="object-contain"
                />
              </div>
              <h3 className="text-lg font-semibold text-foreground">
                24/7 Tech Assistance
              </h3>
              <p className="text-muted-foreground mt-2">
                Your reliable IT partner
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
