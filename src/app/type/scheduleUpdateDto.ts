export interface Title {
  title: string;
}

export interface Schedule {
  date: Date | null;
  start: string;
  arrive: string;
  vehicle: string;
  etc: string;
  type: "start" | "arrive";
}

export interface Review {
  review: string;
}

export interface CheckItem {
  content: string;
  type: "check" | "bucket";
}

export interface UpdateDto {
  scheduleDto: Title;   // 여행 제목
  startDto: Schedule;   // 출발 정보
  arriveDto: Schedule;  // 도착 정보
  reviewDto: Review;    // 후기
  bucketDto: CheckItem[]; // 버킷리스트 항목
  checkDto: CheckItem[]; // 체크리스트 항목
}

