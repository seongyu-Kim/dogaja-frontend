import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  list: ReactNode;
}

export default function Layout({ children, list }: Props) {
  return (
    <div className="flex flex-col">
      <div className="flex-1">{children}</div>
      <div className="flex-1">{list}</div>
    </div>
  );
}
