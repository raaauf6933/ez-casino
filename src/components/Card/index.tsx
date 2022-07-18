import * as React from "react";
import {
  CardContent,
  Card as CardMui,
  CardHeader,
  Divider
} from "@mui/material";

interface CardProps {
  title?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

const Card: React.FC<CardProps> = props => {
  const { title, children, action } = props;

  return (
    <CardMui>
      {title ? (
        <>
          <CardHeader title={<span>{title}</span>} action={action} />
          <Divider />
        </>
      ) : null}
      <CardContent>{children}</CardContent>
    </CardMui>
  );
};

export default Card;
