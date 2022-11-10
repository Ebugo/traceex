import { Stack } from '@mui/material';
import ActionBar from '../../UI/ActionBar';

import ProductDialog from './components/ProductDialog';
import ProductsList from './components/ProductsList';
import EmptyProducts from './components/EmptyProducts';
import useProduct from '../../../hooks/useProduct';
import { RootState, useSelector } from '../../../redux/store';

const Products = () => {
  const {
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
  } = useProduct();

  const { products } = useSelector((state: RootState) => state.productSlice);

  return (
    <>
      {showDialog && (
        <ProductDialog
          showDialog={showDialog}
          onCloseDialog={closeProductDialogHandler}
        />
      )}

      <Stack>
        <ActionBar
          title="Products"
          buttonText="Add Product"
          onButtonClick={addProductHandler}
        />

        {!products?.length && !loadingData && (
          <EmptyProducts onAddProduct={addProductHandler} />
        )}

        {(!!products?.length || loadingData) && (
          <ProductsList
            loadingData={loadingData}
            onEdit={editProductHandler}
            onDelete={deleteProductHandler}
            deletingProduct={deletingProduct}
            selectedProductToDeleteId={selectedProductToDeleteId}
            setSelectedProductToDeleteId={setSelectedProductToDeleteId}
            filteredProducts={filteredProducts}
            noDataText={noDataText}
          />
        )}
      </Stack>
    </>
  );
};

export default Products;
