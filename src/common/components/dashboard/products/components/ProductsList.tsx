import {
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  IconButton,
  Avatar,
  Typography,
} from '@mui/material';
import LoadableTable from '../../../UI/LoadableTable';
import { FC, Dispatch, SetStateAction } from 'react';
import DynamicHeroIcon from '../../../../elements/icons/DynamicHeroIcon';
import ConfirmDialog from '../../../UI/ConfirmDialog';
import { Product } from '../../../../../_types';

interface ProductsListProps {
  loadingData: boolean;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
  deletingProduct: boolean;
  selectedProductToDeleteId: string | null;
  setSelectedProductToDeleteId: Dispatch<SetStateAction<string | null>>;
  filteredProducts: Product[];
  noDataText: string;
}

const ProductsList: FC<ProductsListProps> = ({
  loadingData,
  onDelete,
  onEdit,
  deletingProduct,
  selectedProductToDeleteId,
  setSelectedProductToDeleteId,
  filteredProducts,
  noDataText,
}) => {
  const deleteHandler = (serviceId: string) => {
    setSelectedProductToDeleteId(serviceId);
  };

  return (
    <>
      <ConfirmDialog
        title="Permanently delete this product"
        message="Are you sure you want to delete this product?"
        showDialog={!!selectedProductToDeleteId}
        onClose={() => setSelectedProductToDeleteId(null)}
        onConfirm={() => onDelete(selectedProductToDeleteId as string)}
        confirmText="Delete Product"
        confirmDanger={true}
        confirmLoading={deletingProduct}
      ></ConfirmDialog>

      <LoadableTable
        isLoading={loadingData}
        noData={filteredProducts.length === 0}
        header={
          <TableHead>
            <TableRow>
              <TableCell>Product name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell align="center">Amount (NGN)</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell sx={{ minWidth: '150px' }} align="center">
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
        }
        noDataText={noDataText}
        sx={{
          p: 4,
          backgroundColor: (theme) => theme.palette.primary.light,
        }}
      >
        <TableBody>
          {filteredProducts.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{product.name}</TableCell>
              <TableCell>
                <Avatar
                  alt={product.name}
                  src={
                    (product.image as string) ||
                    'https://ricive-web-app.s3.amazonaws.com/assets/images/no-image-icon.svg'
                  }
                  sx={{ borderRadius: 'unset' }}
                />
              </TableCell>
              <TableCell align="center">{product.price}</TableCell>
              <TableCell align="center">
                <Typography
                  variant="details"
                  sx={{
                    color: (theme) =>
                      theme.palette[product?.is_published ? 'primary' : 'error']
                        .main,
                  }}
                >
                  {product?.is_published ? 'Published' : 'Unpublished'}
                </Typography>
              </TableCell>
              <TableCell sx={{ width: '150px' }} align="center">
                <IconButton
                  sx={{ mr: 1 }}
                  onClick={onEdit.bind(null, product.id)}
                >
                  <DynamicHeroIcon icon="PencilIcon" />
                </IconButton>

                <IconButton onClick={deleteHandler.bind(null, product.id)}>
                  <DynamicHeroIcon icon="TrashIcon" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </LoadableTable>
    </>
  );
};

export default ProductsList;
