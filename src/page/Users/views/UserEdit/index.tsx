import CreatePage from "page/Users/components/CreatePage";
import { ToastContainer } from "react-toastify";
import { getUser, updateUser as updateUserApi } from "page/Users/api";
import * as React from "react";
import useFetch from "hooks/useFetch";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";
import { StatusType } from "types";
import { GET_CLUBS } from "page/Club/api";
import makeHttpPost from "hooks/makeHttpPost";

const UserEdit: React.FC = () => {
  const { id } = useParams();

  const { response, loading } = useFetch({
    method: "GET",
    params: {
      id
    },
    url: getUser
  });
  const [validationError] = React.useState<any>({
    confirm_password: "",
    contact_number: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    username: "",
    usertype: ""
  });
  const { response: clubList, loading: ClubListLoading } = useFetch({
    params: {
      status: StatusType.ACTIVE
    },
    url: GET_CLUBS
  });

  const [updateUser, updateUserOpts] = makeHttpPost({
    onComplete: () => {
      toast("Saved!");
    },
    onError: err => {
      toast.error(err?.response?.data.message);
    }
  });

  const onUpdateUser = async (formData: any) => {
    updateUser({
      data: {
        ..._.pick(formData, [
          "club_id",
          "first_name",
          "last_name",
          "email",
          "contact_number",
          "usertype",
          "status"
        ]),
        id
      },
      url: updateUserApi
    });
  };

  return (
    <>
      {loading ? null : (
        <CreatePage
          type="edit"
          validationError={validationError}
          data={response?.data}
          updateUser={onUpdateUser}
          loading={ClubListLoading || updateUserOpts.loading}
          clubList={clubList?.data}
        />
      )}

      <ToastContainer />
    </>
  );
};

export default UserEdit;
