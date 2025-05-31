import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function scrollToTop() {
  const tableContainer = document.querySelector('#table-scroll-top');

  if (tableContainer) {
    tableContainer.scrollTop = 0;
  }
}
