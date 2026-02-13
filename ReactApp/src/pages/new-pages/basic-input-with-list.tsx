import { useState } from 'react';

import { Box, TextField, Typography, IconButton, InputAdornment } from '@mui/material';

import { CONFIG } from 'src/config-global';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function Page() {
  const [value, setValue] = useState('');
  const [searchItems, setSearchItems] = useState(['item A', 'item B', 'item C']);
  
  // Function to add item to list
  const handleAddItem = () => {
    if (value.trim() !== '') {
      setSearchItems([...searchItems, value]);
      setValue(''); // Clear the input after adding
    }
  };
  
  return (
    <>
      <title>{`Basic Input With List - ${CONFIG.appName}`}</title>
      <meta
        name="description"
        content="Lesson 2"
      />
      <meta name="keywords" content="Lesson 2" />

      <DashboardContent>
        <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
          Hi, Basic Input With List
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
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleAddItem();
              }
            }}
            slotProps={{
              inputLabel: { shrink: true },
              input: {
                endAdornment: (
                  <InputAdornment position="end" sx={{ pr: '5px' }}>
                    <IconButton
                      edge="end"
                      onClick={handleAddItem}
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

        <Box
          sx={{
            mb: 5,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box
            component="ul"
            sx={{
              paddingLeft: '20px',
              margin: '16px 0',
              listStyleType: 'disc',
            }}
          >
            {searchItems.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </Box>
        </Box>

      </DashboardContent>


    </>
  );
}
