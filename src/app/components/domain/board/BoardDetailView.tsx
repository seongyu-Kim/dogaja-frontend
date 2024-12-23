import Link from "next/link";
import { FaArrowAltCircleLeft, FaComments } from "react-icons/fa";
import Button from "@/app/components/common/Button";
import CommentList from "@/app/components/domain/board/CommentList";
import CommentCreate from "@/app/components/domain/board/CommentCreate";
import { getBoardCategory } from "@/app/utils/getBoardCategory";
import DOMPurify from "isomorphic-dompurify";

const testList = [
  // 임시 테스트 리스트
  {
    id: 1,
    name: "여기저기",
    comment: "1번 댓글입니다",
  },
  {
    id: 2,
    name: "이거저거",
    comment: "2번 댓글입니다",
  },
  {
    id: 3,
    name: "여기저기",
    comment: "3번 댓글입니다",
  },
];

export default async function BoardDetailView({ id }: { id: string }) {
  //api 요청 할 때 category값에 따라서 id도 같이 보내주기 userId랑 비교해서 수정 삭제 버튼 필터
  //새로 고침시 카테고리 함수...이전 상태를 저장 하는 문제가 있음 headersList.get("referer")...추후 수정 예정
  const category = getBoardCategory();
  const categoryMap: Record<string, string> = {
    findFriend: "친구 구함",
    inquiry: "문의",
    review: "후기",
    together: "동행",
    report: "신고",
  };
  const categoryName = category ? categoryMap[category] : "알 수 없음";
  return (
    <div className="flex justify-center">
      <div className="flex flex-col w-[50%] h-auto gap-5 pt-10 px-3 bg-gray-100">
        <Link href="./">
          <p>{categoryName}</p>
        </Link>
        <Link href="./" className="flex gap-1 items-center">
          <Button
            style={{
              backgroundColor: "bg-mainColor",
              hoverColor: "hover:bg-mainHover",
            }}
          >
            <div className="flex gap-1">
              <FaArrowAltCircleLeft className="w-[25px] h-[25px]" />
              <span>이전</span>
            </div>
          </Button>
        </Link>
        <div className="flex flex-col gap-5 mb-10">
          <ContentArea />
        </div>
        <div>
          <ButtonBox postId={id} />
        </div>
        <CommentArea />
        <CommentCreate />
      </div>
    </div>
  );
}
//본문 영역
function ContentArea() {
  //임시 콘텐츠
  const content =
    "<p>콘텐츠입니다</p><br><button>클릭해주세요</button><br><img src='' alt='깨진이미지'/><br><script>alert('안녕하세요')</script>";
  return (
    <>
      <h1 className="text-3xl break-words">제목</h1>
      <div className="flex bg-gray-300 p-1 rounded-[4px] break-words">
        <p>닉네임</p>
      </div>
      <div className="pb-20 border-b border-gray-400 break-words mt-5">
        <p>내용</p>
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(content, {
              ALLOWED_TAGS: [],
              ALLOWED_ATTR: [],
            }),
          }}
        />
      </div>
    </>
  );
}
//버튼 영역
function ButtonBox({ postId }: { postId: string }) {
  const a = true; //임시 추후 유저 데이터 값으로 버튼 필터링
  return (
    <div className="flex items-center justify-between">
      <p>신고</p>
      <div className="flex gap-2">
        <Link href="./create">
          <Button
            style={{
              backgroundColor: "bg-mainColor",
              hoverColor: "hover:bg-mainHover",
              width: "w-[90px]",
            }}
          >
            글 작성
          </Button>
        </Link>
        {a && (
          <Link href={`./${postId}/update`}>
            <Button
              style={{
                backgroundColor: "bg-mainColor",
                hoverColor: "hover:bg-mainHover",
                width: "w-[90px]",
              }}
            >
              수정
            </Button>
          </Link>
        )}
        {a && (
          <Button
            style={{
              backgroundColor: "bg-mainColor",
              hoverColor: "hover:bg-mainHover",
              width: "w-[90px]",
            }}
          >
            삭제
          </Button>
        )}
      </div>
    </div>
  );
}
// 댓글 영역
function CommentArea() {
  return (
    <div className="flex flex-col gap-3 border-b border-gray-400 pb-6">
      <div className="flex gap-3 items-center">
        <FaComments className="w-[35px] h-[35px] text-gray-400" />
        <p>{1} 댓글(댓글 배열 길이 넣기~)</p>
      </div>
      <div>
        <CommentList list={testList} />
      </div>
    </div>
  );
}
