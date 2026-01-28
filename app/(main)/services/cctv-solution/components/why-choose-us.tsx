import { Camera, Cloud, PhoneCall, Settings, Shield, Zap } from "lucide-react";

export function WhyChooseOurCctvService() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-[18px] pb-4 px-1 mb-4 md:text-[28px] border-b border-[#dee2e6] font-bold text-black">
          Why Businesses Choose Us
        </h2>

        <div className="flex  flex-col items-stretch  gap-4 lg:flex-row">
          {/* Large featured card */}
          <div className=" lg:w-[55%] gap-4 flex flex-col">
            <div className="bg-[#11be6e4d] flex-1 basis-auto  w-full border border-[#eee] rounded-md p-6 ">
              <Shield className="w-12 h-12" />
              <div className="mt-3">
                <h3 className="text-3xl font-bold mb-4">Complete Protection</h3>
                <p className="text-black text-lg leading-relaxed">
                  Our integrated security ecosystem combines advanced hardware,
                  intelligent software, and expert monitoring to create an
                  impenetrable safety net for your property.
                </p>
              </div>
            </div>
            <div className="md:col-span-2 bg-[#11be6e4d]  text-black rounded-md p-6 flex items-center gap-6">
              <Settings className="w-12 h-12 shrink-0" />
              <div>
                <h3 className="text-xl font-semibold">Smart Integration</h3>
                <p className="text-black mt-1">
                  Seamlessly connects with your existing security infrastructure
                  and smart home devices.
                </p>
              </div>
            </div>
          </div>
          <div className="lg:w-w-[45%] grid grid-cols-2 gap-4 ">
            {/* Smaller cards */}
            <div className="bg-[linear-gradient(135deg,#c0f7d7,#e6f7e0,#ccf2dc,#e6f9e6)] border  rounded-md p-8 flex flex-col justify-between min-h-[190px]">
              <Zap className="w-10 h-10 text-foreground" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Fast Setup
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Same-day installation available
                </p>
              </div>
            </div>

            <div className="bg-[linear-gradient(135deg,#c0f7d7,#e6f7e0,#ccf2dc,#e6f9e6)] border  rounded-md p-8 flex flex-col justify-between min-h-[190px]">
              <Camera className="w-10 h-10 text-foreground" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  4K Quality
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Ultra HD with night vision
                </p>
              </div>
            </div>

            <div className="bg-[linear-gradient(135deg,#c0f7d7,#e6f7e0,#ccf2dc,#e6f9e6)] border  rounded-md p-8 flex flex-col justify-between min-h-[190px]">
              <Cloud className="w-10 h-10 text-foreground" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  Cloud Storage
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  30-day secure backup included
                </p>
              </div>
            </div>

            <div className="bg-[linear-gradient(135deg,#c0f7d7,#e6f7e0,#ccf2dc,#e6f9e6)] border  rounded-md p-8 flex flex-col justify-between min-h-[190px]">
              <PhoneCall className="w-10 h-10 text-foreground" />
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  24/7 Support
                </h3>
                <p className="text-muted-foreground text-sm mt-1">
                  Always here when you need us
                </p>
              </div>
            </div>
          </div>

          {/* Wide card */}
        </div>
      </div>
    </section>
  );
}
