import Image from "next/image";
export function WhyChooseForNetworking() {
  return (
    <section id="about" className="w-full py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-foreground">
              Why Choose Cyber Syntax & Engineering?
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              At Cyber Syntax and Engineering Ltd, we provide comprehensive
              networking solutions tailored to meet the demands of modern
              businesses. From designing secure and high-performance networks to
              implementing reliable infrastructure, we ensure your connectivity
              is seamless, efficient, and future-ready.
            </p>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Enterprise-Grade Solutions
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Scalable and reliable infrastructure for businesses of all
                    sizes.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    24/7 Professional Support
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Round-the-clock monitoring and expert technical assistance.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="shrink-0 w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">✓</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">
                    Security First Approach
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Advanced protections against modern cyber threats.
                  </p>
                </div>
              </div>
            </div>
            <p className="text-xl font-bold text-primary mt-8">
              Connect smarter. Work faster. Grow stronger.
            </p>
          </div>
          <div className="bg-linear-to-br from-primary/10 to-accent/10 rounded-2xl p-12 h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full  mx-auto mb-6 flex items-center justify-center">
                <Image
                  src="/logo-icon-2.png"
                  alt="Logo Icon"
                  width={96}
                  height={96}
                />
              </div>
              <p className="text-muted-foreground">
                Your trusted networking partner
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
