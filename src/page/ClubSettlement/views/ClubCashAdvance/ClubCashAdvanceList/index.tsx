import { Typography } from "@mui/material";
import ActionDialog from "components/ActionDialog";
import makeHttpPost from "hooks/makeHttpPost";
import useBulkActions from "hooks/useBulkActions";
import useFetch from "hooks/useFetch";
import {
  GET_CLUB_CASH_ADVANCES,
  UPDATE_CLUB_CASH_ADANCE
} from "page/ClubSettlement/api";
import ClubCashAdvanceListPage from "page/ClubSettlement/components/ClubCashAdvanceListPage";
import {
  ClubCasAdvanceListUrl,
  ClubCasAdvanceUrlQueryParams
} from "page/ClubSettlement/url";
import { parseCashAdvances } from "page/ClubSettlement/utils";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import createDialogActionHandlers from "utils/handlers/createDialogActionHandlers";

interface ClubCashAdvanceListProps {
  params: ClubCasAdvanceUrlQueryParams;
}

const ClubCashAdvanceList: React.FC<ClubCashAdvanceListProps> = props => {
  const { params } = props;
  const navigate = useNavigate();
  const { response, refetch: refetchClubAdvances } = useFetch({
    url: GET_CLUB_CASH_ADVANCES
  });
  const bulkActions = useBulkActions([]);

  const [openModal, closeModal] = createDialogActionHandlers(
    navigate,
    ClubCasAdvanceListUrl,
    params
  );

  const [updateStatus] = makeHttpPost({
    onComplete: () => {
      toast("Update Successfully!");
      closeModal();
      refetchClubAdvances();
    },
    onError: err => toast.error(err.response?.data.message)
  });

  const data = parseCashAdvances(
    response,
    ({ id, status }) => openModal("dialog", "onUpdateStatus", { id, status })
    // bulkActions.isSelected,
    // bulkActions.toggle
  );

  const handleUpdateStatus = () => {
    updateStatus({
      data: {
        id: params.id,
        status: params.status
      },
      url: UPDATE_CLUB_CASH_ADANCE
    });
  };

  return (
    <>
      <ClubCashAdvanceListPage
        setSearchValue={function (): void {
          throw new Error("Function not implemented.");
        }}
        searchValue={""}
        data={data}
        {...bulkActions}
      />
      <ActionDialog
        open={params.action === "onUpdateStatus"}
        onClose={closeModal}
        title={"Update Status"}
        onSubmit={handleUpdateStatus}
      >
        <Typography>
          Are you sure you want to tag this as{" "}
          {params.status === "APPROVED" ? <b>Approved</b> : <b>Rejected</b>} ?
        </Typography>
      </ActionDialog>
    </>
  );
};

export default ClubCashAdvanceList;
