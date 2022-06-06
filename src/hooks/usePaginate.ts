import _ from 'lodash';

export default (items: any[], pageNumber: number, pageSize: number): any[] | undefined => {
  const startIndex = pageNumber * pageSize;
  const array = items === undefined ? undefined : _(items).slice(startIndex).take(pageSize).value();
  return array;
};
