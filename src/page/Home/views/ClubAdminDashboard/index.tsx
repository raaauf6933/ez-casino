import useFetch from "hooks/useFetch";
import {
  GET_CLUB_ADMIN_DASHBOARD,
  GET_CLUB_SETTLEMENT,
  GET_CLUB_TRANSACTIONS,
  GET_SUPER_USER_DASHBOARD
} from "page/Home/api";
import React from "react";
import { useUser } from "context/auth/context";
import { UserTypeEnum } from "types";
import ClubPageDetails from "page/Home/components/ClubPage/ClubPageDetails";
import { parseTransactions } from "./utils";
import ClubRequestCashDialog from "page/Home/components/ClubPage/ClubRequestCashDialog";
import createDialogActionHandlers from "utils/handlers/createDialogActionHandlers";
import { useNavigate } from "react-router-dom";
import { DashboardDialogUrlQueryParams, DashboardUrl } from "page/Home/url";

interface ClubAdminDashboardProps {
  params: DashboardDialogUrlQueryParams;
}

const ClubAdminDashboard: React.FC<ClubAdminDashboardProps> = props => {
  const { params } = props;
  const user = useUser();
  const navigate = useNavigate();

  const [openModal, closeModal] = createDialogActionHandlers(
    navigate,
    DashboardUrl,
    params
  );

  const { response, loading } = useFetch({
    url:
      user?.usertype === UserTypeEnum.CLUB_ADMIN
        ? GET_CLUB_ADMIN_DASHBOARD
        : GET_SUPER_USER_DASHBOARD
  });

  const { response: transactionRes } = useFetch({
    params: {
      id: user?.club_id
    },
    url: GET_CLUB_TRANSACTIONS
  });

  const { response: settlementRes } = useFetch({
    params: {
      id: user?.club_id
    },
    url: GET_CLUB_SETTLEMENT
  });

  const data = parseTransactions(transactionRes);

  return (
    <>
      <ClubPageDetails
        data={response}
        loading={loading}
        transactions={data}
        settlement={settlementRes?.data}
        onRequestCash={() => openModal("dialog", "onRequestCash")}
      />
      <ClubRequestCashDialog
        open={params.action === "onRequestCash"}
        onClose={closeModal}
      />
    </>
  );
};

export default ClubAdminDashboard;
