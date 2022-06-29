// import { initialFormDataType } from "./components/CreatePage";
import { UserTypeEnum } from "types";

export const userFormValidate = (formData: any) => {
  const {
    first_name,
    last_name,
    contact_number,
    email,
    password,
    confirm_password,
    username,
    usertype,
    club_id
  } = formData;

  const firstNameValidate = () => {
    if (first_name === "") {
      return "This field is required";
    } else {
      return null;
    }
  };

  const lastnameValidate = () => {
    if (last_name === "") {
      return "This field is required";
    } else {
      return null;
    }
  };

  const contactNumberValidate = () => {
    if (contact_number === "") {
      return "This field is required";
    } else {
      return null;
    }
  };

  const emailValidate = () => {
    if (email === "") {
      return "This field is required";
    } else {
      return null;
    }
  };

  const passwordValidate = () => {
    if (password === "") {
      return "This field is required";
    } else if (password !== confirm_password) {
      return "Password must be same with Confirm Password";
    } else {
      return null;
    }
  };

  const confirmPasswordValidate = () => {
    if (confirm_password === "") {
      return "This field is required";
    } else if (password !== confirm_password) {
      return "Password must be same with Confirm Password";
    } else {
      return null;
    }
  };

  const usernameValidte = () => {
    if (username === "") {
      return "This field is required";
    } else {
      return null;
    }
  };

  const userTypeValidate = () => {
    if (!usertype) {
      return "This field is required";
    } else {
      return null;
    }
  };

  const clubValidate = () => {
    if (usertype === UserTypeEnum.CLUB_ADMIN && !club_id) {
      return "This field is required";
    } else {
      return null;
    }
  };

  return {
    club_id: clubValidate(),
    confirm_password: confirmPasswordValidate(),
    contact_number: contactNumberValidate(),
    email: emailValidate(),
    first_name: firstNameValidate(),
    last_name: lastnameValidate(),
    password: passwordValidate(),
    username: usernameValidte(),
    usertype: userTypeValidate()
  };
};
