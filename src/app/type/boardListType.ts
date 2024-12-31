export interface BoardListType {
  id: number;
  title: string;
  name: string;
  commentsCount: number;
  img: number;
}

export interface ReadBoardType {
  id: number;
  title: string;
  content: string;
  name: string;
  comment: CommentType[];
}

export interface CommentType {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
  };
}

export interface ReportListType {
  id: number;
  postID: number;
  title: string;
  type: string;
  reason: string;
  name: string;
}
