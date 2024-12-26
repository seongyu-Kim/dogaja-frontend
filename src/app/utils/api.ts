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
    BOARD_ASK_GET: `${BASE_URL}/ask`,
    BOARD_REVIEW_GET: `${BASE_URL}/post/review`,
    BOARD_WITH_GET: `${BASE_URL}/post/with`,
    POST_CREATE: `${BASE_URL}/post/create`,
    POST_READ: (id: string) => `${BASE_URL}/post/${id}`,
    POST_UPDATE: (id: string) => `${BASE_URL}/post/${id}`,
    POST_DELETE: (id: string) => `${BASE_URL}/post/${id}`,
  },
  COMMENT: {
    COMMENT_CREATE: (id: string) => `${BASE_URL}/comment/${id}`,
    COMMENT_UPDATE: (id: string, commentId: string) =>
      `${BASE_URL}/comment/${id}/${commentId}`,
    COMMENT_DELETE: (id: string, commentId: string) =>
      `${BASE_URL}/comment/${id}/${commentId}`,
  },
};
