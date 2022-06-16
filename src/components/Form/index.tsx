import useForm, { SubmitPromise, UseFormResult } from "hooks/useForm";
import React from "react";

export interface FormProps<T> {
  children: (props: UseFormResult<T>) => React.ReactNode;
  confirmLeave?: boolean;
  initial?: T | any;
  resetOnSubmit?: boolean;
  onSubmit?: (data: T) => SubmitPromise | any;
  noAutocomplete?: boolean;
}

function Form<T>(props: FormProps<T>) {
  const { children, initial, resetOnSubmit, onSubmit, noAutocomplete } = props;
  const renderProps = useForm(initial, onSubmit);

  function handleSubmit(event?: React.FormEvent<any>, cb?: () => void) {
    const { reset, submit } = renderProps;

    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }

    if (cb) {
      cb();
    }

    if (resetOnSubmit) {
      reset();
    }

    submit();
  }

  return noAutocomplete ? (
    <form onSubmit={handleSubmit} autoComplete="off">
      {children(renderProps)}
    </form>
  ) : (
    <form onSubmit={handleSubmit}>{children(renderProps)}</form>
  );
}
Form.displayName = "Form";

export default Form;
