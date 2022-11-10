import { IconButton, Badge } from '@mui/material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';

const Notification = () => {
  return (
    <IconButton
      size="small"
      sx={{
        ml: 2,
        backgroundColor: (theme) => theme.palette.secondary.light,
      }}
    >
      <Badge color="error" variant="dot">
        <NotificationsNoneOutlinedIcon fontSize="inherit" />
      </Badge>
    </IconButton>
  );
};

export default Notification;
