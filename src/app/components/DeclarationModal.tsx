import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Button from "./common/Button";

import { API } from "@/app/utils/api";
import { mainApi } from "@/app/utils/mainApi";
import { SuccessAlert, ErrorAlert } from "@/app/utils/toastAlert";

interface DeclarationModalProps {
  isOpen: boolean;
  onClose: () => void;
  reportId: string;
}

const DeclarationModal: React.FC<DeclarationModalProps> = ({
  isOpen,
  onClose,
  reportId,
}) => {
  const [reportReason, setReportReason] = useState("");

  const handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement> = (
    e,
  ) => {
    setReportReason(e.target.value);
  };

  const handleSubmitReport = async () => {
    if (!reportReason.trim()) {
      alert("신고 사유를 입력해주세요.");
      return;
    }

    const REPORT_CREATE = API.REPORT.REPORT_CREATE(reportId);

    try {
      const res = await mainApi({
        url: REPORT_CREATE,
        method: "POST",
        data: { reason: reportReason },
        withAuth: true,
      });

      if (res.status === 201) {
        SuccessAlert("신고가 접수되었습니다.");
        onClose();
      }
    } catch (e) {
      console.error(e);
      ErrorAlert("신고 접수가 실패되었습니다.");
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setReportReason("");
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="신고 내용"
      explanation="해당 게시물을 신고하시겠습니까?"
    >
      <textarea
        name="reportReason"
        placeholder="신고 사유를 입력하세요"
        value={reportReason}
        onChange={handleInputChange}
        required
        className="mb-4 w-full h-32 px-3 py-2 border border-gray-300 rounded resize-none"
      />
      <Button
        onClick={handleSubmitReport}
        className="text-sm w-full"
        style={{
          backgroundColor: "bg-mainRed",
          hoverColor: "hover:bg-mainRedHover",
        }}
      >
        신고
      </Button>
    </Modal>
  );
};

export default DeclarationModal;
