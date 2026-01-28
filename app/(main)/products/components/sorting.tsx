import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductSortingProps {
  onChangeSort: (value: "DEFAULT" | "LOW_TO_HIGH" | "HIGH_TO_LOW") => void;
}
export function ProductSorting({ onChangeSort }: ProductSortingProps) {
  return (
    <Select onValueChange={onChangeSort}>
      <SelectTrigger className="w-48">
        <SelectValue placeholder="Sort By Price" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="DEFAULT">price: Default</SelectItem>
        <SelectItem value="LOW_TO_HIGH">Price: Low to High</SelectItem>
        <SelectItem value="HIGH_TO_LOW">Price: High to Low</SelectItem>
      </SelectContent>
    </Select>
  );
}
