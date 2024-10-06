

exports.validateInput = (fields) => {
  const missingFields = [];
  for (const [key, value] of Object.entries(fields)) {
    if (!value) {
      missingFields.push(key);
    }
  }
  return missingFields;
};
