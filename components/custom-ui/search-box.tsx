import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type Props = {
  onSearchClick: () => void;
};

export default function SearchBox({ onSearchClick }: Props) {
  return (
    <div className="flex items-center">
      {/* Desktop / Medium screens and up */}
      <div
        onClick={onSearchClick}
        className="hidden md:flex w-96 items-center rounded-sm border border-transparent bg-white p-0.5 transition-all group hover:border-green-600"
      >
        <div className="w-full h-8 px-2 bg-transparent text-black placeholder-gray-500 flex items-center">
          <span className="text-gray-500">Search</span>
        </div>
        <Button
          size="sm"
          className="h-8 rounded-sm bg-green-600 px-4 hover:bg-green-700"
        >
          <Search className="h-4 w-4 text-white" />
        </Button>
      </div>
    </div>
  );
}
