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
        (error) => {
          console.error("업로드 실패:", error);
        },
        () => {
          // 업로드 완료 후 퍼블릭 URL 가져오기
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const editor = document.querySelector(".ql-editor");
            const img = document.createElement("img");
            img.setAttribute("src", downloadURL); // Firebase에서 제공하는 URL
            img.setAttribute("style", "max-width: 100%; height: auto;");
            editor?.appendChild(img); // 에디터에 이미지 삽입
          });
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
