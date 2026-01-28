"use client";

import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import * as React from "react";

export interface NumberInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    "onChange" | "value" | "type"
  > {
  value?: number; // value can be undefined
  // Update: onChange now accepts number OR undefined
  onChange?: (value: number | undefined) => void;
}

const NumberInput = React.forwardRef<HTMLInputElement, NumberInputProps>(
  ({ className, value, onChange, ...props }, ref) => {
    const [inputValue, setInputValue] = React.useState("");
    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
      if (!isFocused) {
        // Update: Only set to empty string if value is explicitly undefined/null.
        // If value is 0, we want to see "0".
        if (value === undefined || value === null) {
          setInputValue("");
        } else {
          setInputValue(String(value));
        }
      }
    }, [value, isFocused]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let newInputValue = e.target.value;

      // Remove anything that's not a digit or a decimal point
      newInputValue = newInputValue.replace(/[^0-9.]/g, "");

      // Only allow a single decimal point
      const parts = newInputValue.split(".");
      if (parts.length > 2) {
        newInputValue = parts[0] + "." + parts.slice(1).join("");
      }

      setInputValue(newInputValue);

      // Update: If input is empty, pass undefined instead of 0
      if (newInputValue === "") {
        onChange?.(undefined);
        return;
      }

      const numericValue = Number.parseFloat(newInputValue);
      if (!isNaN(numericValue)) {
        onChange?.(numericValue);
      }
    };

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      props.onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);

      if (value !== undefined && value !== null) {
        const cleanValue = Number.parseFloat(String(value));
        // Only trigger change if the parsed value is different
        if (!isNaN(cleanValue) && cleanValue !== value) {
          onChange?.(cleanValue);
        }
      }
      props.onBlur?.(e);
    };

    return (
      <Input
        type="text"
        inputMode="numeric"
        pattern="[0-9]*\.?[0-9]*"
        ref={ref}
        className={cn(className)}
        value={inputValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...props}
      />
    );
  }
);
NumberInput.displayName = "NumberInput";

export { NumberInput };
