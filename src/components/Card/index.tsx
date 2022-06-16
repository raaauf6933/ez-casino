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
}

const Card: React.FC<CardProps> = props => {
  const { title, children } = props;

  return (
    <CardMui>
      {title ? (
        <>
          <CardHeader title={<span>{title}</span>} />
          <Divider />
        </>
      ) : null}
      <CardContent>{children}</CardContent>
    </CardMui>
  );
};

export default Card;
