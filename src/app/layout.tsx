import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import ClientLayout from "./ClientLayout";

export const metadata: Metadata = {
  title: "Do가자",
  description: "여행플래너, Do가자",
  icons: {
    icon: "/assets/icon.ico",
  },
};

const font = localFont({
  src: "./fonts/Paperlogy-6SemiBold.ttf",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${font.className} antialiased flex flex-col flex-1`}>
        <ClientLayout>{children}</ClientLayout>
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_API_KEY}&libraries=services,clusterer`}
        ></script>
      </body>
    </html>
  );
}
