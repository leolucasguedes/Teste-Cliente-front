import React from "react";

interface ButtonProps {
  loading: boolean;
}

const Button: React.FC<ButtonProps> = ({ loading }) => {
  if (!loading) {
    return <button type="submit">Cadastrar</button>;
  } else {
    return null;
  }
};

export default Button;
