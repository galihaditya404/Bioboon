import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Utility for class merging
export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

// Format number with commas
export function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}
