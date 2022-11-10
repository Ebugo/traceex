import {
  Checkbox,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Typography,
} from '@mui/material';
import React from 'react';
import { Grid, TextField } from '@mui/material';
import CustomDialog from '../../../../elements/CustomDialog';
import { FC } from 'react';
import { DispatchSetProducts, Product } from '../../../../../_types';
import { FormikProvider, Form } from 'formik';
import ErrorHelperText from '../../../UI/ErrorHelperText';
import { LoadingButton } from '@mui/lab';
import useProductForm from '../../../../hooks/useProductForm';
import NumberFormatCustom from '../../../UI/NumberFormatCustom';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

interface NewProductDialogProps {
  showDialog: boolean;
  onCloseDialog: () => void;
  setProducts: DispatchSetProducts;
}

const NewProductDialog: FC<NewProductDialogProps> = ({
  showDialog = false,
  onCloseDialog,
  setProducts,
}) => {
  const handleClose = () => {
    resetForm();
    onCloseDialog();
  };

  const saveAndCloseProduct = (product?: Product) => {
    if (product) {
      setProducts((products) => [...products, { ...product, quantity: 1 }]);
    }

    handleClose();
  };

  const { productFormik } = useProductForm(saveAndCloseProduct);

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

  return (
    <CustomDialog
      open={showDialog}
      titlemarginbottom={2}
      rootpaddingblock={8}
      rootpaddinginline={8}
    >
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

            <Typography variant="h5" fontWeight={600} mt={2}>
              Add new product
            </Typography>
          </DialogTitle>

          <DialogContent>
            <Grid container rowSpacing={2}>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <FormLabel error={Boolean(touched.name && errors.name)}>
                    Name
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
                    Price
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
              Add Product
            </LoadingButton>
          </DialogActions>
        </Form>
      </FormikProvider>
    </CustomDialog>
  );
};

export default NewProductDialog;
