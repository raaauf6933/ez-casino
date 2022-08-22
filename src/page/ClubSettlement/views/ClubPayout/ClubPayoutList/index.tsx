import ActionDialog from "components/ActionDialog";
import makeHttpPost from "hooks/makeHttpPost";
import ClubPayoutListPage from "page/ClubSettlement/components/ClubPayoutListPage";
// import { ClubPayoutListUrl } from "page/ClubSettlement/url";
// import { tabs } from "page/ClubSettlement/utils";
import * as React from "react";
import { useState } from "react";
import FileUpload from "react-material-file-upload";
import { toast } from "react-toastify";
import createDialogActionHandlers from "utils/handlers/createDialogActionHandlers";
import { useNavigate } from "react-router-dom";
import {
  ClubPayoutListUrl,
  ClubPayoutListUrlQueryParams
} from "page/ClubSettlement/url";
import { GET_CLUB_PAYOUTS, UPLOAD_CLUB_PAYOUT } from "page/ClubSettlement/api";
import useFetch from "hooks/useFetch";
import { parseBatchClubPayoutList } from "page/ClubSettlement/utils";

interface ClubPayoutListProps {
  params: ClubPayoutListUrlQueryParams;
}

const ClubPayoutList: React.FC<ClubPayoutListProps> = props => {
  const { params } = props;
  const [files, setFiles] = useState<File[]>([]);
  // const { params } = props;
  const navigate = useNavigate();

  const { response, loading } = useFetch({
    url: GET_CLUB_PAYOUTS
  });

  const club_payout_batch_list = parseBatchClubPayoutList(response);

  // const onTabChange = (tab: number) => {
  //   navigate(
  //     ClubPayoutListUrl({
  //       activeTab: tab.toString(),
  //       type: tabs[tab].name
  //     })
  //   );
  // };

  // const currentTab =
  //   params.activeTab === undefined
  //     ? // eslint-disable-next-line no-constant-condition
  //       false
  //       ? tabs.length
  //       : 0
  //     : parseInt(params.activeTab, 0);

  const [openModal, closeModal] = createDialogActionHandlers(
    navigate,
    ClubPayoutListUrl,
    params
  );

  const [uploadPayout, uploadPayoutOpts] = makeHttpPost({
    onComplete: () => {
      setFiles([]);
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
        toast.error(err.response?.data.message);
        setFiles([]);
      }
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

      url: UPLOAD_CLUB_PAYOUT
    });

    closeModal("dialog");
    setFiles([]);
    toast("Batch has been processed. It will take 3-5 minutes to save");
  };

  return (
    <>
      <ClubPayoutListPage
        loading={loading}
        data={club_payout_batch_list}
        // onTabChange={onTabChange}
        // currentTab={currentTab}
        // tabs={tabs}
        onUploadFile={() => openModal("dialog", "onUploadFile")}
      />
      <ActionDialog
        open={params.action === "onUploadFile"}
        onClose={() => {
          setFiles([]);
          closeModal("dialog");
        }}
        title="Upload Club Payout"
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

export default ClubPayoutList;
