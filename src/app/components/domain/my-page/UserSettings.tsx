import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import Input from "@/app/components/common/Input";
import Button from "@/app/components/common/Button";
import { FaUserEdit } from "react-icons/fa";
import { useUserStore } from "@/app/store/userStore";
import { SuccessAlert, ErrorAlert } from "@/app/utils/toastAlert";
import { API } from "@/app/utils/api";
import { mainApi } from "@/app/utils/mainApi";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";

const UserSettings = () => {
  const { user, fetchUser, isLogin } = useUserStore();
  const [isEditingName, setIsEditingName] = useState<boolean>(false);
  const [isChangingPassword, setIsChangingPassword] = useState<boolean>(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    mode: "onChange",
  });

  useEffect(() => {
    if (isLogin) {
      fetchUser();
    }
  }, [fetchUser, isLogin]);

  useEffect(() => {
    if (user) {
      setValue("name", user?.name || "알 수 없는 사용자");
    }
  }, [user, setValue]);

  // 이름 변경
  const handleNameChange: SubmitHandler<FieldValues> = async (data) => {
    if (!isLogin) {
      ErrorAlert("로그인 후 이용해주세요.");
      return;
    }

    try {
      const res = await mainApi({
        url: API.USER.NAME_UPDATE,
        method: "PUT",
        data: { name: data.name },
        withAuth: true,
      });

      if (res.status === 200) {
        setIsEditingName(false);
        await fetchUser();
        SuccessAlert("닉네임이 변경되었습니다.");
      }
    } catch (e) {
      ErrorAlert("닉네임 변경에 실패하였습니다.");
    }
  };

  // 비밀번호 변경
  const handlePasswordChange: SubmitHandler<FieldValues> = async (data) => {
    if (!isLogin) {
      ErrorAlert("로그인 후 이용해주세요.");
      return;
    }

    if (data.newPassword !== data.confirmPassword) {
      ErrorAlert("새 비밀번호와 새 비밀번호 확인이 일치하지 않습니다.");
      return;
    }

    try {
      const res = await mainApi({
        url: API.USER.PASSWORD_UPDATE,
        method: "PUT",
        data: {
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          confirmPassword: data.confirmPassword,
        },
        withAuth: true,
      });

      if (res.status === 200) {
        setIsChangingPassword(false);
        SuccessAlert("비밀번호가 변경되었습니다.");
      }
    } catch (e) {
      ErrorAlert("비밀번호 변경에 실패하였습니다.");
    }
  };

  // 회원탈퇴
  const handleUserDelete = async () => {
    if (!isLogin) {
      ErrorAlert("로그인 후 이용해주세요.");
      return;
    }

    if (window.confirm("정말로 계정을 탈퇴하시겠습니까?")) {
      try {
        const res = await mainApi({
          url: API.USER.USER_DELETE,
          method: "DELETE",
          withAuth: true,
        });

        if (res.status === 200) {
          localStorage.removeItem("token");
          SuccessAlert("회원탈퇴가 완료되었습니다.");
          setTimeout(() => {
            router.push("/");
          }, 1200);
        }
      } catch (e) {
        ErrorAlert("회원탈퇴에 실패하였습니다.");
      }
    }
  };

  return (
    <div className="flex flex-col p-4 space-y-4 border-2 border-mainColor rounded-lg shadow-md relative">
      <div className="flex items-center justify-between">
        <h2 className="flex text-lg p-3 items-center">
          <FaUserEdit className="w-6 h-auto mr-2" /> 내 정보
        </h2>
        {/* 탈퇴하기 */}
          <Button
            style={{
              backgroundColor: "bg-none",
              textSize: "text-xs",
              textColor: "text-mainRed",
              padding: "px-1",
              hover: "hover:scale-105 hover:underline",
            }}
            onClick={() => {
              if (!isLogin) {
                ErrorAlert("로그인 후 이용해주세요.");
                return;
              }
              handleUserDelete();
            }}
          >
            탈퇴하기
          </Button>
      </div>

      {/* 닉변 */}
      <div className="flex flex-col items-center">
        <label className="block text-gray-700">닉네임</label>
        {isEditingName ? (
          <form
            onSubmit={handleSubmit(handleNameChange)}
            className="flex items-center space-x-2"
          >
            <Input
              type="text"
              placeholder="닉네임"
              {...register("name", { required: "닉네임을 입력해주세요" })}
              className="pl-2"
            />
            <Button
              style={{
                hoverColor: "hover:bg-[#3CB731]",
                backgroundColor: "bg-[#6AC662]",
                textSize: "text-sm",
                padding: "px-3 py-1",
              }}
              type="submit"
              disabled={isSubmitting}
            >
              저장
            </Button>
            <Button
              style={{
                hoverColor: "hover:bg-[#FF3A3E]",
                backgroundColor: "bg-[#E03437]",
                textSize: "text-sm",
                padding: "px-3 py-1",
              }}
              onClick={() => {
                setIsEditingName(false);
                setValue("name", user?.name || "알 수 없는 사용자");
              }}
            >
              닫기
            </Button>
          </form>
        ) : (
          <div className="flex items-center space-x-2">
            <span>{user?.name || "알 수 없는 사용자"}</span>
            <Button
              style={{
                textColor: "text-mainColor",
                backgroundColor: "bg-none",
                textSize: "text-sm",
                padding: "px-2",
                hover: "hover:scale-125",
              }}
              onClick={() => {
                if (!isLogin) {
                  ErrorAlert("로그인 후 이용해주세요.");
                  return;
                }
                setIsEditingName(true);
              }}
            >
              <MdEdit className="text-lg" />
            </Button>
          </div>
        )}
      </div>

      {/* 비밀번호 변경 */}
      <div className="flex flex-col items-center">
        {!isChangingPassword ? (
          <Button
            style={{
              hoverColor: "hover:bg-[#3CB731]",
              backgroundColor: "bg-[#6AC662]",
              textSize: "text-sm",
              padding: "px-3 py-1",
            }}
            onClick={() => {
              if (!isLogin) {
                ErrorAlert("로그인 후 이용해주세요.");
                return;
              }
              setIsChangingPassword(true);
            }}
          >
            비밀번호 변경
          </Button>
        ) : (
          <form
            onSubmit={handleSubmit(handlePasswordChange)}
            className="flex flex-col space-y-2"
          >
            <Input
              type="password"
              placeholder="현재 비밀번호"
              {...register("currentPassword", {
                required: "현재 비밀번호를 입력해주세요",
              })}
              className="pl-2 placeholder:text-sm"
            />
            <Input
              type="password"
              placeholder="새 비밀번호"
              {...register("newPassword", {
                required: "새 비밀번호를 입력해주세요",
                minLength: {
                  value: 8,
                  message: "비밀번호는 8자 이상이어야 합니다",
                },
                maxLength: {
                  value: 20,
                  message: "비밀번호는 20자 이하이어야 합니다",
                },
              })}
              className="pl-2 placeholder:text-sm"
            />
            <Input
              type="password"
              placeholder="새 비밀번호 확인"
              {...register("confirmPassword", {
                required: "새 비밀번호 확인을 입력해주세요",
                validate: (value) =>
                  value === watch("newPassword") ||
                  "비밀번호가 일치하지 않습니다",
              })}
              className="pl-2 placeholder:text-sm"
            />
            {errors.newPassword &&
              typeof errors.newPassword.message === "string" && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )}

            {errors.confirmPassword &&
              typeof errors.confirmPassword.message === "string" && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}

            <div className="flex justify-center gap-2">
              <Button
                style={{
                  hoverColor: "hover:bg-[#3CB731]",
                  backgroundColor: "bg-[#6AC662]",
                  textSize: "text-sm",
                  padding: "px-3 py-1",
                }}
                type="submit"
                disabled={isSubmitting}
              >
                변경
              </Button>
              <Button
                style={{
                  hoverColor: "hover:bg-[#FF3A3E]",
                  backgroundColor: "bg-[#E03437]",
                  textSize: "text-sm",
                  padding: "px-3 py-1",
                }}
                onClick={() => {
                  setIsChangingPassword(false);
                  setValue("currentPassword", "");
                  setValue("newPassword", "");
                  setValue("confirmPassword", "");
                }}
              >
                닫기
              </Button>
            </div>
          </form>
        )}
      </div>

    </div>
  );
};

export default UserSettings;
