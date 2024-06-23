exports.getURLandSearchParams = (url, queryParams) => {
  const parsedUrl = new URL(url);

  // Extract the base URL without query parameters
  const urlWithoutQuery = `${parsedUrl.protocol}//${parsedUrl.host}${parsedUrl.pathname}`;

  // Extract query parameters as an object
  const updatedQueryParams = {};
  for (const [key, value] of parsedUrl.searchParams) {
    updatedQueryParams[key] = value;
  }

  // Merging queryParams with Extracted query parameters
  for (const key in queryParams) {
    updatedQueryParams[key] = queryParams[key];
  }

  return { urlWithoutQuery, updatedQueryParams };
};
