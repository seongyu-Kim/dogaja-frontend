import { mainApi } from "@/app/utils/mainApi";

// 예시
// export async function test() {
//     const link = "api/123";
//     const body = {
//         title: "제목",
//         des: "설명",
//     };
//     try {
//         const res = await mainApi({
//             url: link, // 필수 값
//             method: "GET", // 필수 값
//             data: body,
//             withCredentials = true // 기본값 false - 인증 정보(토큰 등) 쿠키 사용한다면 true로 보내주세요
//             withAuth = true // 기본값 false - 로그인과 같이 토큰 사용해 인증한다면 true로 바꿔주세요
//         });
//         if (res.status === 200) {
//             console.log("테스트 성공");
//         }
//     } catch (e) {
//         // throw new Error("에러");
//         console.error(e);
//     }
// }
