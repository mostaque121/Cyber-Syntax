import { SearchBar } from "@/components/custom-ui/search-bar";
import { SelectFilter } from "@/components/custom-ui/select-filter";
import { cn } from "@/lib/utils";

interface CctvPackageFilterProps {
  onSearch: (value: string) => void;
  searchValue: string;
  isAvailable: string;
  onAvailableChange: (value: string) => void;
  className?: string;
}

export default function DashBoardCctvPackageFilter({
  searchValue,
  onSearch,
  isAvailable,
  onAvailableChange,
  className,
}: CctvPackageFilterProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* Search bar */}
      <SearchBar
        onSearch={onSearch}
        placeholder="Search package.."
        value={searchValue}
        className="w-full"
      />

      {/* Featured filter */}
      <SelectFilter
        placeholder="Available"
        className="w-32"
        options={[
          { value: "all", label: "All Items" },
          { value: "true", label: "Available Packages" },
          { value: "false", label: "Not Available Packages" },
        ]}
        value={isAvailable}
        onChange={onAvailableChange}
      />
    </div>
  );
}
