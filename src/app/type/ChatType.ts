export interface MessageType {
  message: string;
  timestamp?: string;
  user?: string;
}

export interface ChatRoom {
  name: string;
  messages: number;
  lastMessage?: string;
  roomId: string; // 채팅방 식별자 추가
}
