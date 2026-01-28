import Image from "next/image";
export function WhyChooseForSoftwareDevelopment() {
  return (
    <section id="about" className="w-full py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
              Why Choose Cyber Syntax & Engineering?
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We build innovative, secure, and scalable digital solutions
              designed to accelerate business growth. From startups to
              enterprise systems, our development team transforms ideas into
              powerful, production-ready software engineered for performance and
              long-term success.
            </p>

            <div className="space-y-4">
              {/* 1 */}
              <div className="flex gap-4">
                <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Scalable & Future-Ready Architecture
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Systems engineered to grow seamlessly with your team and
                    business needs.
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
                    Expert Development Team
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Skilled engineers with deep industry knowledge and technical
                    mastery.
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
                    Secure Development Standards
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Built-in security practices to protect your data and
                    infrastructure.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-xl font-bold text-primary mt-8">
              Innovate smarter. Build faster. Grow stronger.
            </p>
          </div>

          {/* Right Side Illustration */}
          <div className="bg-linear-to-br from-primary/10 to-accent/10 rounded-2xl p-12 h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center">
                <Image
                  src="/logo-icon-2.png"
                  alt="Logo Icon"
                  width={96}
                  height={96}
                />
              </div>
              <p className="text-muted-foreground">
                Your trusted software development partner
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
