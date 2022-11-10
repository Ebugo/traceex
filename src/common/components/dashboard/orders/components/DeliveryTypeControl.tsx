import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { FormikProps } from 'formik';
import { FC, SyntheticEvent } from 'react';
import { Invoice, OrderForm } from '../../../../../_types';

interface DeliveryTypeControlProps {
  orderFormik: FormikProps<OrderForm>;
  deliveryType: Invoice['delivery_type'];
}

const DeliveryTypeControl: FC<DeliveryTypeControlProps> = ({
  orderFormik,
  deliveryType,
}) => {
  const { values, setFieldValue, setFieldTouched } = orderFormik;

  const deliveryTypeHandler = (
    event: SyntheticEvent<Element, Event>,
    checked: boolean,
    type: Invoice['delivery_type']
  ) => {
    setFieldTouched('delivery_type', true);

    if (!checked) {
      setFieldValue('delivery_type', null);
      return;
    }

    setFieldValue('delivery_type', type);
  };

  return (
    <FormControlLabel
      sx={{ marginBlock: 'none', mb: 1 }}
      control={
        <Checkbox
          checked={values?.delivery_type === deliveryType}
          sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 30,
            },
            paddingBlock: 'unset',
          }}
        />
      }
      label={<Typography variant="details">{deliveryType}</Typography>}
      onChange={(e, checked) => deliveryTypeHandler(e, checked, deliveryType)}
    />
  );
};

export default DeliveryTypeControl;
