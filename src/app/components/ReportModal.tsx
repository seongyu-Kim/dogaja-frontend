import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import Button from "./common/Button";

const ReportModal: React.FC<{ isOpen: boolean; onClose: () => void; }> = ({ isOpen, onClose }) => {
  const [reportReason, setReportReason] = useState("");

  const handleInputChange: React.ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    setReportReason(e.target.value);
  };

  const handleSubmitReport = () => {
    if (!reportReason.trim()) {
      alert("신고 사유를 입력해주세요.");
      return;
    }
    console.log("신고 내용:", reportReason);
    onClose();
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

export default ReportModal;
