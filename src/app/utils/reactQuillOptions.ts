import Quill from "quill";
import ImageResize from "quill-image-resize";

Quill.register("modules/imageResize", ImageResize);

const imageHandler = () => {
  const input = document.createElement("input");
  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");

  input.addEventListener("change", async () => {
    const file = input.files?.[0];
    if (file) {
      // 이미지 업로드를 위한 서버 통신 또는 Base64 처리
      const reader = new FileReader();
      reader.onload = () => {
        const editor = document.querySelector(".ql-editor");
        const img = document.createElement("img");
        img.setAttribute("src", reader.result as string);
        editor?.appendChild(img);
      };
      reader.readAsDataURL(file);
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
