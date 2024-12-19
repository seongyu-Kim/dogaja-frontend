import { toast } from "react-toastify";

export const SuccessAlert = (message: string) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false, // 시간 진행 바? On Off 옵션입니다
    closeOnClick: true,
  });
};

export const ErrorAlert = (message: string) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false, // 시간 진행 바? On Off 옵션입니다
    closeOnClick: true,
  });
};
