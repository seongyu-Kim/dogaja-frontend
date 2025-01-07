export interface NotificationType {
  id: string;
  sendername: string;
  type: "friend_request" | "schedule_invite" ;
  isRead: boolean;
}
