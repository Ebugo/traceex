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

export type { Service, CreateService, UpdateService } from './Service';

export type {
  Product,
  ProductFormik,
  CreateProduct,
  UpdateProduct,
  DispatchSetProducts,
} from './Product';

export type {
  StoreFront,
  CreateStoreFront,
  UpdateStoreFront,
} from './StoreFront';

export type {
  Customer,
  CreateCustomer,
  UpdateCustomer,
  DispatchSetCustomer,
} from './Customer';

export type {
  Order,
  OrderForm,
  CreateOrder,
  OrderStatus,
  CreateInvoice,
  DispatchSetOrder,
} from './Order';

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

export type { Team, CreateTeamMember, UpdateTeamMember } from './Team';

export type { Invoice } from './Invoice';
