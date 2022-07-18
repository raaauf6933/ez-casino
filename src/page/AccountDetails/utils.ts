export const UseChangePasswordValidate = (formData: any) => {
  const { oldPassword, newPassword, confirmNewPassword } = formData;

  const oldPasswordValidate = () => {
    if (oldPassword === "") {
      return "This field is required";
    } else {
      return null;
    }
  };

  const newPasswordValidate = () => {
    if (newPassword === "") {
      return "This field is required";
    } else {
      return null;
    }
  };

  const confirmNewPasswordValidate = () => {
    if (confirmNewPassword === "") {
      return "This field is required";
    } else if (confirmNewPassword !== newPassword) {
      return "New password and Confirm password does not match";
    } else {
      return null;
    }
  };

  return {
    confirmNewPassword: confirmNewPasswordValidate(),
    newPassword: newPasswordValidate(),
    oldPassword: oldPasswordValidate()
  };
};
