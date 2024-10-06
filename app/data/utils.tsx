import { format } from "date-fns";

export function timeAgo(timestamp: string): string {
  const date = new Date(timestamp);
  const now = Date.now();
  const diff = now - date.getTime();

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;

  if (diff < minute) {
    return "just now";
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  } else if (diff < 30 * day) {
    const days = Math.floor(diff / day);
    return `${days} day${days > 1 ? "s" : ""} ago`;
  } else {
    return format(date, "MMM dd, yyyy");
  }
}

export const fileToAsyncIterable = async function* (
  file: File
): AsyncIterable<Uint8Array> {
  const reader = file.stream().getReader();
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    yield value;
  }
};
