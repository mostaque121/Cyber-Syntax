import ServiceCard from "../card/service-card";
const services = [
  {
    title: "IT Support",
    image: "/it-service.png",
    href: "/services/it-support",
    description:
      "Comprehensive IT support for your business and personal needs.",
  },
  {
    title: "CCTV Solution",
    image: "/cctv-camera.png",
    href: "/services/cctv-solution",
    description: "Advanced CCTV solutions to secure your premises effectively.",
  },
  {
    title: "Networking Solution",
    image: "/solution.png",
    href: "/services/networking-solution",
    description:
      "Reliable networking services to keep your business connected.",
  },
  {
    title: "Software Development",
    image: "/software.png",
    href: "/services/software-development",
    description: "Custom software development tailored to your business needs.",
  },
];

export function OurServices() {
  return (
    <div>
      <div className="container px-4 md:px-8 py-8">
        <h2 className="text-[18px] uppercase pb-4 px-1 mb-4 md:text-[32px] border-b border-[#dee2e6] font-bold text-black">
          Our Services
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </div>
  );
}
