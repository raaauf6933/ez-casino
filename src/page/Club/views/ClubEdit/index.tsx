import makeHttpPost from "hooks/makeHttpPost";
import useFetch from "hooks/useFetch";
import { GET_CLUB, UPDATE_CLUB } from "page/Club/api";
import ClubFormPage from "page/Club/components/ClubFormPage";
import * as React from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

interface ClubEditProps {
  data?: string;
}

const initialValidationData = {
  club_name: "",
  contact_person: "",
  email: "",
  mobile_number: ""
};

const ClubEdit: React.FC<ClubEditProps> = () => {
  const { id } = useParams();
  const { response, loading } = useFetch({
    method: "GET",
    params: {
      id
    },
    url: GET_CLUB
  });

  const [validationError] = React.useState<any>(initialValidationData);

  const [updateClub, updateClubOpts] = makeHttpPost({
    onComplete: () => {
      toast("Club saved!");
    },
    onError: err => {
      toast.error(err?.response?.data.message);
    }
  });

  const onUpdateClub = async (formData: any) => {
    console.log(formData);
    const error = await updateClub({
      data: { ...formData, id },
      url: UPDATE_CLUB
    });

    return error;
  };

  return (
    <>
      {loading ? null : (
        <ClubFormPage
          type="edit"
          data={response?.data}
          loading={updateClubOpts.loading}
          updateClub={onUpdateClub}
          validationError={validationError}
        />
      )}
    </>
  );
};

export default ClubEdit;
