import { SxProps, Theme } from '@mui/material';
import { DropzoneOptions } from 'react-dropzone';

export interface CustomFile extends File {
  path?: string;
  preview?: string;
}

export type UploadFileType = CustomFile | null | Blob | string;

export interface SingleUploadProps extends DropzoneOptions {
  sx?: SxProps<Theme>;
  disabled?: boolean;
  file: UploadFileType;
  error?: boolean;
  removeFile?: () => void;
  name?: string;
}
