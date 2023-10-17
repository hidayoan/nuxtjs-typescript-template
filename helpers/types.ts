export interface RequesListingType {
  page?: number;
  pageSize?: number;

  // status = '',
  // search = '',
  // searchFields = [],
  // rangeKey = '',
  // rangeValues = [],
  // id = '',
  // populates = [],
  // fields = [],
  // sort = '-createdAt',
  status?: string;
  search?: string;
  searchFields?: string[];
  rangeKey?: string;
  rangeValues?: string[];
  id?: string;
  populates?: string[];
  fields?: string[];
  sort?: string;
}