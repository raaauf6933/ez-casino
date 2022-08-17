import { Grid, Skeleton } from "@mui/material";
import PageHeader from "components/PageHeader";
import React from "react";
import { maybe } from "utils/misc";
import PayoutBatchDetails from "../PayoutBatchDetails";
import PayoutBatchInfo from "../PayoutBatchInfo";
import SaveButtonBar from "components/SaveButtonBar";
import { useNavigate } from "react-router-dom";
import { payoutSection } from "page/Payout/url";
import StatusLabel from "components/StatusLabel";
import { BatchPayoutStatusType } from "types";
interface DetailsPageProps {
  batchInfo?: any;
  agentPayouts: any[];
  setSearchValue: (data: string) => void;
  searchValue: string;
  onUpdateStatus: (status: BatchPayoutStatusType) => void;
}

const DetailsPage: React.FC<DetailsPageProps> = props => {
  const {
    agentPayouts,
    batchInfo,
    searchValue,
    setSearchValue,
    onUpdateStatus
  } = props;
  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title={maybe(
          () => (
            <>
              {batchInfo.id} <StatusLabel status={batchInfo?.status} />
            </>
          ),
          <Skeleton variant="text" />
        )}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <PayoutBatchDetails
            data={agentPayouts}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <PayoutBatchInfo data={batchInfo} onUpdateStatus={onUpdateStatus} />
        </Grid>
      </Grid>
      {batchInfo?.status !== "ONGOING" ? null : (
        <SaveButtonBar
          onSave={() => onUpdateStatus(BatchPayoutStatusType.COMPLETED)}
          labels={{
            back: "Back",
            save: "Completed"
          }}
          onBack={() => navigate(payoutSection)}
          loading={false}
        />
      )}
    </>
  );
};

export default DetailsPage;
