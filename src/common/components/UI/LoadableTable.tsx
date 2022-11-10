import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  SxProps,
  Theme,
} from '@mui/material';
import { NextPage } from 'next';
import {
  Children,
  cloneElement,
  ReactNode,
  useRef,
  useEffect,
  useState,
  ReactElement,
} from 'react';
import LoadingImage from '../../elements/LoadingImage';

interface LoadableTableProps {
  isLoading: boolean;
  noData: boolean;
  header: ReactElement;
  noDataText?: string;
  footer?: ReactElement;
  sx?: SxProps<Theme>;
  children: ReactNode;
}

const LoadableTable: NextPage<LoadableTableProps> = ({
  isLoading,
  children,
  header,
  footer,
  noData,
  noDataText = 'No Data found',
  sx,
}) => {
  const childrenRef = useRef<HTMLTableSectionElement[]>([]);
  const [columnCount, setColumnCount] = useState(0);

  useEffect(() => {
    const count = childrenRef.current[0]?.querySelectorAll('th').length;

    setColumnCount(count);
  }, []);

  return (
    <>
      <TableContainer sx={sx}>
        <Table>
          {Children.map(header, (child, index) =>
            cloneElement(child as ReactElement, {
              ref: (ref: HTMLTableSectionElement) =>
                (childrenRef.current[index] = ref),
            })
          )}

          {isLoading && (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={columnCount}
                  sx={{
                    textAlign: 'center',
                    py: 10,
                  }}
                >
                  <LoadingImage />
                </TableCell>
              </TableRow>
            </TableBody>
          )}

          {!isLoading && children}

          {!isLoading && noData && (
            <TableBody>
              <TableRow>
                <TableCell
                  colSpan={columnCount}
                  sx={{
                    textAlign: 'center',
                    py: 5,
                  }}
                >
                  <Typography variant="subtitle2" align="center">
                    {noDataText}
                  </Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </TableContainer>

      {footer && footer}
    </>
  );
};

export default LoadableTable;
