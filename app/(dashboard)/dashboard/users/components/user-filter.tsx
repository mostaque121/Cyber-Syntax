import { SearchBar } from "@/components/custom-ui/search-bar";
import { SelectFilter } from "@/components/custom-ui/select-filter";
import { cn } from "@/lib/utils";

interface UserFilterProps {
  onSearch: (value: string) => void;
  searchValue: string;
  role: string;
  onRoleChange: (value: string) => void;
  banned: string;
  onBannedChange: (value: string) => void;
  emailVerified: string;
  onEmailVerifiedChange: (value: string) => void;
  className?: string;
}

export default function UserFilter({
  searchValue,
  onSearch,
  role,
  onRoleChange,
  banned,
  onBannedChange,
  emailVerified,
  onEmailVerifiedChange,
  className,
}: UserFilterProps) {
  return (
    <div className={cn("flex flex-wrap items-center gap-4", className)}>
      {/* Search bar */}
      <SearchBar
        onSearch={onSearch}
        placeholder="Search by name or email..."
        value={searchValue}
        className="w-full md:flex-1"
      />

      {/* Role filter */}
      <SelectFilter
        placeholder="Role"
        className="w-32"
        options={[
          { value: "all", label: "All Roles" },
          { value: "admin", label: "Admin" },
          { value: "moderator", label: "Moderator" },
          { value: "customer", label: "Customer" },
        ]}
        value={role}
        onChange={onRoleChange}
      />

      {/* Banned filter */}
      <SelectFilter
        placeholder="Banned"
        className="w-32"
        options={[
          { value: "all", label: "All Status" },
          { value: "true", label: "Banned" },
          { value: "false", label: "Active" },
        ]}
        value={banned}
        onChange={onBannedChange}
      />

      {/* Email Verified filter */}
      <SelectFilter
        placeholder="Verified"
        className="w-36"
        options={[
          { value: "all", label: "All" },
          { value: "true", label: "Verified" },
          { value: "false", label: "Unverified" },
        ]}
        value={emailVerified}
        onChange={onEmailVerifiedChange}
      />
    </div>
  );
}
