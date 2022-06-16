import AppStateContext from "context/appState/context";
import useAxios from "hooks/useAxios";
import { createNewUser } from "page/Users/api";
import CreatePage, {
  initialFormDataType
} from "page/Users/components/CreatePage";
import { userUrl } from "page/Users/url";
import { userFormValidate } from "page/Users/validate";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { hasNoError } from "utils/validators";

const UserCreate: React.FC = () => {
  const { dispatch } = React.useContext(AppStateContext);
  const navigate = useNavigate();
  const [validationError, setValidationError] = React.useState<any>({
    confirm_password: "",
    contact_number: "",
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    username: "",
    usertype: ""
  });

  const { usePost } = useAxios();

  const createUser = async (formData: initialFormDataType) => {
    const validate = userFormValidate(formData);
    if (hasNoError(validate)) {
      try {
        const result = await usePost(
          { data: formData, url: createNewUser },
          dispatch
        );
        toast("User saved!");
        navigate(userUrl(result?.data?.id.toString()));
      } catch (error: any) {
        toast.error(error.response.data.message);
      }
    } else {
      setValidationError(validate);
    }
  };

  return (
    <>
      <CreatePage
        type="create"
        createUser={createUser}
        validationError={validationError}
      />
    </>
  );
};

export default UserCreate;
