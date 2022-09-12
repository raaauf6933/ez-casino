import { Box, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import Select from "components/Select";
import ActionDialog from "components/ActionDialog";
import Form from "components/Form";
import * as React from "react";
import { AxiosResponse } from "axios";

interface SingleChangeAgentDialogProps {
  onSubmit: (formData: any) => void;
  open: boolean;
  closeAction: () => void;
  loading: boolean;
  availableAgents: AxiosResponse<any, any> | undefined;
}

const SingleChangeAgentDialog: React.FC<
  SingleChangeAgentDialogProps
> = props => {
  const { open, closeAction, loading, onSubmit, availableAgents } = props;

  const agentChoices =
    !loading &&
    availableAgents?.data?.data?.map((e: any) => ({
      label: `${e.game_code} - ${e.first_name} ${e.last_name}`,
      value: e.id
    }));

  return (
    <Form
      initial={{
        agent: "",
        transfer_to_club_admin: false
      }}
      onSubmit={onSubmit}
    >
      {({ data, change, submit, reset }) => (
        <ActionDialog
          open={open}
          onClose={() => {
            closeAction();
            reset();
          }}
          title="Change Upper Agent"
          onSubmit={submit}
          label={{
            save: "Confirm"
          }}
          disabled={
            (!data.agent && data.transfer_to_club_admin === false) || loading
          }
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
              disabled={loading || data.transfer_to_club_admin}
            />
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="transfer_to_club_admin"
                    checked={data.transfer_to_club_admin}
                    onChange={e => {
                      change({
                        target: {
                          name: "transfer_to_club_admin",
                          value: e.target.checked
                        }
                      });
                      if (e.target.checked) {
                        change({
                          target: {
                            name: "agent",
                            value: ""
                          }
                        });
                      }
                    }}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                }
                label="Transfer to Club Admin"
              />
            </FormGroup>
          </Box>
        </ActionDialog>
      )}
    </Form>
  );
};

export default SingleChangeAgentDialog;
