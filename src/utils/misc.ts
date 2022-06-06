import React from 'react';

export function renderCollection(
  collection: any[] | undefined,
  renderItem: (func: () => void) => React.ReactNode,
  renderEmpty: (data: any[] | undefined) => React.ReactNode,
  renderLoading: (data: any[] | undefined) => React.ReactNode
) {
  if (collection === undefined) {
    renderLoading(collection);
  }

  if (collection?.length === 0) {
    return renderEmpty(collection);
  }
  return collection?.map(renderItem);
}
