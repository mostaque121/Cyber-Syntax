import { SearchBar } from "@/components/custom-ui/search-bar";
import { SelectFilter } from "@/components/custom-ui/select-filter";
import { cn } from "@/lib/utils";

interface DashBoardProductFilterProps {
  onSearch: (value: string) => void;
  searchValue: string;
  filter: string;
  onFilterChange: (value: string) => void;
  className?: string;
}

export default function DashBoardProductFilter({
  searchValue,
  onSearch,
  filter,
  onFilterChange,
  className,
}: DashBoardProductFilterProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* Search bar */}
      <SearchBar
        onSearch={onSearch}
        placeholder="Search product.."
        value={searchValue}
        className="w-full"
      />

      {/* Featured filter */}
      <SelectFilter
        placeholder="Featured"
        className="w-32"
        options={[
          { value: "all", label: "All Items" },
          { value: "hot", label: "Hot Deals" },
          { value: "available", label: "Available" },
          { value: "featured", label: "featured" },
        ]}
        value={filter}
        onChange={onFilterChange}
      />
    </div>
  );
}
