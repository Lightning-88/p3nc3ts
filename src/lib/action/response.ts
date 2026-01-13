type ActionResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  errors?: T;
};

export function successResponse<T>(
  message: string,
  data: T
): ActionResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

export function errorResponse<T>(
  message: string,
  errors: T
): ActionResponse<T> {
  return {
    success: false,
    message,
    errors,
  };
}
