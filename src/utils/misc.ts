/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";

export function maybe<T>(exp: () => T): T | undefined;
export function maybe<T>(exp: () => T, d: T): T;
export function maybe(exp: any, d?: any) {
  try {
    const result = exp();
    return result === undefined ? d : result;
  } catch {
    return d;
  }
}

export function renderCollection(
  collection: any[] | undefined,
  loading: boolean,
  renderItem: (data: any) => React.ReactNode,
  renderEmpty: (data: any[] | undefined) => React.ReactNode,
  renderLoading: (data: any[] | undefined) => React.ReactNode
) {
  if (loading || collection === undefined) {
    return renderLoading(collection);
  }

  if (collection?.length === 0) {
    return renderEmpty(collection);
  }
  return collection?.map(renderItem);
}

export const restrictToNumber = (event: any) => {
  if (!/[0-9]/.test(event.key)) {
    event.preventDefault();
  }
};

export function findValueInEnum<TEnum extends object>(
  needle: string,
  haystack: TEnum
): TEnum[keyof TEnum] {
  const match = Object.entries(haystack).find(([_, value]) => value === needle);

  if (!match) {
    throw new Error(`Value ${needle} not found in enum`);
  }

  return needle as unknown as TEnum[keyof TEnum];
}

export function findInEnum<TEnum extends object>(
  needle: string,
  haystack: TEnum
) {
  const match = Object.keys(haystack).find(key => key === needle);
  if (!!match) {
    return haystack[needle as keyof TEnum];
  }

  throw new Error(`Key ${needle} not found in enum`);
}
