export const objectToQueryParams = (obj: Object): string => {
  let result = '';

  for (const [key, value] of Object.entries(obj)) {
    if (result != '') result += '&';
    if (value == undefined || value == '') continue;

    if (Array.isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        if (value[i] == '' || value[i] == undefined) continue;

        result += `${key}=${encodeURIComponent(value[i])}`;

        if (i != value.length - 1) result += '&';
      }

      continue;
    }

    result += `${key}=${encodeURIComponent(value)}`;
  }

  return result;
};
