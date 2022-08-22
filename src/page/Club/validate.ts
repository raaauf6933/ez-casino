export const userFormValidate = (formData: any) => {
  const {
    club_name,
    contact_person,
    mobile_number,
    email,
    club_game_id,
    admin_rate
  } = formData;

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

  const clubGameIdValidate = () => {
    if (club_game_id === "") {
      return "This field is required";
    } else {
      return null;
    }
  };

  const adminRateValidate = () => {
    if (admin_rate === "") {
      return "This field is required";
    } else {
      return null;
    }
  };

  return {
    admin_rate: adminRateValidate(),
    club_game_id: clubGameIdValidate(),
    club_name: clubNameValidate(),
    contact_person: contactPersonValidate(),
    email: emailValidate(),
    mobile_number: mobileNumberValidate()
  };
};
