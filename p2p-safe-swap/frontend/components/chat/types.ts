export type MessageAuthor = "self" | "counterpart";

export interface ChatMessageBase {
  id: string;
  timestamp: string | Date;
  author: MessageAuthor;
}

export interface TextMessage extends ChatMessageBase {
  type: "text";
  text: string;
  deliveryStatus?: "sent" | "delivered" | "read";
}
