interface UserError {
  field: string | null;
  message?: string;
}

export function getFieldError<T extends UserError>(
  errors: T[] | any,
  field: string
): T {
  return errors.find((err: any) => err.field === field);
}

export function getErrors(errors: UserError[]): string[] | any {
  return errors
    .filter(err => ["", null].includes(err.field))
    .map(err => err.message);
}

export function getFormErrors<TField extends string, TError extends UserError>(
  fields: TField[],
  errors: TError[]
): Record<TField, TError> {
  return fields.reduce((errs, field) => {
    errs[field] = getFieldError(errors, field);
    return errs;
  }, {} as unknown as Record<TField, TError>);
}
