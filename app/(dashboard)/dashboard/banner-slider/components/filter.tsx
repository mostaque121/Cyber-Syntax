import { SelectFilter } from "@/components/custom-ui/select-filter";
import { cn } from "@/lib/utils";

interface FilterProps {
  isActive: string;
  onActiveChange: (value: string) => void;
  className?: string;
}

export default function BannerSliderFilter({
  isActive,
  onActiveChange,
  className,
}: FilterProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* Featured filter */}
      <SelectFilter
        placeholder="Featured"
        className="w-48"
        options={[
          { value: "all", label: "All Items" },
          { value: "true", label: "Active banners" },
          { value: "false", label: "Inactive banners" },
        ]}
        value={isActive}
        onChange={onActiveChange}
      />
    </div>
  );
}
