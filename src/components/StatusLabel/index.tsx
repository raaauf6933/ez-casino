import * as React from "react";
import { Chip } from "@mui/material";
import { StatusType } from "types";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

interface StatusLabelProps {
  status: StatusType;
}

const StatusLabel: React.FC<StatusLabelProps> = props => {
  const { status } = props;

  switch (status) {
    case StatusType.ACTIVE:
      return (
        <Chip icon={<FiberManualRecordIcon />} color="primary" label={status} />
      );
    case StatusType.INACTIVE:
      return <Chip icon={<FiberManualRecordIcon />} label={status} />;
    default:
      return <Chip icon={<FiberManualRecordIcon />} label={status} />;
  }
};

export default StatusLabel;
