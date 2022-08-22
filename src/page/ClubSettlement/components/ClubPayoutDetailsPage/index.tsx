import { Skeleton } from "@mui/material";
import Card from "components/Card";
import PageHeader from "components/PageHeader";
import StatusLabel from "components/StatusLabel";
import Table from "components/Table";
import { club_payout_data as data } from "page/ClubSettlement/data";
import { club_batch_payoutdetails_column } from "page/ClubSettlement/utils";
import * as React from "react";
import { maybe } from "utils/misc";

interface ClubPayoutDetailsPageProps {
  data?: any;
  club_batch_payout?: any;
}

const ClubPayoutDetailsPage: React.FC<ClubPayoutDetailsPageProps> = props => {
  let { club_batch_payout } = props;

  club_batch_payout = data[0];
  return (
    <>
      <PageHeader
        title={maybe(
          () => (
            <>
              {club_batch_payout.id}{" "}
              <StatusLabel status={club_batch_payout?.status} />
            </>
          ),
          <Skeleton variant="text" />
        )}
      />
      <Card>
        <Table
          columns={club_batch_payoutdetails_column}
          data={[]}
          loading={false}
        />
      </Card>
    </>
  );
};

export default ClubPayoutDetailsPage;
