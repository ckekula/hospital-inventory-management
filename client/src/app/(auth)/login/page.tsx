'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Alert, Paper, Typography, Box } from '@mui/material';
import { Mail, Lock } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { login } from '@/state/authSlice';
import Link from 'next/link';

const LoginPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, validationErrors } = useAppSelector((state) => state.auth);

  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(login(loginData));
    if (login.fulfilled.match(result)) {
      router.push('/');
    }
  };

  return (
    <Box 
      className="min-h-screen flex items-center justify-center bg-gray-50 p-4"
    >
      <Paper 
        elevation={3} 
        className="max-w-md w-full p-8 space-y-6"
      >
        <div className="text-center">
          <Typography variant="h4" component="h1" gutterBottom>
            Sign in to your account
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <TextField
              fullWidth
              required
              type="email"
              label="Email"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              InputProps={{
                startAdornment: <Mail className="mr-2 h-5 w-5 text-gray-500" />,
              }}
            />

            <TextField
              fullWidth
              required
              type="password"
              label="Password"
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              InputProps={{
                startAdornment: <Lock className="mr-2 h-5 w-5 text-gray-500" />,
              }}
            />
          </div>

          {validationErrors.length > 0 && (
            <Alert severity="error" className="mt-4">
              <ul className="list-disc pl-4">
                {validationErrors.map((error: string, index: number) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </Alert>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={isLoading}
            className="mt-6"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>

          <div className="text-center mt-4">
            <Typography variant="body2" color="textSecondary">
              Don&apos;t have an account?{' '}
              <Link href="/register" className="text-primary hover:underline">
                Create account
              </Link>
            </Typography>
          </div>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginPage;