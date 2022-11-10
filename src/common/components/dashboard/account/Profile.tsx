import { Stack, Typography, Box } from '@mui/material';
import useProfile from '../../../hooks/useProfile';
import ActionBar from '../../UI/ActionBar';
import ChangePassword from './components/ChangePassword';
import PersonalInformation from './components/PersonalInformation';

const Profile = () => {
  const { currentTab, handleChange, updateUserFormik, updatePasswordFormik } =
    useProfile();

  return (
    <Stack>
      <ActionBar title="Profile" hideButton hideSearch />

      <Stack direction="row" display="flex" px={4} mt={4}>
        <Box
          sx={{
            height: 'calc(100vh - 64px - 56px)',
            borderRight: '1px solid rgba(196, 196, 196, 0.2)',
            minWidth: '280px',
          }}
        >
          <Box
            display="flex"
            flexDirection="column"
            sx={{
              ...(currentTab === 0 && { borderLeft: '2px solid #4E903C' }),
              pl: 2,
              mb: 4,
              cursor: 'pointer',
            }}
            onClick={() => handleChange(0)}
          >
            <Typography
              variant="details"
              fontWeight={500}
              sx={{
                color: (theme) =>
                  currentTab === 0
                    ? theme.palette.text.primary
                    : theme.palette.secondary.main,
              }}
            >
              Personal Information
            </Typography>
            <Typography
              variant="details"
              sx={{
                ...(currentTab === 0 && {
                  color: (theme) => theme.palette.secondary.main,
                }),
              }}
            >
              Firstname, Last name, Username
            </Typography>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            sx={{
              ...(currentTab === 1 && { borderLeft: '2px solid #4E903C' }),
              pl: 2,
              cursor: 'pointer',
            }}
            onClick={() => handleChange(1)}
          >
            <Typography
              variant="details"
              fontWeight={500}
              sx={{
                color: (theme) =>
                  currentTab === 1
                    ? theme.palette.text.primary
                    : theme.palette.secondary.main,
              }}
            >
              Change Password
            </Typography>
            <Typography
              variant="details"
              sx={{
                ...(currentTab === 1 && {
                  color: (theme) => theme.palette.secondary.main,
                }),
              }}
            >
              Reset password
            </Typography>
          </Box>
        </Box>

        <Box sx={{ width: 'fill-available' }}>
          {currentTab === 0 && (
            <PersonalInformation updateUserFormik={updateUserFormik} />
          )}

          {currentTab === 1 && (
            <ChangePassword updatePasswordFormik={updatePasswordFormik} />
          )}
        </Box>
      </Stack>
    </Stack>
  );
};

export default Profile;
