import React from "react";
import Container from "auth/components/container";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Typography,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput
} from "@mui/material";
import useStyles from "./styles";
import logo from "../../../assets/images/ec_logo.png";
import Form from "components/Form";
import AuthContext from "context/auth/context";
import { useContext } from "react";
import AppStateContext from "context/appState/context";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export interface LoginFormData {
  password: string;
  username: string;
}

const intitialForm = {
  password: "",
  username: ""
};

const Login: React.FC = props => {
  const { userLogin } = React.useContext(AuthContext);
  const { state } = useContext(AppStateContext);
  const [error, setError] = React.useState<any>();
  const classes = useStyles(props);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const onSubmit = async (formData: LoginFormData) => {
    const error = await userLogin(formData);

    if (error) {
      setError(error);
    }
  };

  return (
    <>
      <Container>
        <Card
          sx={{
            maxWidth: "390px"
          }}
        >
          <CardContent className={classes.root}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              marginBottom={5}
            >
              <img src={logo} alt="logo" loading="lazy" />
            </Box>
            <Form initial={intitialForm} onSubmit={onSubmit}>
              {({ change, data, submit }) => {
                return (
                  <>
                    {" "}
                    <TextField
                      className={classes.textField}
                      label="Username"
                      name="username"
                      helperText={error ? "Invalid Username or Password" : null}
                      value={data?.username}
                      onChange={change}
                      fullWidth
                      error={error ? true : false}
                      size="small"
                    />
                    <FormControl
                      // sx={{ m: 1, width: "25ch" }}
                      variant="outlined"
                      fullWidth
                      size="small"
                      className={classes.textField}
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        Password
                      </InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={data?.password}
                        onChange={change}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setShowPassword(prevState => !prevState)
                              }
                              onMouseDown={e => e.preventDefault()}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>
                    <Box marginBottom="10px">
                      <Typography
                        sx={{
                          cursor: "pointer"
                        }}
                        color="primary"
                        variant="body2"
                      >
                        Forgot Password?
                      </Typography>
                    </Box>
                    <Button
                      variant="contained"
                      fullWidth
                      onClick={submit}
                      disabled={state.loading}
                      sx={{
                        fontWeight: 600
                      }}
                    >
                      Login
                    </Button>
                  </>
                );
              }}
            </Form>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Login;
