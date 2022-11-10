import {
  alpha,
  Paper,
  styled,
  Theme,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { FC, useEffect, useState } from 'react';

import { isString } from 'lodash';

import numeral from 'numeral';
import { getFileTypeFromMime } from '../../utils';
import { CustomFile, SingleUploadProps, UploadFileType } from '../../../_types';
import PdfPlaceHolder from '../../elements/PdfPlaceHolder';
import UploadImageIcon from '../../elements/icons/UploadImageIcon';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';

const fData = (number: string | number) => {
  return numeral(number).format('0.0 b');
};

const DropZoneStyle = styled('div')(({ theme }: { theme: Theme }) => ({
  outline: 'none',
  display: 'flex',
  overflow: 'hidden',
  textAlign: 'center',
  position: 'relative',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(5, 0),
  borderRadius: '8px',
  transition: theme.transitions.create('padding'),
  backgroundColor: theme.palette.background.default,
  border: `1px dashed ${theme.palette.grey[500]}`,
  '&:hover': {
    opacity: 0.72,
    cursor: 'pointer',
  },
  [theme.breakpoints.up('md')]: { textAlign: 'left', flexDirection: 'row' },
}));

const SingleUpload: FC<SingleUploadProps> = ({
  sx,
  disabled = false,
  error = false,
  removeFile,
  file,
  name = '',
  ...other
}) => {
  const [previewFile, setPreviewFile] = useState<UploadFileType>(null);

  const [isPdf, setIsPdf] = useState<boolean>(false);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    multiple: false,
    disabled,
    ...other,
  });

  const ShowRejectionItems = () => (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08),
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size }: CustomFile = file;
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {fData(size)}
            </Typography>
            {errors.map((e) => {
              if (e.code === 'file-too-large') {
                const messageAsArray = e.message.split(' ');
                const sizeInBytes = parseInt(
                  messageAsArray[messageAsArray.length - 2]
                );

                return (
                  <Typography key={e.code} variant="caption" component="p">
                    - {`File is larger than ${sizeInBytes / 1024} kilobytes`}
                  </Typography>
                );
              }

              return (
                <Typography key={e.code} variant="caption" component="p">
                  - {e.message}
                </Typography>
              );
            })}
          </Box>
        );
      })}
    </Paper>
  );

  useEffect(() => {
    if (file && !isString(file) && getFileTypeFromMime(file.type) === 'img') {
      setPreviewFile(URL.createObjectURL(file));
    } else {
      setPreviewFile(file);
    }

    let pdfFileExtension = '';

    if ((file as CustomFile)?.path) {
      const filePath = (file as CustomFile)?.path?.toLowerCase() || '';
      pdfFileExtension = filePath.slice(-3);
    }
    const isPdfBlob: boolean =
      file instanceof Blob && getFileTypeFromMime(file.type) === 'pdf';
    setIsPdf(pdfFileExtension.toLowerCase() === 'pdf' || isPdfBlob);
  }, [file]);

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.5 }),
          height: '108px',
          border: '1px dashed #D9DBE1',
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            backgroundColor: 'error.light',
          }),
          px: 2,
        }}
        style={{
          flexDirection: previewFile ? 'row' : 'column',
          ...(previewFile && { justifyContent: 'space-between' }),
          ...(disabled && {
            cursor: 'not-allowed',
          }),
        }}
      >
        <input disabled={disabled} {...getInputProps()} />

        {!previewFile && (
          <>
            <UploadImageIcon sx={{ fontSize: '32px' }} />

            <Typography variant="details" fontWeight={500}>
              Upload Image
            </Typography>
          </>
        )}

        {previewFile && (
          <>
            <Box display="flex" alignItems="center">
              {isPdf && (
                <PdfPlaceHolder sx={{ width: '53px', height: '71px' }} />
              )}

              {!isPdf && isString(previewFile) && (
                <Box
                  component="img"
                  alt="file preview"
                  src={previewFile}
                  sx={{
                    objectFit: 'cover',
                    width: '53px',
                    height: '71px',
                  }}
                />
              )}

              {name && (
                <Typography variant="details" fontSize="0.75rem" ml={2}>
                  {name}
                </Typography>
              )}
            </Box>

            <IconButton
              size="small"
              disableRipple
              sx={{
                backgroundColor: (theme) => theme.palette.error.light,
                color: (theme) => theme.palette.error.main,
              }}
              onClick={(e) => {
                removeFile?.();
                setPreviewFile(null);
                setIsPdf(false);

                e.stopPropagation();
              }}
            >
              <ClearOutlinedIcon sx={{ fontSize: '1.5rem' }} />
            </IconButton>
          </>
        )}

        {/* {!isPdf && (
          <UploadIllustration sx={{ width: 220, height: UPLOADER_HEIGHT }} />
        )} */}
        {/* {isPdf && (
          <PdfPlaceHolder sx={{ width: 220, height: UPLOADER_HEIGHT }} />
        )} */}
        {/* {!isPdf && !disabled && (
          <Box sx={{ p: 3, ml: { md: 2 }, height: UPLOADER_HEIGHT }}>
            <Typography gutterBottom variant="subtitle1">
              Select file
            </Typography>

            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Click{' '}
              <Typography
                variant="body2"
                component="span"
                sx={{ color: 'primary.main', textDecoration: 'underline' }}
              >
                browse
              </Typography>
              &nbsp;to select file from machine
            </Typography>
          </Box>
        )} */}
        {/* {!isPdf && previewFile && isString(previewFile) && (
          <Box
            component="img"
            alt="file preview"
            src={previewFile}
            sx={{
              top: 8,
              borderRadius: 1,
              objectFit: 'cover',
              position: 'absolute',
              width: 'calc(100% - 16px)',
              height: 'calc(100% - 16px)',
              minHeight: UPLOADER_HEIGHT,
            }}
          />
        )} */}
      </DropZoneStyle>

      {fileRejections.length > 0 && <ShowRejectionItems />}
    </Box>
  );
};

export default SingleUpload;
