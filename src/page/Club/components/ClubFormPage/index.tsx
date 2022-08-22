import {
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  TextField
} from "@mui/material";
import Card from "components/Card";
import Form from "components/Form";
import PageHeader from "components/PageHeader";
import SaveButtonBar from "components/SaveButtonBar";
import { validationType } from "page/Club/views/ClubCreate";
import { Club } from "page/Club/types";
import React from "react";
import { StatusType } from "types";
import { restrictToNumber } from "utils/misc";
import SelectComponent from "components/Select";

interface ClubFormPageProps {
  createClub?: (formData: any) => Promise<any>;
  updateClub?: (formData: any) => Promise<any>;
  loading: boolean;
  type: "create" | "edit";
  data?: Club;
  validationError: validationType;
}

const ClubFormPage: React.FC<ClubFormPageProps> = props => {
  const { createClub, loading, type, data, validationError, updateClub } =
    props;

  const initialFormData = {
    admin_rate: data?.admin_rate || "",
    club_game_id: data?.club_game_id || "",
    club_name: data?.club_name || "",
    contact_person: data?.contact_person || "",
    email: data?.email || "",
    mobile_number: data?.mobile_number || "",
    status: data?.status || StatusType.ACTIVE
  };

  const adminRateChoices = () => {
    // eslint-disable-next-line prefer-const
    let tempArray = [];
    for (let i = 1; i <= 10; i++) {
      tempArray.push({
        label: `${i}%`,
        value: i
      });
    }
    return tempArray;
  };

  return (
    <>
      <PageHeader title={type === "create" ? "Create Club" : `# ${data?.id}`} />
      <Form
        initial={initialFormData}
        onSubmit={type === "create" ? createClub : updateClub}
      >
        {({ data, change, submit, hasChanged }) => (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12}>
                <Card title="General Information">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        name="club_game_id"
                        value={data.club_game_id}
                        error={validationError.club_game_id ? true : false}
                        onKeyPress={restrictToNumber}
                        helperText={
                          validationError.club_game_id
                            ? validationError.club_game_id
                            : null
                        }
                        onChange={change}
                        fullWidth
                        label="Club Game ID"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        name="club_name"
                        value={data.club_name}
                        error={validationError.club_name ? true : false}
                        helperText={
                          validationError.club_name
                            ? validationError.club_name
                            : null
                        }
                        onChange={change}
                        fullWidth
                        label="Club Name"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <SelectComponent
                        choices={adminRateChoices()}
                        name="admin_rate"
                        label="Admin Rate"
                        onChange={change}
                        value={data.admin_rate}
                      />
                      {/* <TextField
                        name="admin_rate"
                        value={data.admin_rate}
                        error={validationError.admin_rate ? true : false}
                        helperText={
                          validationError.admin_rate
                            ? validationError.admin_rate
                            : null
                        }
                        onChange={change}
                        fullWidth
                        label="Admin Rate"
                      /> */}
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <TextField
                        name="contact_person"
                        value={data.contact_person}
                        onChange={change}
                        error={validationError.contact_person ? true : false}
                        helperText={
                          validationError.contact_person
                            ? validationError.contact_person
                            : null
                        }
                        fullWidth
                        label="Contact Person"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <TextField
                        name="mobile_number"
                        value={data.mobile_number}
                        onChange={change}
                        onKeyPress={restrictToNumber}
                        error={validationError.mobile_number ? true : false}
                        helperText={
                          validationError.mobile_number
                            ? validationError.mobile_number
                            : null
                        }
                        fullWidth
                        label="Mobile Number"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4}>
                      <TextField
                        name="email"
                        value={data.email}
                        onChange={change}
                        error={validationError.email ? true : false}
                        helperText={
                          validationError.email ? validationError.email : null
                        }
                        fullWidth
                        label="Email"
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12}>
                      <FormGroup>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={
                                data.status === StatusType.ACTIVE ? true : false
                              }
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
              loading={loading}
            />
          </>
        )}
      </Form>
    </>
  );
};

export default ClubFormPage;
