import * as React from "react";

export function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = window.matchMedia(query);

    // Set initial value
    setValue(result.matches);

    // Listen for changes
    result.addEventListener("change", onChange);

    // Cleanup listener on unmount
    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}
