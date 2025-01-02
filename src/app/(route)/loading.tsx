import Image from "next/image";
import LoadingGif from "@/app/assets/Loading.gif";

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Image src={LoadingGif} alt="로딩중" width={100} height={100} />
    </div>
  );
}
