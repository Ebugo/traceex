import { Button } from '@mui/material';
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import { useRouter } from 'next/router';
import { FC, MouseEvent } from 'react';

interface BackButtonProps {
  iconMarginRight?: number;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const BackButton: FC<BackButtonProps> = ({ iconMarginRight = 2, onClick }) => {
  const router = useRouter();

  const onClickHandler = (e: MouseEvent<HTMLButtonElement>) => {
    if (!onClick) {
      router.back();
      return;
    }

    onClick(e);
  };

  return (
    <Button
      disableElevation
      size="small"
      sx={{
        paddingInline: 0,
        color: (theme) => theme.palette.text.secondary,
        minWidth: 'unset',
        '&:hover': {
          backgroundColor: 'unset',
        },
      }}
      onClick={onClickHandler}
    >
      <ArrowBackIosNewOutlinedIcon
        sx={{ fontSize: 'inherit', mr: iconMarginRight }}
      />
      Back
    </Button>
  );
};

export default BackButton;
