import Image from "next/image";
import Link from "next/link";

interface SectionProps {
  service: {
    title: string;
    image: string;
    href: string;
    description: string;
  };
}

export default function ServiceCard({ service }: SectionProps) {
  return (
    <Link key={service.href} href={service.href}>
      <div className="service-card cursor-pointer">
        {/* Image Container */}
        <div className="w-full aspect-square flex items-center justify-center relative p-2 sm:p-4 md:p-6">
          <Image
            src={service.image}
            alt={service.title}
            width={1000}
            height={1000}
            className="object-contain w-full h-full"
          />
        </div>

        {/* Info Overlay */}
        <div className="card-content">
          <h4 className="text-[16px] text-primary  text-center font-semibold mb-1">
            {service.title}
          </h4>
          <p className="text-sm text-center">{service.description}</p>
        </div>
      </div>
    </Link>
  );
}
