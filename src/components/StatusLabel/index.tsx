import * as React from "react";
import { Chip } from "@mui/material";
import { AgentPayoutStatus, BatchPayoutStatusType, StatusType } from "types";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
interface StatusLabelProps {
  status: StatusType | AgentPayoutStatus | BatchPayoutStatusType;
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
    case AgentPayoutStatus.PENDING:
      return (
        <Chip
          icon={
            <FiberManualRecordIcon
              style={{
                color: "rgb(228 206 111)"
              }}
            />
          }
          color="warning"
          style={{
            color: "#0000007d",
            fontWeight: 600
          }}
          label={status}
        />
      );
    case BatchPayoutStatusType.COMPLETED:
      return (
        <Chip icon={<FiberManualRecordIcon />} color="primary" label={status} />
      );
    case BatchPayoutStatusType.ONGOING:
      return (
        <Chip
          icon={
            <FiberManualRecordIcon
              style={{
                color: "rgb(228 206 111)"
              }}
            />
          }
          color="warning"
          style={{
            color: "#0000007d",
            fontWeight: 600
          }}
          label={status}
        />
      );
    default:
      return <Chip icon={<FiberManualRecordIcon />} label={status} />;
  }
};

export default StatusLabel;
