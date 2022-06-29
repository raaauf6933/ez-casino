export const userFormValidate = (formData: any) => {
  const { club_name, contact_person, mobile_number, email } = formData;

  const clubNameValidate = () => {
    if (club_name === "") {
      return "This field is required";
    } else {
      return null;
    }
  };

  const contactPersonValidate = () => {
    if (contact_person === "") {
      return "This field is required";
    } else {
      return null;
    }
  };

  const mobileNumberValidate = () => {
    if (mobile_number === "") {
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

  return {
    club_name: clubNameValidate(),
    contact_person: contactPersonValidate(),
    email: emailValidate(),
    mobile_number: mobileNumberValidate()
  };
};
