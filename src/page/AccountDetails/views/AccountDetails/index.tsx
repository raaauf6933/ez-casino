import useFetch from "hooks/useFetch";
import DetailsPage from "page/AccountDetails/components/DetailsPage";
import { CHANGE_PASSWORD, GET_ACCOUNT_DETAILS } from "page/AccountDetails/api";
import * as React from "react";
import ChangePassswordDialog from "page/AccountDetails/components/ChangePasswordDialog";
import createDialogActionHandlers from "utils/handlers/createDialogActionHandlers";
import { useNavigate, useParams } from "react-router-dom";
import {
  AccountDetaillsUrlQueryParams,
  accountDetailsUrl
} from "page/AccountDetails/url";
import makeHttpPost from "hooks/makeHttpPost";
import { toast } from "react-toastify";
import _ from "lodash";
import { useAuth } from "context/auth/context";

interface AccountDetailsProps {
  params: AccountDetaillsUrlQueryParams;
}

const AccountDetails: React.FC<AccountDetailsProps> = props => {
  const { params } = props;
  const user = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const { response, loading } = useFetch({
    url: GET_ACCOUNT_DETAILS
  });

  const [openAction, closeAction] = createDialogActionHandlers(
    navigate,
    params => accountDetailsUrl(id ? id : "", params),
    params
  );

  const [changePassword] = makeHttpPost({
    onComplete: () => {
      toast("Password Changed, You must log-in again");
      user.logout();
      closeAction("dialog");
    },
    onError: e => {
      if (e.response?.data?.code === "INVALID_USER") {
        toast.error("Old Password Incorrect");
      } else {
        toast.error(e?.response?.data?.message);
      }
    }
  });

  const onChangePassword = async (formData: any) => {
    const error = await changePassword({
      data: _.omit(formData, "confirmNewPassword"),
      url: CHANGE_PASSWORD
    });

    return error;
  };
  return (
    <>
      {loading ? null : (
        <DetailsPage
          user={response?.data}
          usertype={response?.data?.usertype}
          onChangePassword={() => openAction("dialog", "changePassword")}
        />
      )}

      <ChangePassswordDialog
        onSubmit={onChangePassword}
        open={params.action === "changePassword"}
        onClose={() => closeAction("dialog")}
      />
    </>
  );
};

export default AccountDetails;
