import * as React from "react";
import ButtonComponent from "@mui/material/Button";
import { ThemeProvider } from "@mui/material/styles";
import theme from "theme";
import { ButtonProps as ButtonMuiProps } from "@mui/material";

interface ButtonProps extends ButtonMuiProps {
  children: string;
}

const Button: React.FC<ButtonProps> = props => {
  const { children } = props;
  return (
    <ThemeProvider theme={theme()}>
      <ButtonComponent {...props}>{children}</ButtonComponent>
    </ThemeProvider>
  );
};

export default Button;
