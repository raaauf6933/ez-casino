import useFetch from "hooks/useFetch";
import { GET_BATCH } from "page/Payout/api";
import PayoutDetailsPage from "page/Payout/components/PayoutDetailsPage";
import { parseAgentPayout } from "page/Payout/utils";
import * as React from "react";
import { useParams } from "react-router-dom";

interface PayoutDetaillsProps {
  params?: any;
}

const PayoutDetails: React.FC<PayoutDetaillsProps> = () => {
  const { id } = useParams();

  const { response } = useFetch({
    params: {
      id
    },
    url: GET_BATCH
  });

  const agentPayouts = parseAgentPayout(response);

  return (
    <PayoutDetailsPage
      agentPayouts={agentPayouts}
      batchInfo={response?.data?.payout}
    />
  );
};

export default PayoutDetails;
