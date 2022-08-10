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
  const [search, setSearch] = React.useState<string>("");

  const { response, refetch } = useFetch({
    params: {
      id,
      search: search
    },
    url: GET_BATCH
  });
  React.useEffect(() => {
    refetch();
  }, [search]);

  const agentPayouts = parseAgentPayout(response);

  return (
    <PayoutDetailsPage
      agentPayouts={agentPayouts}
      batchInfo={response?.data?.payout}
      searchValue={search}
      setSearchValue={setSearch}
    />
  );
};

export default PayoutDetails;
