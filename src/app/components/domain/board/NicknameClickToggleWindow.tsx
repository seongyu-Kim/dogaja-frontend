import { requestFriend } from "@/app/utils/boardApi";
import { ErrorAlert, SuccessAlert } from "@/app/utils/toastAlert";

interface Props {
  name: string;
  onClose: (state: boolean) => void;
  x: number;
  y: number;
}

export default function NicknameClickToggleWindow({
  name,
  onClose,
  x,
  y,
}: Props) {
  const handleRequestFriendClick = async () => {
    if (!name) return;
    const requestConfirm = confirm(`${name}님에게 친구 요청을 보내시겠습니까?`);
    if (requestConfirm) {
      const res = await requestFriend(name);
      if (res === 201) {
        SuccessAlert(`${name}님에게 친구 요청을 보냈습니다`);
        onClose(false);
        return;
      }
      if (res === 400) {
        ErrorAlert(`${name}님에게 이미 친구 요청을 보냈습니다`);
        onClose(false);
        return;
      }
      onClose(false);
      ErrorAlert("친구 요청 실패");
    }
  };
  return (
    <ul
      style={{
        top: y,
        left: x,
      }}
      className={`
    absolute 
    bg-white 
    border 
    border-gray-300 
    rounded-md 
    py-4
    px-6 
    shadow-lg 
    z-[1000]
  `}
    >
      <li className="cursor-pointer" onClick={handleRequestFriendClick}>
        친구 추가
      </li>
    </ul>
  );
}
