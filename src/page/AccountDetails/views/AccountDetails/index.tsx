import useFetch from "hooks/useFetch";
import DetailsPage from "page/AccountDetails/components/DetailsPage";
import { GET_ACCOUNT_DETAILS } from "page/AccountDetails/api";
import * as React from "react";

const AccountDetails: React.FC = () => {
  const { response, loading } = useFetch({
    url: GET_ACCOUNT_DETAILS
  });

  return (
    <>
      {loading ? null : (
        <DetailsPage
          user={response?.data}
          usertype={response?.data?.usertype}
        />
      )}
    </>
  );
};

export default AccountDetails;
