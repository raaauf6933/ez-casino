import {
  FormControlLabel,
  FormGroup,
  Grid,
  Slider,
  FormLabel,
  TextField,
  Checkbox
} from "@mui/material";
import ActionDialog from "components/ActionDialog";
import Form from "components/Form";
import { Agent } from "page/Agent/types";
import * as React from "react";
import { maybe } from "utils/misc";

interface EditAgentDialogProps {
  open: boolean;
  closeModal: (data: "dialog" | "drawer") => void;
  agent: Agent;
  loading: boolean;
  onSubmit: (formData: any) => Promise<void | any>;
}

const EditAgentDialog: React.FC<EditAgentDialogProps> = props => {
  const { open, closeModal, agent, loading, onSubmit } = props;

  const initialData = {
    comms_rate: maybe(() => agent?.comms_rate, 55) || 55,
    game_id: "",
    update_game_id: false
  };

  const handleSubmit = async (formData: any) => {
    const error = await onSubmit(formData);

    if (!error) {
      closeModal("dialog");
    }
  };

  return (
    <>
      {!loading ? (
        <Form initial={initialData} onSubmit={handleSubmit}>
          {({ data, change, submit }) => (
            <ActionDialog
              open={open}
              onClose={() => closeModal("dialog")}
              title="Edit Agent"
              onSubmit={submit}
            >
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <TextField
                    label="Game ID"
                    name="game_id"
                    value={data.game_id}
                    onChange={change}
                    fullWidth
                    disabled={!data.update_game_id}
                  />
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="update_game_id"
                          checked={data.update_game_id}
                          onChange={e => {
                            change({
                              target: {
                                name: "update_game_id",
                                value: e.target.checked
                              }
                            });
                            if (!e.target.checked) {
                              change({
                                target: {
                                  name: "game_id",
                                  value: ""
                                }
                              });
                            }
                          }}
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label="Update Game ID"
                    />
                  </FormGroup>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <FormGroup>
                    <FormLabel>Commission Rate</FormLabel>
                    <FormControlLabel
                      labelPlacement="bottom"
                      control={
                        <Slider
                          defaultValue={55}
                          valueLabelDisplay="auto"
                          step={5}
                          marks
                          min={55}
                          max={100}
                          name="comms_rate"
                          value={data.comms_rate}
                          onChange={(_, newValue) =>
                            change({
                              target: {
                                name: "comms_rate",
                                value: newValue
                              }
                            })
                          }
                        />
                      }
                      label={`Commission Rate: ${data.comms_rate}%`}
                    />
                  </FormGroup>
                </Grid>
                {/* <Grid item xs={12} sm={12} md={12}>
              <TextField
                label="Commission Rate"
                name="commission"
                value={data.commission}
                onChange={change}
                fullWidth
              />
            </Grid> */}
              </Grid>
            </ActionDialog>
          )}
        </Form>
      ) : null}
    </>
  );
};

export default EditAgentDialog;
