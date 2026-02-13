import { useState } from 'react';

import { Box, Typography } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { LizardCard } from 'src/components/new-components/lizard-card';

// ----------------------------------------------------------------------

export default function Page() {
  const [output, setOutput] = useState(1);

  const handleIncrementOutput = () => {
    setOutput((value) => value + 1);
  };

  return (
    <>
      <title>{`Component Output - ${CONFIG.appName}`}</title>
      <meta
        name="description"
        content="Lesson 5"
      />
      <meta name="keywords" content="Lesson 5" />

      <DashboardContent>
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          Hi, Component Output
        </Typography>



        <Box
          sx={{
            mb: { xs: 2 /* increase for mobile */, md: 2 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="ul"
            sx={{
              mb: { xs: 0, md: 0 },
              paddingLeft: '20px',
              margin: '0 0',
              listStyleType: 'disc',
              width: '500px',
            }}
          >
            <li>TODO: move Lizard Card to a separate component;</li>
            <li>TODO: output to Page from Lizard Component;</li>
          </Box>
        </Box>

        <Box
          sx={{
            mb: { xs: 2 /* increase for mobile */, md: 2 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography
            variant="h6"
            sx={[
              (theme) => ({
                background: `linear-gradient(to right, ${theme.vars.palette.secondary.main}, ${theme.vars.palette.warning.main})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                color: 'transparent',
              }),
            ]}
          >
            Output: {output}
          </Typography>
        </Box>

        <LizardCard onLizardBtnClick={handleIncrementOutput} />

      </DashboardContent>

    </>
  );
}
