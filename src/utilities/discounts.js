export const convertFilterParametersToUrl = (params) => {
  const {
    sort, pageNumber, size, totalElements, totalPages, ...query
  } = params;

  console.log(query);
  // const updatedQuery = {
  //   ...query,
  //   // tags: query.tags?.map((el) => encodeURIComponent(el))
  //   // tags: query.tags?.map((el) => encodeURIComponent(el)).join()
  //   tags: query.tags?.join(',')
  // };

  // console.log(updatedQuery);

  const str = Object.keys(query)
    .filter((el) => query[el] !== null && query[el] !== '')
    .map((key) => `${key}:${encodeURIComponent(query[key])}`)
    .join(';')
    .replace('country:', 'locations.country.countryCode:')
    .replace('city:', 'locations.city:')
    .replace('vendorTitle:', 'vendor.title*:*')
    .replace('shortDescription:', 'shortDescription*:*')
    .replace('category:', 'category.id:')
    .replace('tags:', 'tags.id~');

  const queryParams = `?query=${str};`;
  const sortParams = `&sort=${sort}`;
  const paginationParams = `&page=${pageNumber}&size=${size}`;

  return { queryParams, sortParams, paginationParams };
};

export const convertUrlToFilterParameters = (queryString) => {
  const modifiedString = queryString
    .replace('shortDescription*:*', 'shortDescription:')
    .replace('vendor.title*:*', 'vendorTitle:')
    .replace('locations.city:', 'city:')
    .replace('locations.country.countryCode:', 'country:')
    .replace('category.id:', 'category:')
    .replace('tags.id~', 'tags:')
    .replace('%2C', ',')
    .replace('?query=', '')
    .replace('&sort=title,', 'sort:')
    .replace('&', ';')
    .replace('=', ':')
    .split(';');

  const queryParamsObject = modifiedString.reduce((acc, el) => {
    const [key, value] = el.split(':');
    if (key) {
      acc[key] = value;
    }
    return acc;
  }, {});

  return queryParamsObject;
};
