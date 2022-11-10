export const createFormData = (values: object) => {
  const formData = new FormData();

  for (const [key, value] of Object.entries(values)) {
    if (!value) {
      continue;
    }

    formData.append(key, value);
  }

  return formData;
};
