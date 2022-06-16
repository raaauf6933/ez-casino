import { toggle } from "utils/lists";
import isEqual from "lodash/isEqual";
import { useState } from "react";

import useStateFromProps from "./useStateFromProps";

export interface ChangeEvent<TData = any> {
  target: {
    name: string;
    value: TData;
  };
}
export type SubmitPromise = Promise<any[]>;

export type FormChange = (event: ChangeEvent, cb?: () => void) => void;

export interface UseFormResult<T> {
  change: FormChange;
  data: T | any;
  hasChanged: boolean;
  reset: () => void;
  set: (data: T) => void;
  submit: () => void;
  submitWithOpts: (opts: any) => void;
  triggerChange: () => void;
  toggleValue: FormChange;
}

type FormData = Record<string, any | any[] | undefined>;

function merge<T extends FormData>(prevData: T, prevState: T, data: T): T {
  return Object.keys(prevState).reduce(
    (acc, key) => {
      if (!isEqual(data[key], prevData[key])) {
        acc[key as keyof T] = data[key];
      }

      return acc;
    },
    { ...prevState }
  );
}

function handleRefresh<T extends FormData>(
  data: T,
  newData: T,
  setChanged: (status: boolean) => void
) {
  if (isEqual(data, newData)) {
    setChanged(false);
  }
}

function useForm<T extends FormData>(
  initial: T,
  onSubmit?: (data: T | any) => SubmitPromise | void
): UseFormResult<T> {
  const [hasChanged, setChanged] = useState(false);
  const [data, setData] = useStateFromProps<any>(initial, {
    mergeFunc: merge,
    onRefresh: newData => handleRefresh(data, newData, setChanged)
  });

  function toggleValue(event: ChangeEvent, cb?: () => void) {
    const { name, value } = event.target;
    const field = data[name as keyof T];

    if (Array.isArray(field)) {
      if (!hasChanged) {
        setChanged(true);
      }
      setData({
        ...data,
        [name]: toggle(value, field, isEqual)
      });
    }

    if (typeof cb === "function") {
      cb();
    }
  }

  function change(event: ChangeEvent) {
    const { name, value } = event.target;

    if (!(name in data)) {
      console.error(`Unknown form field: ${name}`);
      return;
    } else {
      if (data[name] !== value) {
        setChanged(true);
      }
      setData((data: any) => ({
        ...data,
        [name]: value
      }));
    }
  }

  function reset() {
    setData(initial);
  }

  function set(newData: Partial<T>) {
    setData((data: any) => ({
      ...data,
      ...newData
    }));
  }

  async function submit() {
    if (typeof onSubmit === "function") {
      const result = onSubmit(data);
      if (result) {
        const errors = await result;
        if (errors?.length === 0) {
          setChanged(false);
        }
      }
    }
  }

  // Additional method for SMOP requirements.
  // This is a quick solution if you want to do anything after a successful asyn request
  async function submitWithOpts(_opts = {}) {
    const defaultOpts = {
      clearUserType: false
    };
    const opts = { ...defaultOpts, ..._opts };
    const { clearUserType } = opts;
    if (typeof onSubmit === "function") {
      const result = onSubmit({ ...data, ..._opts });
      if (result) {
        const errors = await result;
        if (errors.length === 0) {
          setChanged(false);
          // Clear user type dropdown after a successful save
          if (clearUserType) {
            setData((data: any) => ({
              ...data,
              permissionGroup: ""
            }));
          }
        }
      }
    }
  }

  function triggerChange() {
    setChanged(true);
  }

  return {
    change,
    data,
    hasChanged,
    reset,
    set,
    submit,
    submitWithOpts,
    toggleValue,
    triggerChange
  };
}

export default useForm;
