export interface BoardPropTypes {
  content?: "detail" | "list";
  name?: string;
  detailList?: boolean;
  postId?: string; // 게시글 상세보기 안에 리스트에서 현재 게시물 표기 위해 사용
  list?: any[]; // 임시타입
}
