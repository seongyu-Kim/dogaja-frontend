const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
// .env 파일에 아래 내용 추가해주세요
// NEXT_PUBLIC_BASE_URL=http://kdt-react-node-1-team02.elicecoding.com:3000
export const API = {
  USER: {
    MY_INFO_GET: `${BASE_URL}/user/profile`,
    SIGNUP: `${BASE_URL}/user/signup`,
    NAME_UPDATE: `${BASE_URL}/user/name`,
    PASSWORD_UPDATE: `${BASE_URL}/user/password`,
    USER_DELETE: `${BASE_URL}/user`,
  },
  AUTH: {
    LOGIN: `${BASE_URL}/auth/login`,
    LOGOUT: `${BASE_URL}/auth/logout`,
    RESET_PASSWORD_REQUEST: `${BASE_URL}/auth/password/request-reset`,
    RESET_PASSWORD: (token: string) =>
      `${BASE_URL}/auth/reset-password/${token}`,
  },
  BOOKMARK: {
    BOOKMARK_ALL_GET: `${BASE_URL}/bookmark`,
    BOOKMARK_CREATE: `${BASE_URL}/bookmark/create`,
    BOOKMARK_READ: (id: string) => `${BASE_URL}/bookmark/${id}`,
    BOOKMARK_DELETE: (id: string) => `${BASE_URL}/bookmark/${id}`,
  },
  BOARD: {
    BOARD_ALL_GET: `${BASE_URL}/post`,
    BOARD_FRIEND_GET: `${BASE_URL}/post/friend`,
    BOARD_ASK_GET: `${BASE_URL}/post/ask`,
    BOARD_REVIEW_GET: `${BASE_URL}/post/review`,
    BOARD_WITH_GET: `${BASE_URL}/post/with`,
    BOARD_MY_POST: `${BASE_URL}/post/my`,
    POST_CREATE: `${BASE_URL}/post/create`,
    POST_READ: (id: string) => `${BASE_URL}/post/${id}`,
    POST_UPDATE: (id: string) => `${BASE_URL}/post/${id}`,
    POST_DELETE: (id: string) => `${BASE_URL}/post/${id}`,
  },
  FRIENDS: {
    FRIENDS_REQUEST_GET: `${BASE_URL}/friends/requests/received`,
    FRIENDS_LIST_GET: `${BASE_URL}/friends/list`,
    FRIENDS_REQUEST_POST: `${BASE_URL}/friends/request`,
    FRIENDS_REQUEST_PATCH: (friendId: string) =>
      `${BASE_URL}/friends/requests/${friendId}/respond`,
    FRIENDS_DELETE: (friendId: string) => `${BASE_URL}/friends/${friendId}`,
    FRIENDS_SEARCH: (friendName: string) =>
      `${BASE_URL}/friends/search?keyword=${friendName}`,
  },
  NOTIFICATION: {
    NOTIFICATION_GET:`${BASE_URL}/notifications`,
    NOTIFICATION_READ: (id: string) => `${BASE_URL}/notifications/${id}`,
  },
  COMMENT: {
    COMMENT_CREATE: (id: string) => `${BASE_URL}/comment/${id}`,
    COMMENT_UPDATE: (id: string, commentId: string) =>
      `${BASE_URL}/comment/${id}/${commentId}`,
    COMMENT_DELETE: (id: string, commentId: string) =>
      `${BASE_URL}/comment/${id}/${commentId}`,
  },
  REPORT: {
    REPORT_GET: `${BASE_URL}/report`,
    REPORT_DELETE: (id: string) => `${BASE_URL}/report/${id}`,
    REPORT_CREATE: (id: string) => `${BASE_URL}/report/${id}`,
  },
  SCHEDULE: {
    SCHEDULE_CREATE: `${BASE_URL}/schedule/create`,
    SCHEDULE_LIST_GET: `${BASE_URL}/schedule`,
    SCHEDULE_GET: (scheduleId: string) => `${BASE_URL}/schedule/${scheduleId}`,
    SCHEDULE_UPDATE: (scheduleId: string) =>
      `${BASE_URL}/schedule/${scheduleId}`,
    SCHEDULE_IMAGE_UPDATE: (scheduleId: string) =>
      `${BASE_URL}/schedule/${scheduleId}/image`,
    SCHEDULE_DELETE: (scheduleId: string) =>
      `${BASE_URL}/schedule/${scheduleId}`,
    SCHEDULE_LIST_CHECK: (scheduleId: string, listsId: string) =>
      `${BASE_URL}/schedule/${scheduleId}/${listsId}/checked`,
    SCHEDULE_ADD_FRIEND: (scheduleId: string) =>
      `${BASE_URL}/schedule/${scheduleId}/friends`,
    SCHEDULE_DELETE_FRIEND: (scheduleId: string, friendId: string) =>
      `${BASE_URL}/schedule/${scheduleId}/${friendId}`,
    SCHEDULE_ADD_LOCATION: (scheduleId: string) =>
      `${BASE_URL}/schedule/${scheduleId}/location`,
    SCHEDULE_DELEDT_LOCATION: (scheduleId: string, locationId: string) =>
      `${BASE_URL}/schedule/location/${scheduleId}/${locationId}`,

  },
  SEARCH: {
    SEARCH_RESULT: `${BASE_URL}/search/result`,
  },
  CHAT: {
    CHAT_ROOM_LIST_READ: `${BASE_URL}/chat/rooms`,
  },
};