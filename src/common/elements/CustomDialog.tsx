import { Dialog, styled } from '@mui/material';
import { CustomDialogProp } from '../../_types';

const CustomDialog = styled((props: CustomDialogProp) => <Dialog {...props} />)(
  ({
    theme,
    rootpaddingblock = 2,
    rootpaddinginline = 4,
    titlemarginbottom = 0,
    dialogwidth = '720px',
  }) => ({
    '& .MuiPaper-root': {
      width: '100%',
      paddingBlock: theme.spacing(rootpaddingblock),
      paddingInline: theme.spacing(rootpaddinginline),
      borderRadius: '8px',
      maxWidth: dialogwidth,
    },
    '& .MuiDialogTitle-root': {
      paddingInline: 0,
      marginBottom: theme.spacing(titlemarginbottom),
    },
    '& .MuiDialogContent-root': {
      paddingInline: 0,
      paddingTop: theme.spacing(1),
      '::-webkit-scrollbar': {
        width: '4px',
      },
      '::-webkit-scrollbar-thumb': {
        background: '#80868B',
        borderRadius: '100px',
      },
    },
    '& .MuiDialogActions-root': { paddingInline: 0 },
  })
);

export default CustomDialog;
