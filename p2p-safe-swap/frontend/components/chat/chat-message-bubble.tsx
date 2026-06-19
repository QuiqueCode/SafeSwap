import { cn } from "@/lib/utils";
import type { TextMessage } from "./types";
import { formatTime } from "./utils";

export interface ChatMessageBubbleProps {
  message: TextMessage;
  className?: string;
}

function DeliveryTick({ status }: { status: TextMessage["deliveryStatus"] }) {
  if (!status) return null;
  const isRead = status === "read";

  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-label={`Estado: ${status}`}
      className={cn(
        "shrink-0",
        isRead ? "text-primary" : "text-muted-foreground"
      )}
    >
      <polyline points="3 13 8 18 17 7" />
      {status !== "sent" && <polyline points="9 13 14 18 22 7" />}
    </svg>
  );
}

export function ChatMessageBubble({
  message,
  className,
}: ChatMessageBubbleProps) {
  const isSelf = message.author === "self";

  return (
    <div
      data-slot="chat-message-bubble"
      data-author={message.author}
      className={cn(
        "flex w-full flex-col",
        isSelf ? "items-end" : "items-start",
        className
      )}
    >
      <div
        className={cn(
          "max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed shadow-sm",
          isSelf
            ? "rounded-br-md bg-foreground text-background"
            : "rounded-bl-md bg-muted text-foreground"
        )}
      >
        <p className="whitespace-pre-wrap break-words">{message.text}</p>
      </div>

      <div
        className={cn(
          "mt-1 flex items-center gap-1 px-1 text-[11px] text-muted-foreground tabular-nums",
          isSelf ? "justify-end" : "justify-start"
        )}
      >
        <time dateTime={new Date(message.timestamp).toISOString()}>
          {formatTime(message.timestamp)}
        </time>
        {isSelf && <DeliveryTick status={message.deliveryStatus} />}
      </div>
    </div>
  );
}
