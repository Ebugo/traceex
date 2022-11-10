import { Grid, Skeleton, Typography } from '@mui/material';
import { FC, useMemo } from 'react';
import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import ArrowDownwardOutlinedIcon from '@mui/icons-material/ArrowDownwardOutlined';
import { formatAsMoney } from '../../../../utils';

export interface BusinessOverviewItemProps {
  title: string;
  description: string;
  quantity: number;
  percentage?: number;
  currency?: string;
  fetchingBusinessMetrics?: boolean;
}

const BusinessOverviewItem: FC<BusinessOverviewItemProps> = ({
  title,
  quantity,
  percentage,
  currency,
  fetchingBusinessMetrics = false,
  description
}) => {
  const isPositive = useMemo(() => percentage && percentage > 0, [percentage]);

  return (
    <>
      <Grid item container alignItems="center">
        <Typography variant="title" fontSize="1rem" mr={2}>
          {title}
        </Typography>

        {/* {percentage && (
          <>
            <Typography
              variant="caption"
              fontSize="0.75rem"
              sx={{
                color: (theme) =>
                  isPositive
                    ? theme.palette.success.main
                    : theme.palette.error.main,
              }}
              mr={0.5}
            >
              {isPositive && '+'}
              {percentage}%
            </Typography>

            {isPositive ? (
              <ArrowUpwardOutlinedIcon
                sx={{
                  fontSize: '0.875rem',
                  color: (theme) => theme.palette.success.main,
                }}
              />
            ) : (
              <ArrowDownwardOutlinedIcon
                sx={{
                  fontSize: '0.875rem',
                  color: (theme) => theme.palette.error.main,
                }}
              />
            )}
          </>
        )} */}
      </Grid>

      <Grid item container alignItems="center">
        <Typography variant="caption" fontSize="0.875rem">
          {description}
        </Typography>
      </Grid>

      <Grid item container mt={4.875}>
        {fetchingBusinessMetrics ? (
          <Skeleton width="10ch" />
        ) : (
          <>
            <Typography variant="h5" fontWeight="700" mr={1}>
              {currency ? formatAsMoney(quantity, true) : quantity}
            </Typography>

            {currency && (
              <Typography variant="caption" fontSize="0.75rem">
                ({currency})
              </Typography>
            )}
          </>
        )}
      </Grid>
    </>
  );
};

export default BusinessOverviewItem;
