import { VisibilityOff, Visibility } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from "@mui/material";
import ActionDialog from "components/ActionDialog";
import Form from "components/Form";
import { UseChangePasswordValidate } from "page/AccountDetails/utils";
import * as React from "react";
import { hasNoError } from "utils/validators";
import _ from "lodash";

interface ChangePassswordDialogProps {
  onSubmit: (data: any) => void | any;
  open: boolean;
  onClose: () => void;
}

interface PasswordVisibility {
  oldPassword: boolean;
  newPassword: boolean;
  confirmNewPassword: boolean;
}

const initialValidationData = {
  confirmNewPassword: "",
  newPassword: "",
  oldPassword: ""
};

const ChangePassswordDialog: React.FC<ChangePassswordDialogProps> = props => {
  const { onSubmit, open, onClose } = props;
  const [visibiilty, setVisibility] = React.useState<PasswordVisibility>({
    confirmNewPassword: false,
    newPassword: false,
    oldPassword: false
  });
  const [validationError, setValidationError] = React.useState<any>(
    initialValidationData
  );

  const handleSubmit = (opts: any) => {
    const formData = _.omit(opts, "reset");
    const reset = opts.reset;
    const validate = UseChangePasswordValidate(formData);
    if (hasNoError(validate)) {
      const error = onSubmit(formData);

      if (!error) {
        setVisibility({
          confirmNewPassword: false,
          newPassword: false,
          oldPassword: false
        });
        reset();
      }
    } else {
      setValidationError(validate);
    }
  };

  return (
    <>
      <Form
        initial={{
          confirmNewPassword: "",
          newPassword: "",
          oldPassword: ""
        }}
        onSubmit={handleSubmit}
      >
        {({ data, change, reset, submitWithOpts }) => (
          <>
            <ActionDialog
              title="Change Password"
              onSubmit={() => submitWithOpts({ reset })}
              open={open}
              onClose={onClose}
              disabled={
                !data.confirmNewPassword ||
                !data.newPassword ||
                !data.oldPassword
              }
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Old Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={visibiilty.oldPassword ? "text" : "password"}
                      value={data.oldPassword}
                      onChange={change}
                      name="oldPassword"
                      required
                      error={validationError.oldPassword ? true : false}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={() =>
                              setVisibility(prevState => ({
                                ...prevState,
                                oldPassword: !prevState.oldPassword
                              }))
                            }
                          >
                            {visibiilty.oldPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Old Password"
                    />
                    {validationError.oldPassword ? (
                      <FormHelperText error id="accountId-error">
                        {validationError.oldPassword}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      New Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={visibiilty.newPassword ? "text" : "password"}
                      value={data.newPassword}
                      onChange={change}
                      name="newPassword"
                      error={validationError.newPassword ? true : false}
                      required
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={() =>
                              setVisibility(prevState => ({
                                ...prevState,
                                newPassword: !prevState.newPassword
                              }))
                            }
                          >
                            {visibiilty.newPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="New Password"
                    />
                    {validationError.newPassword ? (
                      <FormHelperText error id="accountId-error">
                        {validationError.newPassword}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      Confirm New Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      type={visibiilty.confirmNewPassword ? "text" : "password"}
                      value={data.confirmNewPassword}
                      onChange={change}
                      name="confirmNewPassword"
                      error={validationError.confirmNewPassword ? true : false}
                      required
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            edge="end"
                            onClick={() =>
                              setVisibility(prevState => ({
                                ...prevState,
                                confirmNewPassword:
                                  !prevState.confirmNewPassword
                              }))
                            }
                          >
                            {visibiilty.confirmNewPassword ? (
                              <VisibilityOff />
                            ) : (
                              <Visibility />
                            )}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Confirm New Password"
                    />
                    {validationError.confirmNewPassword ? (
                      <FormHelperText error id="accountId-error">
                        {validationError.confirmNewPassword}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Grid>
              </Grid>
            </ActionDialog>
          </>
        )}
      </Form>
    </>
  );
};

export default ChangePassswordDialog;
