import { Button, Grid, Skeleton, Typography } from "@mui/material";
import Card from "components/Card";
import PageHeader from "components/PageHeader";
import SaveButtonBar from "components/SaveButtonBar";
import StatusLabel from "components/StatusLabel";
import Table from "components/Table";
import { ClubPayoutListUrl } from "page/ClubSettlement/url";
// import { club_payout_data as data } from "page/ClubSettlement/data";
import { club_batch_payoutdetails_column } from "page/ClubSettlement/utils";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { currencyFormat } from "utils/currencyFormat";
import { maybe } from "utils/misc";

interface ClubPayoutDetailsPageProps {
  data?: any;
  payout_details: any;
  loading: boolean;
  onUpdateBatch: (data: string) => void;
}

const ClubPayoutDetailsPage: React.FC<ClubPayoutDetailsPageProps> = props => {
  const { payout_details, data, loading, onUpdateBatch } = props;

  const navigate = useNavigate();

  return (
    <>
      <PageHeader
        title={maybe(
          () => (
            <>
              {payout_details?.id}{" "}
              <StatusLabel status={payout_details?.status} />
            </>
          ),
          <Skeleton variant="text" />
        )}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8}>
          <Card>
            <Table
              columns={club_batch_payoutdetails_column}
              data={data}
              loading={loading}
              size="small"
            />
          </Card>
        </Grid>
        <Grid item xs={12} sm={12} md={4}>
          <Card
            title="Club Payout"
            action={
              <>
                {payout_details?.status === "ONGOING" ? (
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => onUpdateBatch("CANCELLED")}
                  >
                    Cancel
                  </Button>
                ) : null}
              </>
            }
          >
            <Grid container spacing={2}>
              <Grid item md={6} lg={6}>
                <Typography fontWeight={600}>Batch ID</Typography>
              </Grid>
              <Grid item md={6} lg={6}>
                <Typography>{payout_details?.id}</Typography>
              </Grid>
              <Grid item md={6} lg={6}>
                <Typography fontWeight={600}>Total Club Fee</Typography>
              </Grid>
              <Grid item md={6} lg={6}>
                <Typography>
                  {currencyFormat(payout_details?.total_club_fee)}
                </Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
      <SaveButtonBar
        labels={{
          save: "COMPLETE"
        }}
        onSave={() => onUpdateBatch("COMPLETED")}
        onBack={() => navigate(ClubPayoutListUrl())}
        loading={false}
        hideSaveBtn={payout_details?.status !== "ONGOING"}
      />
    </>
  );
};

export default ClubPayoutDetailsPage;
