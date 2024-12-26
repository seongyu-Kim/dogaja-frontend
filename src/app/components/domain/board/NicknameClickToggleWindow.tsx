interface Props {
  x: number;
  y: number;
}

export default function NicknameClickToggleWindow({ x, y }: Props) {
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
      <li>친구 추가</li>
    </ul>
  );
}
