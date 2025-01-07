import Quill from "quill";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import ImageResize from "quill-image-resize";
import { storage } from "../../../firebaseConfig"; // Firebase 초기화 파일 경로
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { fileSize } from "@/app/utils/byteToSize";

Quill.register("modules/imageResize", ImageResize);

const imageHandler = () => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");

  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    if (file) {
      // Firebase Storage에 업로드할 경로 설정
      if (fileSize.byteToMb(file.size) > 5) {
        alert("이미지 크기는 5MB를 초과할 수 없습니다.");
        return;
      }
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        null, // 진행 상태를 처리할 콜백 (필요 없으면 null로 설정)
        (error) => {
          console.error("업로드 실패:", error); // 에러 처리
        },
        async () => {
          try {
            // 업로드 완료 후 다운로드 URL 가져오기
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);

            // 에디터에 이미지 삽입
            const editor = document.querySelector(".ql-editor");
            if (!editor) {
              console.error("에디터 요소를 찾을 수 없습니다.");
              return;
            }

            const img = document.createElement("img");
            img.setAttribute("src", downloadURL);
            img.setAttribute("style", "max-width: 100%; height: auto;");
            editor.appendChild(img);
          } catch (err) {
            console.error("다운로드 URL 가져오기 실패:", err);
          }
        },
      );
    }
  });

  input.click();
};

export const modules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ align: [] }],
      ["bold", "italic", "underline", "strike"], // 텍스트 스타일링
      [{ list: "ordered" }, { list: "bullet" }], // 목록
      [{ color: [] }, { background: [] }],
      ["link", "image"], // 링크와 이미지
    ],
    handlers: {
      image: imageHandler, // 이미지 핸들러 연결
    },
  },
  imageResize: {
    // 이미지 리사이즈 모듈 옵션 (필요 시 커스터마이징)
    modules: ["Resize", "DisplaySize", "Toolbar"],
  },
};
