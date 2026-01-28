"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SelectFilterProps {
  options: { value: string; label: string }[];
  value?: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  label?: string;
}

export function SelectFilter({
  options,
  value,
  onChange,
  placeholder = "Select...",
  className,
  label,
}: SelectFilterProps) {
  const handleValueChange = (val: string) => {
    onChange(val);
  };

  return (
    <div className="flex items-center gap-3">
      {label && (
        <label className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <Select value={value} onValueChange={handleValueChange}>
        <SelectTrigger className={className}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
