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
/////////////////////위는 임시 더미데이터 타입

export interface AdminRoomReadType {
  room: {
    id: number;
    user: string;
    admin: string;
  };
  message: messageType[];
}

interface messageType {
  messageId: number;
  content: string;
  senderName: string;
}
