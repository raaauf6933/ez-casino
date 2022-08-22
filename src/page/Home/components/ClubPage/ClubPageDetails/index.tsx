import { Grid, Button } from "@mui/material";
import Card from "components/Card";
import * as React from "react";
import ClubPageTransactionTable from "../ClubPageTransactionTable";
import ClubDashboardAgentPayout from "./components/ClubDashboardAgentPayout";
import ClubDashboardPayout from "./components/ClubDashboardPayout";

interface ClubPageDetailsProps {
  data: any;
  loading: boolean;
}

const ClubPageDetails: React.FC<ClubPageDetailsProps> = props => {
  const { data, loading } = props;

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6}>
          <ClubDashboardAgentPayout data={data} loading={loading} />
        </Grid>
        <Grid item xs={12} sm={12} md={6}>
          <ClubDashboardPayout data={data} loading={loading} />
        </Grid>
        <Grid item xs={12} sm={12} md={12}>
          <Card
            title="My Transactions"
            action={
              <>
                <Button variant="contained">Request Cash</Button>
              </>
            }
          >
            <ClubPageTransactionTable />
          </Card>
        </Grid>
      </Grid>{" "}
    </>
  );
};

export default ClubPageDetails;
