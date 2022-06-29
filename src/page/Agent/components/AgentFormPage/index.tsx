import {
  FormControlLabel,
  FormGroup,
  Grid,
  Slider,
  Switch,
  TextField
} from "@mui/material";
import Card from "components/Card";
import Form from "components/Form";
import PageHeader from "components/PageHeader";
import SaveButtonBar from "components/SaveButtonBar";
import { useUser } from "context/auth/context";
import * as React from "react";
import { StatusType, UserTypeEnum } from "types";
// import { restrictToNumber } from "utils/misc";

interface AgentFormPageProps {
  data?: any;
  onCreateAgent: (formData: any) => Promise<any>;
}

const AgentFormPage: React.FC<AgentFormPageProps> = props => {
  const { onCreateAgent } = props;
  const user = useUser();
  const initialFormData = {
    comms_rate: 55,
    contact_number: "",
    email: "",
    first_name: "",
    game_code: "",
    last_name: "",
    status: StatusType.ACTIVE,
    username: ""
  };

  return (
    <>
      <PageHeader title="Create Agent" />
      <Form initial={initialFormData} onSubmit={e => onCreateAgent(e)}>
        {({ data, submit, hasChanged, change }) => (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <Card title="Agent Information">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        name="game_code"
                        value={data.game_code}
                        // error={validationError.club_name ? true : false}
                        // helperText={
                        //   validationError.club_name
                        //     ? validationError.club_name
                        //     : null
                        // }
                        onChange={change}
                        fullWidth
                        label="Game Code"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        name="first_name"
                        value={data.first_name}
                        // error={validationError.club_name ? true : false}
                        // helperText={
                        //   validationError.club_name
                        //     ? validationError.club_name
                        //     : null
                        // }
                        onChange={change}
                        fullWidth
                        label="First Name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        name="last_name"
                        value={data.last_name}
                        // error={validationError.club_name ? true : false}
                        // helperText={
                        //   validationError.club_name
                        //     ? validationError.club_name
                        //     : null
                        // }
                        onChange={change}
                        fullWidth
                        label="Last Name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        name="contact_number"
                        value={data.contact_number}
                        // error={validationError.club_name ? true : false}
                        // helperText={
                        //   validationError.club_name
                        //     ? validationError.club_name
                        //     : null
                        // }
                        onChange={change}
                        fullWidth
                        label="Contact Number"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        name="email"
                        value={data.email}
                        // error={validationError.club_name ? true : false}
                        // helperText={
                        //   validationError.club_name
                        //     ? validationError.club_name
                        //     : null
                        // }
                        onChange={change}
                        fullWidth
                        label="Email"
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <Card title="Agent Account Details">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        name="username"
                        value={data.username}
                        // error={validationError.club_name ? true : false}
                        // helperText={
                        //   validationError.club_name
                        //     ? validationError.club_name
                        //     : null
                        // }
                        onChange={change}
                        fullWidth
                        label="Username"
                      />
                    </Grid>
                    {user?.usertype === UserTypeEnum.CLUB_ADMIN ? (
                      <Grid item xs={12} sm={12} md={12}>
                        <FormGroup>
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
                    ) : null}
                    <Grid item xs={12} sm={12} md={6}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={true}
                              onChange={e =>
                                change({
                                  target: {
                                    name: "status",
                                    value: e.target.checked
                                      ? StatusType.ACTIVE
                                      : StatusType.INACTIVE
                                  }
                                })
                              }
                              name="status"
                              inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                          label="Active Status"
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
            <SaveButtonBar
              onBack={() => null}
              disabled={!hasChanged}
              onSave={submit}
              loading={false}
            />
          </>
        )}
      </Form>
    </>
  );
};

export default AgentFormPage;
