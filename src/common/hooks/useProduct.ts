import { useAuth } from '../contexts/auth-context';
import { useRouter } from 'next/router';
import { useMemo, useEffect, useState } from 'react';
import { getProducts } from '../redux/actions/productActions';
import { dispatch, RootState, useSelector } from '../redux/store';
import { toast } from 'react-toastify';
import { HttpErrorResponse } from '../../_types/ApiResponse';
import { deleteProductApi } from '../../_apis_/product';

const useProduct = () => {
  const router = useRouter();
  const { query } = router;

  const search = (query?.search || '') as string;

  const noDataText = search
    ? 'No products found, please add a product or clear the search query'
    : 'No products found, please add a product';

  const { products } = useSelector((state: RootState) => state.productSlice);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const [loadingData, setLoadingData] = useState(true);
  const [deletingProduct, setDeletingProduct] = useState(false);
  const [selectedProductToDeleteId, setSelectedProductToDeleteId] = useState<
    string | null
  >(null);

  const { business } = useAuth();

  const businessId = business?.id as string;

  const showDialog = useMemo(() => {
    return query.showModal === 'add-product';
  }, [query]);

  const addProductHandler = () => {
    router.push({
      query: {
        ...query,
        showModal: 'add-product',
      },
    });
  };

  const closeProductDialogHandler = () => {
    router.back();
  };

  const editProductHandler = (selectedProductId: string) => {
    delete query.search;

    router.push({
      query: {
        ...query,
        showModal: 'add-product',
        selectedProductId,
      },
    });
  };

  const deleteProductHandler = async (productId: string) => {
    setDeletingProduct(true);
    try {
      const response = await deleteProductApi(productId);

      toast.success(response.message || 'Product deleted successfully');

      setSelectedProductToDeleteId(null);

      dispatch(getProducts(businessId as string));
    } catch (error: unknown) {
      toast.error(
        (error as HttpErrorResponse)?.message ||
          `Failed to delete product, please try again or contact an administrator`
      );
    }

    setDeletingProduct(false);
  };

  useEffect(() => {
    if (!businessId) {
      return;
    }

    const fetchProducts = async () => {
      setLoadingData(true);
      await dispatch(getProducts(businessId as string));
      setLoadingData(false);
    };

    const timeOut = setTimeout(fetchProducts, 200);

    return () => timeOut && clearTimeout(timeOut);
  }, [businessId]);

  useEffect(() => {
    setFilteredProducts(() => {
      const trimmedSearch = search?.trim();

      if (trimmedSearch) {
        return products.filter(
          (product) =>
            product.name.toLowerCase().includes(trimmedSearch.toLowerCase()) ||
            product.price.toLowerCase().includes(trimmedSearch.toLowerCase())
        );
      }

      return products;
    });
  }, [search, products]);

  return {
    addProductHandler,
    showDialog,
    closeProductDialogHandler,
    loadingData,
    editProductHandler,
    deleteProductHandler,
    deletingProduct,
    selectedProductToDeleteId,
    setSelectedProductToDeleteId,
    filteredProducts,
    noDataText,
  };
};

export default useProduct;
