import { useState } from 'react';

import { Box, Checkbox, Typography, FormControlLabel } from '@mui/material';

import { _tasks } from 'src/_mock/_data';
import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsTasks } from 'src/sections/overview/analytics-tasks';


// ----------------------------------------------------------------------

export default function Page() {
  const [enableMenu, setEnableMenu] = useState(false);

  return (
    <>
      <title>{`Component Input - ${CONFIG.appName}`}</title>
      <meta
        name="description"
        content="Lesson 3"
      />
      <meta name="keywords" content="Lesson 3" />

      <DashboardContent>
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          Hi, Component Input
        </Typography>

        <Box
          sx={{
            mb: { xs: 0 /* increase for mobile */, md: 0 },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="ul"
            sx={{
              paddingLeft: '20px',
              margin: '0 0',
              listStyleType: 'disc',
              width: '500px',
            }}
          >
            <li>TODO: autosort imports on save with (perfectionist/sort-imports): settings.json VS Code;</li>
          </Box>
        </Box>

        <Box
          component="div"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="ul"
            sx={{
              margin: '16px 0',
              listStyleType: 'disc',
              width: '500px',
              paddingLeft: '5px',
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={enableMenu}
                  onChange={(e) => setEnableMenu(e.target.checked)}
                />
              }
              label="Enable three dots menu"
            />
          </Box>
        </Box>

        <Box sx={{
          mb: 5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <AnalyticsTasks sx={{
            maxHeight: '250px',
            overflowY: 'auto',
            width: '500px'
          }}
            title="Tasks"
            list={_tasks.slice(0, 5)} /* TODO: replace 3 with 4 and 5 and vise versa  */
            turnOnButton={enableMenu}
          />
        </Box>

      </DashboardContent>

    </>
  );
}
