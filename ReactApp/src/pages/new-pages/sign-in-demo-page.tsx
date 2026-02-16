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

      <DashboardContent>
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          Hi, Sign In Demo Page 👋
        </Typography>

        <Box
          sx={{
            width: 1,
            maxWidth: '420px',
            mx: 'auto',
          }}
        >
          <SignInPage />
        </Box>
      </DashboardContent>
    </>
  );
}
