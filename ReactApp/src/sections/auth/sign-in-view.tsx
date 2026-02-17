import type { FormEvent } from 'react';

import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { CONFIG } from 'src/config-global';
import { authService } from 'src/services/auth-service';

import { Iconify } from 'src/components/iconify';

// ----------------------------------------------------------------------

export function SignInView() {
  const router = useRouter();

  const [email, setEmail] = useState('test@test.tt');
  const [password, setPassword] = useState('Qwerty_0');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setError(null);
      setLoading(true);

      try {
        await authService.signIn({
          login: email,
          password,
        });

        // Navigate to home page on success
        router.push('/');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred during login');
      } finally {
        setLoading(false);
      }
    },
    [email, password, router]
  );

  const handleGoogleIconClick = useCallback(() => {
    if (!CONFIG.googleClientId) {
      setError('Google OAuth is not configured');
      return;
    }

    // Redirect to Google OAuth
    const params = new URLSearchParams({
      client_id: CONFIG.googleClientId,
      redirect_uri: `${window.location.origin}/sign-in`,
      response_type: 'id_token',
      scope: 'openid email profile',
      nonce: Math.random().toString(36).substring(2, 15),
    });
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }, []);

  const renderForm = (
    <Box
      component="form"
      onSubmit={handleSignIn}
      sx={{
        display: 'flex',
        alignItems: 'flex-end',
        flexDirection: 'column',
      }}
    >
      {error && (
        <Alert severity="error" sx={{ width: '100%', mb: 3 }}>
          {error}
        </Alert>
      )}

      <TextField
        fullWidth
        name="email"
        label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        required
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
        Forgot password?
      </Link>

      <TextField
        fullWidth
        name="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={showPassword ? 'text' : 'password'}
        disabled={loading}
        required
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                  disabled={loading}
                >
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3 }}
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        disabled={loading}
      >
        {loading ? 'Signing in...' : 'Sign in'}
      </Button>
    </Box>
  );

  return (
    <>
      <Box
        sx={{
          gap: 1.5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          mb: 5,
        }}
      >
        <Typography variant="h5">Sign in</Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
          }}
        >
          Don’t have an account?
          <Link variant="subtitle2" sx={{ ml: 0.5 }}>
            Get started
          </Link>
        </Typography>
      </Box>
      {renderForm}
      <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
        <Typography
          variant="overline"
          sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
        >
          OR
        </Typography>
      </Divider>
      <Box
        sx={{
          gap: 1,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <IconButton
          onClick={handleGoogleIconClick}
        >
          <Iconify width={22} icon="socials:google" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:github" />
        </IconButton>
        <IconButton color="inherit">
          <Iconify width={22} icon="socials:twitter" />
        </IconButton>
      </Box>
    </>
  );
}
