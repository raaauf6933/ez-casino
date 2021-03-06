import makeHttpPost from "hooks/makeHttpPost";
import { CREATE_AGENT } from "page/Agent/api";
import AgentFormPage from "page/Agent/components/AgentFormPage";
import { AgentListUrl } from "page/Agent/url";
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AgentCreate: React.FC = () => {
  const navigate = useNavigate();

  const [createAgent] = makeHttpPost({
    onComplete: () => {
      toast("Agent Created!");
      navigate(AgentListUrl());
    },
    onError: e => {
      toast.error(e.response?.data.message);
    }
  });

  const onCreateAgent = async (formData: any) => {
    createAgent({ data: formData, url: CREATE_AGENT });
  };

  return <AgentFormPage onCreateAgent={onCreateAgent} />;
};

export default AgentCreate;
