import { Box, TextField } from "@mui/material";
import ActionDialog from "components/ActionDialog";
import Form from "components/Form";
import React from "react";
import { restrictToNumber } from "utils/misc";

interface ClubRequestCashDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { amount: number }) => void;
}

const ClubRequestCashDialog: React.FC<ClubRequestCashDialogProps> = props => {
  const { open, onClose, onSubmit } = props;
  return (
    <>
      <Form
        initial={{
          amount: 0
        }}
        onSubmit={onSubmit}
      >
        {({ data, submit, change }) => (
          <>
            <ActionDialog
              open={open}
              onClose={onClose}
              title={"Request Cash"}
              onSubmit={submit}
              disabled={!data.amount || data.amount < 1}
            >
              <Box
                style={{
                  width: "320px"
                }}
              >
                <TextField
                  onKeyPress={restrictToNumber}
                  label="Cash Amount"
                  name="amount"
                  value={data.amount}
                  onChange={change}
                  fullWidth
                />
              </Box>
            </ActionDialog>
          </>
        )}
      </Form>
    </>
  );
};

export default ClubRequestCashDialog;
