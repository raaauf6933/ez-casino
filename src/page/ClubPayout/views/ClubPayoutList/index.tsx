import ClubPayoutListPage from "page/ClubPayout/components/ListPage";
import * as React from "react";

interface ClubPayoutListProps {
  params?: any;
}

const ClubPayoutList: React.FC<ClubPayoutListProps> = () => {
  return <ClubPayoutListPage loading={false} />;
};

export default ClubPayoutList;
