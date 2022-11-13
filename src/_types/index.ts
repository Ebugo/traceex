export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type { HttpSuccessResponse, HttpErrorResponse } from './ApiResponse';

export type {
  AuthSuccess,
  Auth,
  Business,
  Profile,
  CreateProfile,
  RefreshTokenPayload,
  UpdatePassword,
  UpdateProfile,
} from './Authentication';

export type {
  Customer,
  CreateCustomer,
  UpdateCustomer,
  DispatchSetCustomer,
} from './Customer';

export type { CustomDialogProp } from './Dialog';

export type { BusinessMetrics, UpdateBusiness } from './Business';

export type { DropDown, Currencies } from './DropDown';

export type {
  Wallet,
  Transaction,
  Withdraw,
  Deposit,
  Bank,
  AccountNameLookup,
} from './Wallet';

export type { CustomFile, UploadFileType, SingleUploadProps } from './Upload';
