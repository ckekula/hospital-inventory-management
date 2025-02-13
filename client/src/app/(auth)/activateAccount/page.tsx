'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Paper, Typography, Button, Box, Alert } from '@mui/material';
import ReactCodeInput from 'react-code-input';
import { AuthenticationService } from '@/api';

const ActivateAccountPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [isOkay, setIsOkay] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCodeChange = async (value: string) => {
    // Only proceed if we have all 6 digits
    if (value.length === 6) {
      setIsLoading(true);
      try {
        await AuthenticationService.confirm(value);
        setMessage('Your account has been successfully activated.\nNow you can proceed to login');
        setSubmitted(true);
        setIsOkay(true);
      } catch (error) {
        setMessage('Token has been expired or invalid');
        setSubmitted(true);
        setIsOkay(false);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const redirectToLogin = () => {
    router.push('/login');
  };

  const props = {
    inputStyle: {
      fontFamily: 'monospace',
      margin: '4px',
      MozAppearance: 'textfield' as const,
      width: '45px',
      borderRadius: '6px',
      fontSize: '24px',
      height: '45px',
      backgroundColor: 'white',
      color: 'black',
      border: '1px solid #ccc',
      textAlign: 'center' as const,
    },
    inputStyleInvalid: {
      fontFamily: 'monospace',
      margin: '4px',
      MozAppearance: 'textfield' as const,
      width: '45px',
      borderRadius: '6px',
      fontSize: '24px',
      height: '45px',
      backgroundColor: 'white',
      color: 'black',
      border: '1px solid red',
      textAlign: 'center' as const,
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
            Activate Your Account
          </Typography>
          <Typography variant="body1" color="textSecondary" className="mb-8">
            Please enter the 6-digit code sent to your email
          </Typography>
        </div>

        <div className="flex justify-center mb-6">
          <ReactCodeInput
            name='activation-code'
            inputMode="numeric"
            type="number"
            fields={6}
            onChange={handleCodeChange}
            disabled={submitted || isLoading}
            {...props}
          />
        </div>

        {submitted && (
          <Alert severity={isOkay ? "success" : "error"} className="mb-6">
            {message.split('\n').map((line, i) => (
              <div key={i}>{line}</div>
            ))}
          </Alert>
        )}

        {submitted && isOkay && (
          <Button
            variant="contained"
            fullWidth
            size="large"
            onClick={redirectToLogin}
            className="mt-4"
          >
            Proceed to Login
          </Button>
        )}

        {isLoading && (
          <Typography 
            variant="body2" 
            color="textSecondary" 
            className="text-center"
          >
            Verifying code...
          </Typography>
        )}
      </Paper>
    </Box>
  );
};

export default ActivateAccountPage;