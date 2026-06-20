import type { ChatMessage } from "./types";

export function formatTime(timestamp: string | Date): string {
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  return new Intl.DateTimeFormat("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

export function truncateAddress(address: string): string {
  if (address.length <= 12) return address;
  return `${address.slice(0, 6)}…${address.slice(-4)}`;
}

function startOfDay(date: Date): number {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy.getTime();
}

export function formatDayLabel(timestamp: string | Date): string {
  const date = typeof timestamp === "string" ? new Date(timestamp) : timestamp;
  const today = startOfDay(new Date());
  const target = startOfDay(date);
  const dayMs = 24 * 60 * 60 * 1000;

  if (target === today) return "HOY";
  if (target === today - dayMs) return "AYER";

  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "long",
  })
    .format(date)
    .toUpperCase();
}

export interface ChatMessageGroup {
  dayKey: number;
  dayLabel: string;
  messages: ChatMessage[];
}

export function groupMessagesByDay(messages: ChatMessage[]): ChatMessageGroup[] {
  const sorted = [...messages].sort((a, b) => {
    const aTime = new Date(a.timestamp).getTime();
    const bTime = new Date(b.timestamp).getTime();
    return aTime - bTime;
  });

  const groups: ChatMessageGroup[] = [];

  for (const message of sorted) {
    const date = new Date(message.timestamp);
    const dayKey = startOfDay(date);
    const last = groups[groups.length - 1];

    if (last && last.dayKey === dayKey) {
      last.messages.push(message);
      continue;
    }

    groups.push({
      dayKey,
      dayLabel: formatDayLabel(date),
      messages: [message],
    });
  }

  return groups;
}
