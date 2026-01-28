"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import * as React from "react";

interface CalendarPickerProps {
  selected?: Date;
  onSelect?: (date?: Date) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  selected,
  onSelect,
  placeholder = "Select date",
  className = "w-48",
}: CalendarPickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex flex-col gap-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={`${className} justify-between font-normal`}
          >
            {selected ? new Date(selected).toLocaleDateString() : placeholder}
            <ChevronDownIcon className="ml-2 h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={selected ? new Date(selected) : undefined}
            captionLayout="dropdown"
            onSelect={(date) => {
              if (!date) return;
              onSelect?.(date); // pass ISO string
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
