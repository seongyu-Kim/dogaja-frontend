export interface BoardListType {
  id: number;
  title: string;
  name: string;
  commentsCount: string;
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
