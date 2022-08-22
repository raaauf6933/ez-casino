import Select from "components/Select";
import ActionDialog from "components/ActionDialog";
import Form from "components/Form";
import * as React from "react";
import { Box } from "@mui/material";

interface ChangeAgentDialogProps {
  open: boolean;
  closeAction: () => void;
  agentList?: any[];
  upperAgent?: string;
  selectedAgents: string[];
  loading: boolean;
  onSubmit: (data: any) => void;
  refetchAllAgents: () => Promise<void>;
}

const ChangeAgentDialog: React.FC<ChangeAgentDialogProps> = props => {
  const {
    open,
    closeAction,
    agentList,
    upperAgent,
    selectedAgents,
    loading,
    onSubmit,
    refetchAllAgents
  } = props;

  React.useEffect(() => {
    refetchAllAgents();
  }, []);

  const agentChoices = agentList
    ? agentList
        ?.map(agent => ({
          label: `${agent?.game_code} - ${agent?.agent_name}`,
          value: agent.id
        }))
        .filter(
          e => ![upperAgent, ...selectedAgents].includes(e.value.toString())
        )
    : [];

  return (
    <Form
      initial={{
        agent: ""
      }}
      onSubmit={onSubmit}
    >
      {({ data, change, submit }) => (
        <ActionDialog
          open={open}
          onClose={closeAction}
          title="Change Upper Agent"
          onSubmit={submit}
          label={{
            save: "Confirm"
          }}
          disabled={!data.agent || loading}
        >
          <Box
            style={{
              width: "440px"
            }}
          >
            <p>Choose New Upper Agent</p>
            <Select
              label="Agents"
              choices={agentChoices}
              name="agent"
              value={data.agent}
              onChange={change}
              disabled={loading}
            />
          </Box>
        </ActionDialog>
      )}
    </Form>
  );
};

export default ChangeAgentDialog;
