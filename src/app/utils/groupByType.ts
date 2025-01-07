import { BoardListType, DataType } from "@/app/type/boardListType";

// 타입별로 분리
export function groupByType(data: DataType[]): Record<string, BoardListType[]> {
  return data.reduce(
    (acc, item) => {
      const { type } = item;
      if (!acc[type]) {
        acc[type] = [];
      }
      acc[type].push(item);
      return acc;
    },
    {} as Record<string, BoardListType[]>,
  );
}
