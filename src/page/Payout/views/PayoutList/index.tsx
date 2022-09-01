import ListPage from "page/Payout/components/ListPage";
import { columns } from "./../../utils";
import ActionDialog from "components/ActionDialog";
import React, { useState } from "react";
import createDialogActionHandlers from "utils/handlers/createDialogActionHandlers";
import { useNavigate } from "react-router-dom";
import {
  PayoutListUrl,
  PayoutListUrlQueryParams,
  payoutPath
} from "page/Payout/url";
import FileUpload from "react-material-file-upload";
import makeHttpPost from "hooks/makeHttpPost";
import {
  EXPORT_AGENT_PAYOUT_TEMPLATE,
  GET_BATCHES,
  UPLOAD_PAYOUT
} from "page/Payout/api";
import { ErrorPayoutHandlers } from "page/Payout/handlers";
import { parseBatchPayoutList } from "./../../utils";
// import { Typography } from "@mui/material";
import { toast } from "react-toastify";
import useFetch from "hooks/useFetch";
import { useUser } from "context/auth/context";

interface PayoutListProps {
  params: PayoutListUrlQueryParams;
}

const PayoutList: React.FC<PayoutListProps> = props => {
  const { params } = props;
  const navigate = useNavigate();
  const [files, setFiles] = useState<File[]>([]);
  const user = useUser();

  const { response, refetch } = useFetch({
    url: GET_BATCHES
  });

  const batch_list = parseBatchPayoutList(response);

  const [openModal, closeModal] = createDialogActionHandlers(
    navigate,
    PayoutListUrl,
    params
  );

  const [uploadPayout, uploadPayoutOpts] = makeHttpPost({
    onComplete: () => {
      setFiles([]);
      refetch();
    },
    onError: err => {
      setFiles([]);
      if (err.message === "Network Error") {
        // toast.error(
        //   <>
        //     <Typography variant="body1" fontWeight={600}>
        //       Please Upload Batch
        //     </Typography>
        //   </>
        // );
        setFiles([]);
      } else {
        setFiles([]);
        ErrorPayoutHandlers(err.response);
      }
    }
  });

  const [exportAgentPayout] = makeHttpPost({
    onComplete: e => {
      window.open(e.data.destination, "_blank");
    }
  });

  const onUploadPayout = () => {
    const formData = new FormData();
    formData.append("file", files[0]);

    uploadPayout({
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        data: "application/json"
      },
      url: UPLOAD_PAYOUT
    });

    closeModal("dialog");
    setFiles([]);
    toast("Batch has been processed. It will take 3-5 minutes to save");
  };

  const onExportAgentTemplate = () => {
    exportAgentPayout({
      data: {
        club_id: user?.club_id
      },
      url: EXPORT_AGENT_PAYOUT_TEMPLATE
    });
  };

  return (
    <>
      <ListPage
        columns={columns(user?.usertype)}
        data={batch_list}
        onUploadPayout={() => openModal("dialog", "uploadPayoutBatch")}
        onRowClick={id => navigate(payoutPath(id))}
        onExportAgentTemplate={onExportAgentTemplate}
      />
      <ActionDialog
        open={params.action === "uploadPayoutBatch"}
        onClose={() => {
          setFiles([]);
          closeModal("dialog");
        }}
        title="Upload Batch Payout"
        label={{
          save: "Upload"
        }}
        onSubmit={onUploadPayout}
        disabled={files.length === 0 || uploadPayoutOpts.loading}
      >
        <FileUpload
          buttonText="Choose File"
          buttonProps={{
            size: "small"
          }}
          accept=".csv"
          value={files}
          onChange={setFiles}
        />
      </ActionDialog>
    </>
  );
};

export default PayoutList;
