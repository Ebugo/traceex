import { AxiosError } from 'axios';

export interface HttpSuccessResponse<T> {
  readonly message: string;
  readonly status: string;
  readonly data: T;
}

export interface HttpErrorResponse extends AxiosError {
  readonly message: string;
  readonly status: string;
  readonly success: boolean;
  readonly error: string;
}
