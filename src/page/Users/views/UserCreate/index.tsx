import makeHttpPost from "hooks/makeHttpPost";
import useFetch from "hooks/useFetch";
import { GET_CLUBS } from "page/Club/api";
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
import { StatusType, UserTypeEnum } from "types";
import { hasNoError } from "utils/validators";

const UserCreate: React.FC = () => {
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

  const { response } = useFetch({
    params: {
      status: StatusType.ACTIVE
    },
    url: GET_CLUBS
  });

  const [createUser, createUserOpts] = makeHttpPost({
    onComplete: e => {
      toast("User saved!");
      navigate(userUrl(e?.data?.id.toString()));
    },
    onError: err => {
      toast.error(err?.response?.data.message);
    }
  });

  const onCreateUser = async (formData: initialFormDataType) => {
    if (formData.usertype !== UserTypeEnum.CLUB_ADMIN) {
      formData.club_id = null;
    }

    const validate = userFormValidate(formData);
    if (hasNoError(validate)) {
      createUser({ data: formData, url: createNewUser });
    } else {
      setValidationError(validate);
    }
  };

  return (
    <>
      <CreatePage
        type="create"
        createUser={onCreateUser}
        validationError={validationError}
        loading={createUserOpts.loading}
        clubList={response?.data}
      />
    </>
  );
};

export default UserCreate;
