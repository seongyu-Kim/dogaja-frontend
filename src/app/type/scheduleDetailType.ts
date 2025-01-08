interface User {
  id: string;
  name: string;
}

export interface StartArriveInfo {
  id: number;
  date: string;
  start: string;
  arrive: string;
  vehicle: string;
  etc: string;
  type: "start" | "arrive";
}

export interface BucketListItem {
  id: number;
  content: string;
  checked: boolean;
  type: "bucket";
}

export interface CheckListItem {
  id: number;
  content: string;
  checked: boolean;
  type: "check";
}

export interface TravelLocation {
  id: number;
  location: string;
  address: string;
  latitude: string;
  longitude: string;
  phone: string;
}

export interface Friend {
  id: number;
  userId: string;
  name: string;
}

export interface TravelPlan {
  id: number;
  title: string;
  period: string;
  review: string | null;
  image: string | null;
  createdBy: User;
  startInfo: StartArriveInfo;
  arriveInfo: StartArriveInfo;
  bucketList: BucketListItem[];
  checkList: CheckListItem[];
  locations: TravelLocation[];
  friendList: Friend[];
}
