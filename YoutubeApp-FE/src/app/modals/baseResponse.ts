export interface BaseResponse<T> {
    isSuccess: boolean;
    errorMessage: string;
    data?: T;
  }