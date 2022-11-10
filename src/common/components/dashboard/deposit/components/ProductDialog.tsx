import {
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { FormikProvider, Form } from 'formik';
import { Grid, TextField } from '@mui/material';
import ErrorHelperText from '../../../UI/ErrorHelperText';
import { LoadingButton } from '@mui/lab';
import CustomDialog from '../../../../elements/CustomDialog';
import useProductForm from '../../../../hooks/useProductForm';
import { FC } from 'react';
import SingleUpload from '../../../UI/SingleUpload';
import { ACCEPTED_DOCUMENT_TYPES, MAX_FILE_SIZE } from '../../../../constants';
import NumberFormatCustom from '../../../UI/NumberFormatCustom';

interface ProductDialogProps {
  showDialog: boolean;
  onCloseDialog: () => void;
}

const ProductDialog: FC<ProductDialogProps> = ({
  showDialog = false,
  onCloseDialog,
}) => {
  const {
    productFormik,
    selectedProductId,
    documentState,
    deleteFile,
    handleFileDrop,
  } = useProductForm(onCloseDialog);

  const {
    errors,
    touched,
    isValid,
    isSubmitting,
    values,
    handleSubmit,
    getFieldProps,
    resetForm,
  } = productFormik;

  const handleClose = () => {
    resetForm();
    onCloseDialog();
  };

  return (
    <CustomDialog open={showDialog} titlemarginbottom={4}>
      <FormikProvider value={productFormik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <DialogTitle component="div">
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>

            <Typography variant="h5" fontWeight={600}>
              {selectedProductId
                ? 'Update existing product'
                : 'Add new product'}
            </Typography>
          </DialogTitle>

          <DialogContent>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel error={Boolean(touched.image && errors.image)}>
                    Image
                  </FormLabel>

                  <SingleUpload
                    maxSize={MAX_FILE_SIZE}
                    accept={ACCEPTED_DOCUMENT_TYPES}
                    file={documentState?.image?.file || values.image || null}
                    name={documentState?.image?.name}
                    removeFile={deleteFile.bind(null, 'image', 'imageFile')}
                    onDrop={(acceptedFiles) =>
                      handleFileDrop.call(null, acceptedFiles, 'image')
                    }
                    error={Boolean(touched.image && errors.image)}
                  />

                  {touched.image && errors.image && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.image && errors.image}
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel error={Boolean(touched.name && errors.name)}>
                    Product name
                  </FormLabel>
                  <TextField
                    id="name"
                    variant="outlined"
                    autoComplete="off"
                    placeholder="Product name e.g Shirt"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={
                      <ErrorHelperText
                        touched={touched.name}
                        errorMessage={errors.name}
                      />
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel error={Boolean(touched.price && errors.price)}>
                    Product price
                  </FormLabel>
                  <TextField
                    id="price"
                    variant="outlined"
                    autoComplete="off"
                    placeholder="Product price in Naira"
                    InputProps={{
                      inputProps: {
                        inputMode: 'numeric',
                        pattern: '[0-9]*',
                        min: 0,
                      },
                      inputComponent: NumberFormatCustom,
                    }}
                    {...getFieldProps('price')}
                    error={Boolean(touched.price && errors.price)}
                    helperText={
                      <ErrorHelperText
                        touched={touched.price}
                        errorMessage={errors.price}
                      />
                    }
                  />
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...getFieldProps('is_published')}
                        checked={values.is_published}
                        sx={{ '& .MuiSvgIcon-root': { fontSize: 30 } }}
                      />
                    }
                    label={
                      <Typography variant="details">Show on website</Typography>
                    }
                  />
                </FormControl>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions>
            <LoadingButton
              disableElevation
              disabled={!isValid}
              loading={isSubmitting}
              variant="contained"
              type="submit"
            >
              {selectedProductId ? 'Update' : 'Add'} product
            </LoadingButton>
          </DialogActions>
        </Form>
      </FormikProvider>
    </CustomDialog>
  );
};

export default ProductDialog;
