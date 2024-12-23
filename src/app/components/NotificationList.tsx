import React from 'react';

export interface Notification {
  id: number;
  type: 'friend' | 'invite';
  userId: number;
  name: string;
  code: string;
}

interface NotificationListProps {
  notifications: Notification[];
  onNotificationClick: (notification: Notification) => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onNotificationClick,
}) => {
  return (
    <div className="max-h-60 text-sm overflow-y-auto bg-mainColor rounded shadow-lg p-4">
      {notifications.length === 0 ? (
        <p className="text-center text-white text-sm">알림이 없습니다.</p>
      ) : (
        <ul>
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className="flex items-center border-b border-white py-2 cursor-pointer hover:underline transition"
              onClick={() => onNotificationClick(notification)}
            >
              <span className="flex-1">
                {notification.type === 'friend' && '🖐 '}
                {notification.type === 'invite' && '🎉 '}
                {notification.name}님의 {notification.code} 요청
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotificationList;
