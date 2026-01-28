"use client";

import { ChevronsRight } from "lucide-react";
import Link from "next/link";

interface BreadcrumbProps {
  title: string;
}

export function CctvPackageBreadcrumb({ title }: BreadcrumbProps) {
  return (
    <nav className="text-[14px] text-black flex flex-wrap items-center gap-1.5 mb-4">
      <Link href="/services" className="hover:text-primary">
        Services
      </Link>
      <ChevronsRight className="w-3 h-3" />

      <span className="flex items-center gap-1.5">
        <Link href="/services/cctv-solution" className="hover:text-primary ">
          CCTV Solution
        </Link>
      </span>
      <ChevronsRight className="w-3 h-3" />
      <span className="text-primary font-semibold">{title}</span>
    </nav>
  );
}
