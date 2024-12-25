import { BOARD_TYPES } from "@/app/utils/board-config";

export default function getBoardTitle(routerPath: string): string {
  const boardTypeKeys = Object.keys(BOARD_TYPES) as Array<
    keyof typeof BOARD_TYPES
  >;
  const matchedBoardType = boardTypeKeys.find((key) =>
    routerPath.includes(key),
  );
  return matchedBoardType ? BOARD_TYPES[matchedBoardType].title : "알 수 없음";
}
