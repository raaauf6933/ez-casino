import * as React from "react";
import { Box, Button, Typography } from "@mui/material";

interface ListPageActionProps {
  type?: string;
}

const ListPageAction: React.FC<ListPageActionProps> = () => {
  return (
    <>
      <Box marginLeft={2}>
        <Button variant="outlined">
          <Typography fontWeight={600} whiteSpace="nowrap">
            Upload Payout
          </Typography>{" "}
        </Button>
      </Box>
    </>
  );
};

export default ListPageAction;
