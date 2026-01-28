import { SearchBar } from "@/components/custom-ui/search-bar";
import { SelectFilter } from "@/components/custom-ui/select-filter";
import { cn } from "@/lib/utils";

interface ContactFilterProps {
  onSearch: (value: string) => void;
  searchValue: string;
  status: string;
  onStatusChange: (value: string) => void;
  className?: string;
}

export default function ContactFilter({
  searchValue,
  onSearch,
  status,
  onStatusChange,
  className,
}: ContactFilterProps) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {/* Search bar */}
      <SearchBar
        onSearch={onSearch}
        placeholder="Search by name or email..."
        value={searchValue}
        className="w-full"
      />

      {/* Status filter */}
      <SelectFilter
        placeholder="Status"
        className="w-40"
        options={[
          { value: "all", label: "All Status" },
          { value: "pending", label: "Pending" },
          { value: "in_progress", label: "In Progress" },
          { value: "resolved", label: "Resolved" },
          { value: "closed", label: "Closed" },
        ]}
        value={status}
        onChange={onStatusChange}
      />
    </div>
  );
}
