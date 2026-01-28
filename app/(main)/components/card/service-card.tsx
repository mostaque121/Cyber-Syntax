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
        <div className="w-full p-6 flex items-center justify-center pt-2 relative">
          <Image
            src={service.image}
            alt={service.title}
            width={1000}
            height={1000}
            className="object-contain p-8"
          />
        </div>

        {/* Info Overlay */}
        <div className="card-content">
          <h4 className="text-[16px] text-primary line-clamp-1 text-center font-semibold mb-1">
            {service.title}
          </h4>
          <p className="text-sm text-center">{service.description}</p>
        </div>
      </div>
    </Link>
  );
}
