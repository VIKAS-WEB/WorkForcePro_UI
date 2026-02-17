import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getValidImageUrl(path: string | null | undefined) {
  if (!path) return "/placeholder.svg";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  // Remove leading slash if present in path to avoid double slashes if API_URL has trailing slash
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:8080";
  // Remove trailing slash from API_URL if present
  const cleanApiUrl = apiUrl.endsWith("/") ? apiUrl.substring(0, apiUrl.length - 1) : apiUrl;

  return `${cleanApiUrl}/${cleanPath}`;
}
