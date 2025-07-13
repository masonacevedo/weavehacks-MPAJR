export const fetchRequest = (methodType, requestType, payload) => {
  return {
    method: methodType,
    url: `${requestType}`,
    data: payload,
  };
};
