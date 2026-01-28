"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function useUrlParams() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Convert search params to a mutable object
  const getParamsObject = () => {
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  };

  const setParam = (key: string, value: string | null) => {
    const params = getParamsObject();

    if (value === null || value === "" || value === undefined) {
      delete params[key];
    } else {
      params[key] = value;
    }

    const queryString = new URLSearchParams(params).toString();

    router.push(`${pathname}?${queryString}`, { scroll: false });
  };

  const setParams = (newParams: Record<string, string | null>) => {
    const params = getParamsObject();

    Object.keys(newParams).forEach((key) => {
      const value = newParams[key];
      if (value === null || value === "" || value === undefined) {
        delete params[key];
      } else {
        params[key] = value;
      }
    });

    const queryString = new URLSearchParams(params).toString();

    router.push(`${pathname}?${queryString}`, { scroll: false });
  };

  const clearAllParams = () => {
    router.push(pathname, { scroll: false });
  };

  return {
    searchParams,
    setParam,
    setParams,
    clearAllParams,
  };
}
