export interface ScheduleType {
  id: number;
  title: string;
  location: string;
  period: string;
  review: string | null; //임시 타입 null로 작성되어 있어서 임시
  image: string | null; //임시 타입 null로 작성되어 있어서 임시
  user: User;
  friends: FriendList[];
}

interface User {
  id: string;
  name: string;
}

interface FriendList {
  id: number;
  userId: string;
  name: string;
}
