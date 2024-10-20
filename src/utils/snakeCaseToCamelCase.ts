const snakeCaseToCamelCase = (snakeCaseInput: string): string => {
  return snakeCaseInput.replace(/(_\w)/g, (match) => match[1].toUpperCase());
};

export const camelCaseObjectProperties = (
  input: Record<string, any>,
): Record<string, any> => {
  const result = Object.keys(input).reduce(
    (acc, property) => {
      const camelCasedProperty = snakeCaseToCamelCase(property);
      acc[camelCasedProperty] = input[property];
      return acc;
    },
    {} as Record<string, any>,
  );

  return result;
};
