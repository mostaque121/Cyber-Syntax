import { unstable_cache } from "next/cache";

export function withCache(
  fn: (...args: unknown[]) => Promise<unknown>,
  baseKeys: readonly unknown[],
  baseTags: readonly unknown[],
  revalidate?: number
) {
  return (...args: unknown[]) => {
    const keys = [...baseKeys, ...args].map(String);
    const tags = [...baseTags, ...args].map(String);

    return unstable_cache(() => fn(...args), keys, { tags, revalidate })();
  };
}
