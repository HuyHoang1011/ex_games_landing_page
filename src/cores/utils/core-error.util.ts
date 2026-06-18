// ? handle error message for http request
export const getErrorMessage = (error: unknown, fallback: string): string => {
  if (typeof error === 'object' && error !== null && 'message' in error) {
    return String((error as { message: string }).message);
  }
  return fallback;
};

export function debugNullField(entity: any, field: string, message?: string) {
  const value = entity?.[field];

  // nếu falsy nhưng không phải null/undefined thì skip
  if (value === null || value === undefined || value === '') {
    console.error(message || `❌ Backend trả NULL/undefined cho field "${field}":`, {
      field,
      value,
    });
    return true;
  }

  return false;
}
