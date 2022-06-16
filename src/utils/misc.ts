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
