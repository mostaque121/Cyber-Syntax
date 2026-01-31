import {
  ArrowLeftRight,
  CheckCircle,
  DollarSign,
  Package,
  Shield,
  Truck,
} from "lucide-react";

export default function WhyChooseSection() {
  return (
    <section className="container py-16 md:px-10 mx-auto px-4 bg-slate-50">
      <div className="flex border-b pb-4 mb-4 border-[#dee2e6] gap-4 flex-wrap justify-between items-center">
        <h2 className="text-[18px] uppercase  px-1  md:text-[32px]  font-bold text-black">
          Why Choose cyber syntax
        </h2>
      </div>

      <div className="flex  flex-col items-stretch  gap-3 lg:flex-row">
        {/* Left Column - Large Cards */}
        <div className=" lg:w-[41.67%] flex flex-col">
          <div className="bg-[#11be6e4d] flex-1 basis-auto mb-2 w-full border border-[#eee] rounded-[12px]  p-6 text-center">
            <div className="flex justify-center">
              <CheckCircle
                className=" w-12 h-12 text-center mb-3 bg-[#fafafa] text-[#43b97f] rounded-[5px] border-[#43b98080] p-[5px]  "
                strokeWidth={1.5}
              />
            </div>

            <h3 className="text-[18px] font-semibold mb-1 text-black">
              Certified Tested Devices
            </h3>
            <p className="text-black text-[15px]">
              Every phone, laptop, and MacBook is thoroughly inspected by
              experts to ensure reliable performance and quality you can trust.
            </p>
          </div>

          <div className="bg-[#11be6e4d] flex-1 basis-auto w-full border border-[#eee] rounded-[12px]  p-6 text-center">
            <div className="flex justify-center">
              <DollarSign
                className=" w-12 h-12 text-center mb-3 bg-[#fafafa] rounded-[5px] text-[#43b97f] border-[#43b98080] p-[5px] "
                strokeWidth={1.5}
              />
            </div>

            <h3 className="text-[18px] font-semibold mb-1 text-black">
              Affordable Pricing
            </h3>
            <p className="text-black text-[15px]">
              High-quality pre-owned devices offered at fair, budget-friendly
              prices reliable and premium technology accessible to everyone.
            </p>
          </div>
        </div>

        {/* Right Column - Feature List */}
        <div className="lg:w-[58.33%] flex flex-col ">
          {/* Fast Delivery */}
          <div className="bg-[linear-gradient(135deg,#c0f7d7,#e6f7e0,#ccf2dc,#e6f9e6)] basis-auto flex-1 p-4 mb-2 rounded-[12px] border-[#eee] border items-center flex">
            <div className="shrink-0">
              <Truck
                className=" w-12 h-12 text-center mb-3 mr-4 bg-[#fafafa] rounded-[5px] text-[#43b97f] border-[#43b98080] p-[5px] "
                strokeWidth={1.5}
              />
            </div>
            <div className="flex-1">
              <h4 className="text-[18px] font-semibold text-black mb-1">
                Fast Delivery
              </h4>
              <p className="text-black text-[14px]">
                Quick and safe delivery available for all across Bangladesh.
              </p>
            </div>
          </div>

          {/* Secure Packaging */}

          <div className="bg-[linear-gradient(135deg,#c0f7d7,#e6f7e0,#ccf2dc,#e6f9e6)] basis-auto flex-1 p-4 mb-2 rounded-[12px] border-[#eee] border items-center flex">
            <div className="shrink-0">
              <Package
                className=" w-12 h-12 text-center mb-3 mr-4 bg-[#fafafa] rounded-[5px] text-[#43b97f] border-[#43b98080] p-[5px] "
                strokeWidth={1.5}
              />
            </div>
            <div className="flex-1">
              <h4 className="text-[18px] font-semibold text-black mb-1">
                Secure Packaging
              </h4>
              <p className="text-black text-[14px]">
                Devices are safely packed to prevent any damage during transit.
              </p>
            </div>
          </div>

          {/* Warranty */}

          <div className="bg-[linear-gradient(135deg,#c0f7d7,#e6f7e0,#ccf2dc,#e6f9e6)] basis-auto flex-1 p-4 mb-2 rounded-[12px] border-[#eee] border items-center flex">
            <div className="shrink-0">
              <Shield
                className=" w-12 h-12 text-center mb-3 mr-4 bg-[#fafafa] rounded-[5px] text-[#43b97f] border-[#43b98080] p-[5px]"
                strokeWidth={1.5}
              />
            </div>
            <div className="flex-1">
              <h4 className="text-[18px] font-semibold text-black mb-1">
                Warranty
              </h4>
              <p className="text-black text-[14px]">
                Value-Added Protection Plan available for all our devices.
              </p>
            </div>
          </div>

          {/* Replacement */}

          <div className="bg-[linear-gradient(135deg,#c0f7d7,#e6f7e0,#ccf2dc,#e6f9e6)] basis-auto flex-1 p-4  rounded-[12px] border-[#eee] border items-center flex">
            <div className="shrink-0">
              <ArrowLeftRight
                className=" w-12 h-12 text-center mb-3 mr-4 bg-[#fafafa] rounded-[5px] text-[#43b97f] border-[#43b98080] p-[5px]"
                strokeWidth={1.5}
              />
            </div>
            <div className="flex-1">
              <h4 className="text-[18px] font-semibold text-black mb-1">
                Replacement
              </h4>
              <p className="text-black text-[14px]">
                15-Days Replacement Warranty is given instantly according to our
                warranty guideline.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
