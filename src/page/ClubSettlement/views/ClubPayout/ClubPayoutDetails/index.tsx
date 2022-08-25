import { Typography } from "@mui/material";
import ActionDialog from "components/ActionDialog";
import makeHttpPost from "hooks/makeHttpPost";
import useFetch from "hooks/useFetch";
import {
  GET_CLUB_PAYOUT,
  UPDATE_CLUB_BATCH_PAYOUT
} from "page/ClubSettlement/api";
import ClubPayoutDetailsPage from "page/ClubSettlement/components/ClubPayoutDetailsPage";
import {
  clubPayoutUrl,
  ClubPayoutUrlQueryParams
} from "page/ClubSettlement/url";
import { parseBatchClubPayoutDetails } from "page/ClubSettlement/utils";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import createDialogActionHandlers from "utils/handlers/createDialogActionHandlers";

interface ClubPayoutDetailsProps {
  params: ClubPayoutUrlQueryParams;
}

const ClubPayoutDetails: React.FC<ClubPayoutDetailsProps> = props => {
  const { params } = props;
  const { id } = useParams();
  const navigate = useNavigate();

  const { response, loading, refetch } = useFetch({
    params: {
      id
    },
    url: GET_CLUB_PAYOUT
  });

  const [openModal, closeModal] = createDialogActionHandlers(
    navigate,
    params => clubPayoutUrl(id ? id : "", params),
    params
  );

  const [updateBatch] = makeHttpPost({
    onComplete: () => {
      refetch();
      toast("Update Successfull!");
      closeModal();
    },
    onError: e => toast.error(e.response?.data.message)
  });

  const data = parseBatchClubPayoutDetails(response);

  const handleUpdateBatch = async () => {
    await updateBatch({
      data: {
        id,
        status: params?.status
      },
      url: UPDATE_CLUB_BATCH_PAYOUT
    });
  };

  return (
    <>
      <ClubPayoutDetailsPage
        data={data}
        payout_details={response?.data?.club_payout_details[0]}
        loading={loading}
        onUpdateBatch={status =>
          openModal("dialog", "onUpdateBatch", {
            status
          })
        }
      />
      <ActionDialog
        open={params.action === "onUpdateBatch"}
        onClose={closeModal}
        title={"Update Club Payout"}
        onSubmit={handleUpdateBatch}
      >
        <Typography>
          Are you sure you want to tag this as{" "}
          {params.status === "COMPLETED" ? <b>Completed</b> : <b>Cancelled</b>}{" "}
          ?
        </Typography>
      </ActionDialog>
    </>
  );
};

export default ClubPayoutDetails;
