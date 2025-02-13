'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TextField, Button, Alert, Paper, Typography, Box } from '@mui/material';
import { Mail, User, Lock } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/app/redux';
import { register } from '@/state/authSlice';
import Link from 'next/link';

const RegisterPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, validationErrors } = useAppSelector((state) => state.auth);

  const [registerData, setRegisterData] = useState({
    email: '',
    firstname: '',
    lastname: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(register(registerData));
    if (register.fulfilled.match(result)) {
      router.push('/activate-account');
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
            Create an account
          </Typography>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <TextField
              fullWidth
              required
              label="First Name"
              value={registerData.firstname}
              onChange={(e) => setRegisterData({ ...registerData, firstname: e.target.value })}
              InputProps={{
                startAdornment: <User className="mr-2 h-5 w-5 text-gray-500" />,
              }}
            />

            <TextField
              fullWidth
              required
              label="Last Name"
              value={registerData.lastname}
              onChange={(e) => setRegisterData({ ...registerData, lastname: e.target.value })}
              InputProps={{
                startAdornment: <User className="mr-2 h-5 w-5 text-gray-500" />,
              }}
            />

            <TextField
              fullWidth
              required
              type="email"
              label="Email"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              InputProps={{
                startAdornment: <Mail className="mr-2 h-5 w-5 text-gray-500" />,
              }}
            />

            <TextField
              fullWidth
              required
              type="password"
              label="Password"
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
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
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>

          <div className="text-center mt-4">
            <Typography variant="body2" color="textSecondary">
              Already have an account?{' '}
              <Link href="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </Typography>
          </div>
        </form>
      </Paper>
    </Box>
  );
};

export default RegisterPage;