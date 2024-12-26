import { BOARD_TYPES } from "@/app/utils/board-config";

import {
  getAskBoardList,
  getFriendBoardList,
  getReviewBoardList,
  getWithBoardList,
} from "@/app/actions";

type BoardType = keyof typeof BOARD_TYPES;

export default async function boardTypeRequest(board: BoardType) {
  if (board === "friend") {
    return await getFriendBoardList();
  }
  if (board === "ask") {
    return await getAskBoardList();
  }
  if (board === "review") {
    return await getReviewBoardList();
  }
  if (board === "with") {
    return await getWithBoardList();
  }
}
