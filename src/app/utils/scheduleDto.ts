export interface FriendDto {
  name: string; // 친구 이름
}

export interface ScheduleDto {
  title: string; // 여행 제목
}

export interface StartDto {
  date: string; // 출발 날짜
  start: string; // 출발지
  arrive: string; // 도착지
  vehicle: string; // 교통수단
  etc: string; // 추가 정보
  type: string; // 타입 (start)
}

export interface ArriveDto {
  date: string; // 도착 날짜
  start: string; // 도착지
  arrive: string; // 출발지
  vehicle: string; // 교통수단
  etc: string; // 추가 정보
  type: string; // 타입 (arrive)
}

export interface BucketItem {
  content: string; // 버킷리스트 아이템
  type: string; // 타입 (bucket)
}

export interface CheckItem {
  content: string; // 체크리스트 아이템
  type: string; // 타입 (check)
}
