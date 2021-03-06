import { Grid, Skeleton } from "@mui/material";
import PageHeader from "components/PageHeader";
import React from "react";
import { maybe } from "utils/misc";
import PayoutBatchDetails from "../PayoutBatchDetails";
import PayoutBatchInfo from "../PayoutBatchInfo";

interface DetailsPageProps {
  batchInfo?: any;
  agentPayouts: any[];
}

const DetailsPage: React.FC<DetailsPageProps> = props => {
  const { agentPayouts, batchInfo } = props;

  return (
    <>
      <PageHeader
        title={maybe(() => batchInfo.id, <Skeleton variant="text" />)}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8} lg={8}>
          <PayoutBatchDetails data={agentPayouts} />
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={4}>
          <PayoutBatchInfo data={batchInfo} />
        </Grid>
      </Grid>
    </>
  );
};

export default DetailsPage;
