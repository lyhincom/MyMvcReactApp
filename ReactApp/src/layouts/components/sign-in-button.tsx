import type { ButtonProps } from '@mui/material/Button';

import { useCallback } from 'react';

import Button from '@mui/material/Button';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} />;

export function SignInButton({ sx, ...other }: ButtonProps) {
  const router = useRouter();

  const handleClick = useCallback(() => {
    router.push('/sign-in');
  }, [router]);

  return (
    <Button
      color="inherit"
      variant="text"
      onClick={handleClick}
      startIcon={icon('ic-lock')}
      sx={{
        gap: 1,
        typography: 'body2',
        fontWeight: 'fontWeightMedium',
        ...sx,
      }}
      {...other}
    >
      Sign in
    </Button>
  );
}

