import ClubCashAdvanceListPage from "page/ClubSettlement/components/ClubCashAdvanceListPage";
import * as React from "react";

interface ClubCashAdvanceListProps {
  params?: any;
}

const ClubCashAdvanceList: React.FC<ClubCashAdvanceListProps> = () => {
  return (
    <ClubCashAdvanceListPage
      setSearchValue={function (): void {
        throw new Error("Function not implemented.");
      }}
      searchValue={""}
    />
  );
};

export default ClubCashAdvanceList;
