export const checkError = (key: any, formErrors: any, validationError: any) => {
  const message = formErrors[key].message;

  return {
    hasError: !!formErrors[key] || !!validationError[key],
    message: formErrors[key] ? message : validationError[key]
  };
};

export const hasNoError = (validationError: any) => {
  let thisReturn = true;
  Object.keys(validationError).map(key => {
    if (thisReturn) {
      thisReturn = validationError[key] === null;
    }
  });
  return thisReturn;
};
