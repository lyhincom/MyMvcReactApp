import { Box, TextField, Typography, IconButton, InputAdornment } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <title>{`Basic Input - ${CONFIG.appName}`}</title>
      <meta
        name="description"
        content="Lesson 1"
      />
      <meta name="keywords" content="Lesson 1" />

      <DashboardContent>
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          Hi, Basic Input
        </Typography>

        <Box
          sx={{
            mb: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TextField
            id="outlined-basic"
            label="Search"
            variant="outlined"
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                endAdornment: (
                  <InputAdornment position="end" sx={{ pr: '5px' }}>
                    <IconButton
                      edge="end"
                      onClick={() => console.log('Search clicked')}
                      sx={{
                        width: 48,
                        height: 48,
                      }}
                    >
                      <Iconify icon="eva:search-fill" width={28} />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              width: 500,
              '& .MuiOutlinedInput-root': {
                '& fieldset, &:hover fieldset, &.Mui-focused fieldset': {
                  borderColor: 'grey.700',
                  borderWidth: 2,
                },
              },
            }}
          />
        </Box>

      </DashboardContent>


    </>
  );
}
