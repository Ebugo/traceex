import { ButtonGroup, Button } from '@mui/material';
import { useState } from 'react';

const RoleToggleButton = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const buttons = ['Admin', 'Rider'];

  return (
    <ButtonGroup
      disableElevation
      disableFocusRipple
      disableRipple
      variant="contained"
      size="small"
      fullWidth
      sx={{
        backgroundColor: (theme) => theme.palette.secondary.light,
      }}
    >
      {buttons.map((item, index) => (
        <Button
          disableElevation
          key={index}
          variant="text"
          sx={{
            fontSize: '0.875rem',
            minWidth: '114.29px',
            ...(index === currentIndex
              ? {
                  fontWeight: 500,
                  color: (theme) => theme.palette.primary.main,
                  backgroundColor: (theme) => theme.palette.common.white,
                  border: '0.5px solid rgba(0, 0, 0, 0.04);',
                  boxShadow:
                    '0px 3px 8px rgba(0, 0, 0, 0.12), 0px 3px 1px rgba(0, 0, 0, 0.04)',
                  borderRadius: '6.93px !important',
                }
              : { fontWeight: 400, color: '#908F8F' }),

            '&:hover': {
              backgroundColor:
                index === currentIndex
                  ? (theme) => theme.palette.common.white
                  : 'unset',
            },
          }}
          onClick={() => {
            setCurrentIndex(index);
            //TODO: many ways to determine which button was click and act
          }}
        >
          {item}
        </Button>
      ))}
    </ButtonGroup>
  );
};

export default RoleToggleButton;
