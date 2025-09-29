import React from 'react';

type ButtonProps = {
  text: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ text, ...rest }) => {
  return (
    <button className="common-button" {...rest}>
      {text}
    </button>
  );
};

export default Button;