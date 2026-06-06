import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge conditional NativeWind class strings, resolving Tailwind conflicts.
 * Identical to KUIREACT and the expo boilerplate's cn() — keep it in sync.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
