import React from 'react';

export const formatDate = (isoString: string) => {
  const date = new Date(isoString);

  const formattedDate = date.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedTime = date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${formattedDate} ${formattedTime}`;
};

interface FormattedDateProps {
  date: string;
}

const FormattedDate: React.FC<FormattedDateProps> = ({ date }) => {
  return <span>{formatDate(date)}</span>;
};

export default FormattedDate;
