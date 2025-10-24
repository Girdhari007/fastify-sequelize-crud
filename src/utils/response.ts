export const success = (message: string, data: any = null) => ({
  success: true,
  message,
  data,
});

export const failure = (message: string, error: any = null) => ({
  success: false,
  message,
  error,
});
