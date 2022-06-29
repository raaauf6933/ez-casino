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
import SelectComponent from "components/Select";
import { Club } from "page/Club/types";
import * as React from "react";
import { StatusType, UserTypeEnum } from "types";

export interface initialFormDataType {
  club_id: number | null;
  confirm_password: string;
  contact_number: string;
  email: string;
  first_name: string | undefined;
  last_name: string;
  password: string;
  usertype: string;
  username: string;
  status: StatusType;
}

interface CreatePageProps {
  createUser?: (formData: initialFormDataType) => void;
  updateUser?: (formData: any) => void;
  validationError: any;
  type: "create" | "edit";
  data?: any;
  loading: boolean;
  clubList?: Club[];
}

const CreatePage: React.FC<CreatePageProps> = props => {
  const {
    createUser,
    validationError,
    data,
    type,
    updateUser,
    loading,
    clubList
  } = props;

  const initialFormData = {
    club_id: data?.club_id || null,
    confirm_password: "",
    contact_number: data?.contact_number || "",
    email: data?.email || "",
    first_name: data?.first_name || "",
    last_name: data?.last_name || "",
    password: "",
    status: data?.status || StatusType.ACTIVE,
    username: data?.username || "",
    usertype: data?.usertype || ""
  };

  const clubListChoice = clubList
    ? clubList?.map(e => ({
        label: e.club_name,
        value: e.id
      }))
    : [];

  return (
    <>
      <PageHeader title={type === "create" ? "Create User" : `# ${data?.id}`} />
      <Form
        initial={initialFormData}
        onSubmit={type === "create" ? createUser : updateUser}
      >
        {({ change, data, submit, hasChanged }) => (
          <>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={8}>
                <Card title="User Information">
                  <Grid container spacing={2}>
                    <Grid item sm={12} md={6}>
                      <TextField
                        name="first_name"
                        value={data.first_name}
                        error={validationError.first_name}
                        helperText={
                          validationError.first_name
                            ? validationError.first_name
                            : null
                        }
                        onChange={change}
                        fullWidth
                        label="First name"
                      />
                    </Grid>
                    <Grid item sm={12} md={6}>
                      <TextField
                        name="last_name"
                        value={data.last_name}
                        onChange={change}
                        error={validationError.last_name}
                        helperText={
                          validationError.last_name
                            ? validationError.last_name
                            : null
                        }
                        fullWidth
                        label="Last name"
                      />
                    </Grid>
                    <Grid item sm={12} md={6}>
                      <TextField
                        name="email"
                        value={data.email}
                        onChange={change}
                        error={validationError.email}
                        helperText={
                          validationError.email ? validationError.email : null
                        }
                        fullWidth
                        label="Email"
                      />
                    </Grid>
                    <Grid item sm={12} md={6}>
                      <TextField
                        name="contact_number"
                        value={data.contact_number}
                        onChange={change}
                        error={validationError.contact_number}
                        helperText={
                          validationError.contact_number
                            ? validationError.contact_number
                            : null
                        }
                        fullWidth
                        label="Contact Number"
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
                              // inputProps={{ "aria-label": "controlled" }}
                            />
                          }
                          label="Active Status"
                        />
                      </FormGroup>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={4}>
                <Card title="User Type">
                  <SelectComponent
                    name="usertype"
                    label="User Type"
                    onChange={change}
                    value={data?.usertype}
                    margin="normal"
                    error={validationError.usertype ? true : false}
                    helperText={
                      validationError.usertype ? validationError.usertype : null
                    }
                    choices={[
                      {
                        label: "SUPER USER",
                        value: "SUPER_USER"
                      },
                      {
                        label: "CLUB ADMIN",
                        value: "CLUB_ADMIN"
                      }
                    ]}
                  />
                  {data?.usertype === UserTypeEnum.CLUB_ADMIN ? (
                    <SelectComponent
                      name="club_id"
                      label="Club"
                      onChange={change}
                      value={data?.club_id}
                      choices={clubListChoice}
                      error={validationError.club_id ? true : false}
                      helperText={
                        validationError.club_id ? validationError.club_id : null
                      }
                    />
                  ) : null}
                </Card>
              </Grid>
              <Grid item xs={12} sm={12} md={8}>
                <Card title="User Account Details">
                  <Grid container spacing={2}>
                    <Grid item sm={12} md={12}>
                      <TextField
                        name="username"
                        value={data.username}
                        onChange={change}
                        error={validationError.username}
                        helperText={
                          validationError.username
                            ? validationError.username
                            : null
                        }
                        fullWidth
                        label="Username"
                        disabled={type === "edit" ? true : false}
                      />
                    </Grid>
                    {type === "create" ? (
                      <>
                        <Grid item sm={12} md={6}>
                          <TextField
                            name="password"
                            value={data.password}
                            onChange={change}
                            error={validationError.password ? true : false}
                            helperText={
                              validationError.password
                                ? validationError.password
                                : null
                            }
                            fullWidth
                            label="Password"
                            type="password"
                          />
                        </Grid>
                        <Grid item sm={12} md={6}>
                          <TextField
                            name="confirm_password"
                            value={data.confirm_password}
                            onChange={change}
                            error={validationError.confirm_password}
                            helperText={
                              validationError.confirm_password
                                ? validationError.confirm_password
                                : null
                            }
                            fullWidth
                            label="Confirm Password"
                            type="password"
                          />
                        </Grid>
                      </>
                    ) : null}
                  </Grid>
                </Card>
              </Grid>
            </Grid>
            <SaveButtonBar
              onBack={() => null}
              onSave={submit}
              disabled={!hasChanged}
              loading={loading}
            />
          </>
        )}
      </Form>
    </>
  );
};

export default CreatePage;
