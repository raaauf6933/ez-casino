import { Grid, Button } from "@mui/material";
import Card from "components/Card";
import * as React from "react";
import ClubPageTransactionTable from "../ClubPageTransactionTable";
import ClubDashboardAgentPayout from "./components/ClubDashboardAgentPayout";
import ClubDashboardPayout from "./components/ClubDashboardPayout";

interface ClubPageDetailsProps {
  data: any;
  loading: boolean;
  transactions: any;
  settlement: any;
  onRequestCash: () => void;
}

const ClubPageDetails: React.FC<ClubPageDetailsProps> = props => {
  const { data, loading, transactions, settlement, onRequestCash } = props;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <ClubDashboardAgentPayout data={data} loading={loading} />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <ClubDashboardPayout
            data={data}
            loading={loading}
            settlement={settlement}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card
            title="My Transactions"
            action={
              <>
                <Button variant="contained" onClick={() => onRequestCash()}>
                  Request Cash
                </Button>
              </>
            }
          >
            <ClubPageTransactionTable transactions={transactions} />
          </Card>
        </Grid>
      </Grid>{" "}
    </>
  );
};

export default ClubPageDetails;
