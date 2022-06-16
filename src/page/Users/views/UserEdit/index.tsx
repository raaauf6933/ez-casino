import CreatePage from "page/Users/components/CreatePage";
import { ToastContainer } from "react-toastify";
import { getUser, updateUser as updateUserApi } from "page/Users/api";
import "react-toastify/dist/ReactToastify.css";
import * as React from "react";
import useAxios from "hooks/useAxios";
import { useParams } from "react-router-dom";
import AppStateContext from "context/appState/context";
import { toast } from "react-toastify";
import _ from "lodash";

const UserEdit: React.FC = () => {
  const { id } = useParams();
  const { dispatch } = React.useContext(AppStateContext);
  const { useFetch, usePost } = useAxios();
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

  const updateUser = async (formData: any) => {
    try {
      await usePost(
        {
          data: {
            ..._.pick(formData, [
              "first_name",
              "last_name",
              "email",
              "contact_number",
              "usertype",
              "status"
            ]),
            id
          },
          method: "POST",
          url: updateUserApi
        },
        dispatch
      );
      toast("Saved!");
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      {loading ? null : (
        <CreatePage
          type="edit"
          validationError={validationError}
          data={response?.data}
          updateUser={updateUser}
        />
      )}

      <ToastContainer />
    </>
  );
};

export default UserEdit;
