import Board from "@/app/components/domain/board/Board";

const testList = [
  // 임시 테스트 리스트
  {
    id: 1,
    title: "1번",
    name: "여기저기",
    image_id: null,
    //임시
    commentCount: 6,
  },
  {
    id: 2,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
  {
    id: 3,
    title: "1번",
    name: "여기저기",
    image_id: null,
    //임시
    commentCount: 6,
  },
  {
    id: 4,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
  {
    id: 5,
    title: "1번",
    name: "여기저기",
    image_id: null,
    //임시
    commentCount: 6,
  },
  {
    id: 6,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    commentCount: 125,
  },
];

export default async function ReviewBoardPage() {
  return (
    <div>
      <Board name="후기" list={testList} />
    </div>
  );
}
