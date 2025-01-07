export interface NotificationType {
  id: string;
  senderName: string;
  type: "friend_request" | "schedule_invite" ;
  isRead: boolean;
}
