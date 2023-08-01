export function objectToFormData(
  obj,
  formData = new FormData(),
  parentKey = ""
) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const formattedKey = parentKey ? `${parentKey}[${key}]` : key;

      if (value && typeof value === "object" && !(value instanceof File)) {
        objectToFormData(value, formData, formattedKey);
      } else if (Array.isArray(value)) {
        value.forEach((item, index) => {
          const arrayKey = `${formattedKey}[${index}]`;
          formData.append(arrayKey, item);
        });
      } else {
        formData.append(formattedKey, value);
      }
    }
  }

  return formData;
}
