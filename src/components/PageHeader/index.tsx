import React from "react";
import { Box, Divider, Typography } from "@mui/material";

interface PageHeaderProps {
  title: string | React.ReactNode | undefined;
  toolbar?: React.ReactNode;
}

const PageHeader: React.FC<PageHeaderProps> = props => {
  const { title, toolbar } = props;

  return (
    <>
      <Box marginTop={4} marginBottom={4}>
        <Box display="flex" justifyContent="space-between" marginBottom={3}>
          <Typography variant="h4" fontWeight="600">
            {title}
          </Typography>
          <div>{toolbar}</div>
        </Box>
        <Divider />
      </Box>
    </>
  );
};

export default PageHeader;
