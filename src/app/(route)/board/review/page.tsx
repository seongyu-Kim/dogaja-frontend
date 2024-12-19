import List from "@/app/components/common/List";
import Board from "@/app/components/domain/Board";
import { mainApi } from "@/app/utils/mainApi";
import { string } from "postcss-selector-parser";

const list = [
  {
    id: 1,
    title: "1번",
    name: "여기저기",
    image_id: null,
    //임시
    comentCount: 6,
  },
  {
    id: 2,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    comentCount: 125,
  },
  {
    id: 3,
    title: "1번",
    name: "여기저기",
    image_id: null,
    //임시
    comentCount: 6,
  },
  {
    id: 4,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    comentCount: 125,
  },
  {
    id: 5,
    title: "1번",
    name: "여기저기",
    image_id: null,
    //임시
    comentCount: 6,
  },
  {
    id: 6,
    title: "3번",
    name: "이거저거",
    image_id: "aa",
    //임시
    comentCount: 125,
  },
];

export default async function ReviewBoardPage() {
  return (
    <div>
      <Board name="후기" list={list} />
    </div>
  );
}
