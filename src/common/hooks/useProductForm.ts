import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { HttpErrorResponse, Product, ProductFormik } from '../../_types';
import { useAuth } from '../contexts/auth-context';

import { useRouter } from 'next/router';
import { useMemo, useReducer, useCallback } from 'react';
import { getProducts } from '../redux/actions/productActions';
import { UpdateProduct, CreateProduct } from '../../_types';
import { updateProductApi, createProductApi } from '../../_apis_/product';
import { trimmedFileName } from '../utils';
import { uploadFile } from '../../_apis_/upload';
import { useSelector } from 'react-redux';
import { dispatch, RootState } from '../redux/store';

enum DocumentActionKind {
  SET_FILE = 'SET_FILE',
}
interface DocumentAction {
  type: DocumentActionKind;
  payload: { key: string; file: File | Blob | null; name: string };
}
interface DocumentState {
  image: {
    file: Blob | null;
    name: string;
  };
}

const documentReducer = (state: DocumentState, action: DocumentAction) => {
  const {
    type,
    payload: { key, file, name },
  } = action;

  if (type === DocumentActionKind.SET_FILE) {
    return { ...state, [key]: { file, name } };
  }

  return state;
};

const useProductForm = (onProductSave: (createdProduct?: Product) => void) => {
  const { business } = useAuth();
  const businessId = business?.id as string;

  const router = useRouter();
  const { query } = router;

  const selectedProductId = query?.selectedProductId || null;

  const [documentState, dispatchDocumentAction] = useReducer(documentReducer, {
    image: {
      file: null,
      name: '',
    },
  });

  const { products } = useSelector((state: RootState) => state.productSlice);

  const selectedProduct = useMemo(() => {
    if (!selectedProductId) {
      return null;
    }

    return products.find((product) => product.id === selectedProductId);
  }, [selectedProductId, products]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Please provide the product name'),
    price: Yup.number()
      .required('Please provide the product price')
      .test(
        'greaterThanZero',
        'Amount must be great than zero',
        (value) => (value as number) > 0
      ),
    image: Yup.mixed().nullable(),
    is_published: Yup.boolean(),
  });

  const initialValues = useMemo(
    () => ({
      name: selectedProduct?.name ?? '',
      price: parseFloat(selectedProduct?.price as string) ?? 0,
      image: selectedProduct?.image ?? null,
      is_published: selectedProduct?.is_published ?? true,
    }),
    [
      selectedProduct?.image,
      selectedProduct?.is_published,
      selectedProduct?.name,
      selectedProduct?.price,
    ]
  );

  const productFormik = useFormik<ProductFormik>({
    enableReinitialize: true,
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setSubmitting(true);

      try {
        const payload = {
          ...values,
          ...(values.price && { price: values.price.toString() }),
          business: businessId,
          ...(selectedProductId && { id: selectedProductId }),
        };

        if (payload?.image && typeof payload?.image !== 'string') {
          const { data } = await uploadFile(payload.image);

          payload.image = data.url;
        }

        const response = selectedProductId
          ? await updateProductApi(payload as UpdateProduct)
          : await createProductApi(payload as CreateProduct);

        toast.success(
          response.message ||
            `Product ${selectedProductId ? 'updated' : 'created'} successfully`
        );

        dispatch(getProducts(businessId as string));

        resetForm();

        onProductSave(response.data);
      } catch (error: unknown) {
        toast.error(
          (error as HttpErrorResponse)?.message ||
            `Failed to ${
              selectedProductId ? 'update' : 'create'
            } product, please try again or contact an administrator`
        );
      }

      setSubmitting(false);
    },
  });

  const { setFieldValue } = productFormik;

  const deleteFile = (fieldName: string, fileName: string) => {
    setFieldValue(fieldName, null);

    dispatchDocumentAction({
      type: DocumentActionKind.SET_FILE,
      payload: { key: fileName, file: null, name: '' },
    });
  };

  const handleFileDrop = useCallback(
    async (acceptedFiles: File[], fieldName: string) => {
      const file = acceptedFiles[0];

      if (!file) {
        return;
      }

      dispatchDocumentAction({
        type: DocumentActionKind.SET_FILE,
        payload: {
          key: fieldName,
          file,
          name: trimmedFileName(file.name),
        },
      });

      setFieldValue(fieldName, file);
    },
    [setFieldValue]
  );

  return {
    productFormik,
    selectedProductId,
    documentState,
    deleteFile,
    handleFileDrop,
  };
};

export default useProductForm;
