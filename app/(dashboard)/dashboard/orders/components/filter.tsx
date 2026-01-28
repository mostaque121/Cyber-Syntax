import { SearchBar } from "@/components/custom-ui/search-bar";
import { SelectFilter } from "@/components/custom-ui/select-filter";
import { cn } from "@/lib/utils";

interface OrderFilterProps {
  onSearch: (value: string) => void;
  searchValue: string;
  status: string;
  onStatusChange: (value: string) => void;
  className?: string;
}
export function OrderFilter({
  searchValue,
  onSearch,
  status,
  onStatusChange,
  className,
}: OrderFilterProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* Search bar */}
      <SearchBar
        onSearch={onSearch}
        placeholder="Search product.."
        value={searchValue}
        className="w-full"
      />

      <SelectFilter
        placeholder="Featured"
        className="w-40"
        options={[
          { value: "ALL", label: "All" },
          { value: "PENDING", label: "Pending" },
          { value: "CONFIRMED", label: "Confirmed" },
          { value: "PROCESSING", label: "Processing" },
          { value: "SHIPPED", label: "Shipped" },
          { value: "DELIVERED", label: "Delivered" },
          { value: "CANCELLED", label: "Cancelled" },
          { value: "RETURNED", label: "Returned" },
        ]}
        value={status}
        onChange={onStatusChange}
      />
    </div>
  );
}
