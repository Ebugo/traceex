import {
  Stack,
  Typography,
  Button,
  ButtonTypeMap,
  SxProps,
  Theme,
} from '@mui/material';
import { FC } from 'react';
import SearchField from './SearchField';

interface CommonActionBarProps {
  title: string;
  hideSearch?: boolean;
  buttonVariant?: ButtonTypeMap['props']['variant'];
  buttonSxProps?: SxProps<Theme>;
}

interface ShowButtonProps extends CommonActionBarProps {
  hideButton?: false | undefined;
  buttonText: string;
  onButtonClick: () => void;
}

interface HideButtonProps extends CommonActionBarProps {
  hideButton?: true;
  buttonText?: undefined;
  onButtonClick?: undefined;
  buttonVariant?: undefined;
  buttonSxProps?: undefined;
}
type ActionBarProps = ShowButtonProps | HideButtonProps;

const ActionBar: FC<ActionBarProps> = ({
  title,
  buttonText,
  onButtonClick,
  hideSearch = false,
  hideButton = false,
  buttonVariant = 'contained',
  buttonSxProps = {},
}) => {
  const hideAction = hideSearch && hideButton;

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      px={4}
      py={2}
      sx={{
        backgroundColor: (theme) => theme.palette.background.paper,
        border: '1px solid rgba(196, 196, 196, 0.2)',
      }}
      id="action-bar"
    >
      <Typography variant="h5" pr={4}>
        {title}
      </Typography>

      {!hideAction && (
        <Stack direction="row" justifyContent="space-between">
          {!hideSearch && (
            <SearchField backgroundColor="#F7F7F7" height="46px" />
          )}

          {!hideButton && buttonText && (
            <Button
              disableElevation
              disableFocusRipple
              disableRipple
              disableTouchRipple
              variant={buttonVariant}
              onClick={onButtonClick?.bind(null)}
              sx={{
                ml: 2,
                height: '46px',
                minWidth: '171px',
                paddingInline: '32px',
                paddingBlock: '12px',
                borderRadius: '6px',
                ...buttonSxProps,
              }}
            >
              {buttonText}
            </Button>
          )}
        </Stack>
      )}
    </Stack>
  );
};

export default ActionBar;
