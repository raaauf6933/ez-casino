import ActionDialog from "components/ActionDialog";
import makeHttpPost from "hooks/makeHttpPost";
import useFetch from "hooks/useFetch";
import { GET_BATCH, UPDATE_PAYOUT_BATCH } from "page/Payout/api";
import PayoutDetailsPage from "page/Payout/components/PayoutDetailsPage";
import { PayoutDetailsUrlQueryParams, payoutUrl } from "page/Payout/url";
import { parseAgentPayout } from "page/Payout/utils";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { BatchPayoutStatusType } from "types";
import createDialogActionHandlers from "utils/handlers/createDialogActionHandlers";

interface PayoutDetaillsProps {
  params: PayoutDetailsUrlQueryParams;
}

const PayoutDetails: React.FC<PayoutDetaillsProps> = props => {
  const { params } = props;
  const { id } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = React.useState<string>("");

  const { response, refetch } = useFetch({
    params: {
      id,
      search: search
    },
    url: GET_BATCH
  });
  React.useEffect(() => {
    refetch();
  }, [search]);

  const [openAction, closeAction] = createDialogActionHandlers(
    navigate,
    params => payoutUrl(id ? id : "", params),
    params
  );

  const [updateBatch] = makeHttpPost({
    onComplete: () => {
      toast("Batch Updated");
      refetch();
      closeAction("dialog");
    },
    onError: err => toast.error(err.response?.data?.message)
  });

  const agentPayouts = parseAgentPayout(response);

  const onUpdateBatch = async () => {
    await updateBatch({
      data: {
        id,
        status: params.status
      },
      url: UPDATE_PAYOUT_BATCH
    });
  };

  return (
    <>
      <PayoutDetailsPage
        agentPayouts={agentPayouts}
        batchInfo={response?.data?.payout}
        searchValue={search}
        setSearchValue={setSearch}
        onUpdateStatus={status =>
          openAction("dialog", "onComplete", {
            status
          })
        }
      />
      <ActionDialog
        open={params.action === "onComplete"}
        onClose={() => closeAction("dialog")}
        title="Update Batch"
        onSubmit={onUpdateBatch}
      >
        <p>
          Are you sure you want to tag this batch as{" "}
          <b>
            {params.status === BatchPayoutStatusType.COMPLETED
              ? "Completed"
              : "Cancelled"}
          </b>
          ?
        </p>
      </ActionDialog>
    </>
  );
};

export default PayoutDetails;
