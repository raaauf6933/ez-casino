import * as React from "react";
import ClubFormPage from "page/Club/components/ClubFormPage";
import { CREATE_CLUB } from "page/Club/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { clubUrl } from "page/Club/url";
import { userFormValidate } from "page/Club/validate";
import { hasNoError } from "utils/validators";
import makeHttpPost from "hooks/makeHttpPost";

export interface validationType {
  club_name: string;
  contact_person: string;
  mobile_number: string;
  email: string;
}

const initialValidationData = {
  club_name: "",
  contact_person: "",
  email: "",
  mobile_number: ""
};

const ClubCreate: React.FC = () => {
  const navigate = useNavigate();
  const [validationError, setValidationError] = React.useState<any>(
    initialValidationData
  );

  const [createClub, createUserOpts] = makeHttpPost({
    onComplete: result => {
      toast("Club saved!");
      navigate(clubUrl(result?.data?.id.toString()));
    },
    onError: err => {
      toast.error(err?.response?.data.message);
    }
  });

  const onCreateClub = async (formData: any) => {
    setValidationError(initialValidationData);
    const validate = userFormValidate(formData);
    if (hasNoError(validate)) {
      createClub({
        data: formData,
        url: CREATE_CLUB
      });
    } else {
      setValidationError(validate);
    }
  };

  return (
    <ClubFormPage
      type="create"
      createClub={onCreateClub}
      loading={createUserOpts.loading}
      validationError={validationError}
    />
  );
};

export default ClubCreate;
