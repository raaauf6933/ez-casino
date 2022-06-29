import { Grid, TextField } from "@mui/material";
import Card from "components/Card";
import Form from "components/Form";
import PageHeader from "components/PageHeader";
import { useUser } from "context/auth/context";
import moment from "moment-timezone";
import * as React from "react";
import { UserTypeEnum } from "types";
import { maybe } from "utils/misc";

interface DetailsPageProps {
  user: any;
  usertype: string;
}

const DetailsPage: React.FC<DetailsPageProps> = props => {
  const { user, usertype } = props;
  const userContext = useUser();
  const initialFormData = {
    added_by: user?.added_by?.name || "",
    added_by_usertype: user?.added_by_usertype || "",
    club: user?.Club?.club_name || "",
    contact_number: user?.contact_number || "",
    date_created: moment(user?.createdAt).format("LL") || "",
    email: user?.email || "",
    first_name: user?.first_name || "",
    last_name: user?.last_name || ""
  };

  return (
    <>
      <PageHeader
        title={
          maybe(() => usertype.replace(/_/g, " "), "") ||
          maybe(() => userContext?.usertype, UserTypeEnum.AGENT)
        }
      />
      <Form initial={initialFormData}>
        {({ data, change }) => (
          <>
            <Grid container spacing={2}>
              <Grid item md={12}>
                <Card title="User Information">
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        label="First Name"
                        name="first_name"
                        value={data.first_name}
                        onChange={change}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        label="Last Name"
                        name="last_name"
                        value={data.last_name}
                        onChange={change}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        label="Email"
                        name="email"
                        value={data.email}
                        onChange={change}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={6}>
                      <TextField
                        fullWidth
                        label="Contact Number"
                        name="contact_number"
                        value={data.contact_number}
                        onChange={change}
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item md={12}>
                <Card title="User Details">
                  <Grid container spacing={2}>
                    {userContext?.usertype ===
                    UserTypeEnum.SUPER_USER ? null : (
                      <Grid item xs={12} sm={12} md={12}>
                        <TextField
                          fullWidth
                          label="Club"
                          name="club"
                          value={data?.club}
                          disabled
                        />
                      </Grid>
                    )}
                    {userContext?.usertype === UserTypeEnum.AGENT ? (
                      <>
                        {" "}
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField
                            fullWidth
                            label="Added By Usertype"
                            name="added_by_usertype"
                            value={data?.added_by_usertype.replace(/_/g, " ")}
                            disabled
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={6}>
                          <TextField
                            fullWidth
                            label="Added By"
                            name="added_by"
                            value={data?.added_by}
                            disabled
                          />
                        </Grid>
                      </>
                    ) : null}
                    <Grid item xs={12} sm={12} md={12}>
                      <TextField
                        fullWidth
                        label="Date Created"
                        value={data?.date_created}
                        disabled
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </>
        )}
      </Form>
    </>
  );
};

export default DetailsPage;
