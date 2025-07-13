export const fetchRequest = (methodType, url, payload) => {
  return {
    method: methodType,
    url: `${url}`,
    data: payload,
  };
};
