import React, { ReactNode } from "react";

interface FormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  children: ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => {
  return <form onSubmit={onSubmit}>{children}</form>;
};

export default Form;
