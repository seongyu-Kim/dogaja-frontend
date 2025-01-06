import React from 'react';

export const formatDate = (date: string | Date) => {
  if (!date) return '';

  const dateObject = typeof date === 'string' ? new Date(date) : date;

  return dateObject.toLocaleDateString('ko-KR');
};

interface FormattedDateProps {
  date: string;
}

const FormattedDate: React.FC<FormattedDateProps> = ({ date }) => {
  return <span>{formatDate(date)}</span>;
};

export default FormattedDate;
