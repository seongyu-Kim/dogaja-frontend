export interface MessageType {
  roomId: number;
  message: string;
  senderName: string;
}

export interface ChatRoom {
  roomId: number;
  roomName: string;
}
/////////////////////위는 임시 더미데이터 타입

export interface AdminRoomReadType {
  room: {
    id: number;
    user: string;
    admin: string;
  };
  messages: MessagesType[];
}

export interface MessagesType {
  messageId: number;
  content: string;
  senderName: string;
}
