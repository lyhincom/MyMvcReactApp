import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { SignInPage } from 'src/routes/sections';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Hello World - ${CONFIG.appName}`}</title>
      <meta
        name="description"
        content="Lesson 1"
      />
      <meta name="keywords" content="Lesson 1" />

      <Box
        sx={{
          position: 'relative',
          minHeight: '100vh',
          '&::before': {
            zIndex: 1,
            opacity: 0.24,
            width: '100%',
            height: '100%',
            content: "''",
            position: 'absolute',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center center',
            backgroundImage: 'url(/assets/background/overlay.jpg)',
          },
        }}
      >
        <DashboardContent>
          <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
            Hi, Sign In Demo Page 👋
          </Typography>

          <Box
            sx={(theme) => ({
              py: 5,
              px: 3,
              width: 1,
              zIndex: 2,
              borderRadius: 2,
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '420px',
              mx: 'auto',
              position: 'relative',
              bgcolor: theme.vars.palette.background.default,
            })}
          >
            <SignInPage />
          </Box>
        </DashboardContent>
      </Box>
    </>
  );
}
