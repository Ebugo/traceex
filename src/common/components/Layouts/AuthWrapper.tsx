import { Box, Button, Grid, Typography } from '@mui/material';
import useCustomMediaQuery from '../../hooks/useCustomMediaQuery';
import { FC, ReactNode } from 'react';
import Image from 'next/image';
import LongRightArrowIcon from '../../elements/icons/LongRightArrowIcon';
import { useRouter } from 'next/router';
import withoutAuth from '../HOC/withoutAuth';
import Logo from '../../elements/Logo';

const AuthWrapper: FC<{ children: ReactNode }> = ({ children }) => {
  const { large } = useCustomMediaQuery();

  const router = useRouter();

  const maxWidth = 'xxl';

  const registerButtonHandler = () => {
    router.push('/auth');
  };

  const signInButtonHandler = () => {
    router.push('/auth/login');
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      justifyItems="center"
    >
      <Grid
        maxWidth={maxWidth}
        container
        sx={{
          minHeight: '100vh',
          boxShadow: '0 2px 5px rgb(0 0 0 / 0.2)',
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        {large && false && (
          <Grid
            item
            xs={5}
            py={12}
            px={10}
            sx={{
              // backgroundImage: `url('https://ricive-web-app.s3.amazonaws.com/assets/images/backgrounds/auth-bg.png')`,
              // backgroundRepeat: 'no-repeat',
              // backgroundSize: 'cover',
              minHeight: '100vh',
              backgroundColor: (theme) => theme.palette.background.paper,
            }}
            container
            alignItems="flex-start"
            justifyContent="center"
          >
            <Grid item container sx={{ width: '531px' }}>
              {/* <Logo />
              <Grid item xs={12} container justifyContent="center" my={6}>
                <Image
                  src={
                    'https://ricive-web-app.s3.amazonaws.com/assets/images/auth-image.png'
                  }
                  alt="auth illustration image"
                  width={483}
                  height={320}
                  unoptimized={true}
                />
              </Grid>

              <Grid item xs={12} container justifyContent="center" mb={9}>
                <Typography
                  variant="h4"
                  component="div"
                  gutterBottom
                  align="center"
                  mb={3}
                >
                  Business operations made simple
                </Typography>
                <Typography variant="caption" component="div" align="center">
                  All-in-one platform to power your Business
                </Typography>
              </Grid> */}
            </Grid>
          </Grid>
        )}

        <Grid
          item
          xs={!large ? 12 : 12}
          container
          py={6}
          sx={{
            backgroundColor: (theme) =>
              large
                ? theme.palette.background.default
                : theme.palette.background.paper,

            px: large ? 6 : 3,
            justifyContent: 'center',
          }}
        >
          <Grid item>
            <Box sx={{ maxWidth: '531px', overflow: 'auto' }}>{children}</Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default withoutAuth(AuthWrapper);
