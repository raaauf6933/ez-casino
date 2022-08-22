import ClubPayoutDetailsPage from "page/ClubSettlement/components/ClubPayoutDetailsPage";
import * as React from "react";

interface ClubPayoutDetailsProps {
  params?: any;
}

const ClubPayoutDetails: React.FC<ClubPayoutDetailsProps> = () => {
  return (
    <>
      <ClubPayoutDetailsPage />
    </>
  );
};

export default ClubPayoutDetails;
