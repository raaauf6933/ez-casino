import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Divider,
  DialogActions,
  Button
} from "@mui/material";
import * as React from "react";

interface ActionDialogProps {
  open: boolean;
  children: React.ReactNode;
  disabled?: boolean;
  onClose: () => void;
  title: string;
  onSubmit: () => void;
  label?: {
    save?: string;
  };
}

const ActionDialog: React.FC<ActionDialogProps> = props => {
  const { children, open, onClose, title, onSubmit, label, disabled } = props;

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          <Typography>{title}</Typography>
        </DialogTitle>
        <Divider />
        <DialogContent>{children}</DialogContent>
        <Divider />
        <DialogActions>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onSubmit} disabled={disabled}>
            {label?.save || "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ActionDialog;
