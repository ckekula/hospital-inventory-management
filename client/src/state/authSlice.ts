import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthenticationService, User } from '@/api';
import { AuthRequest } from '@/api';
import { RegistrationRequest } from '@/api';

interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  validationErrors: string[];
}

const initialState: AuthState = {
  user: null,
  token: typeof window !== 'undefined' ? localStorage.getItem('token') : null,
  isLoading: false,
  validationErrors: [],
};

export const login = createAsyncThunk(
  'auth/login',
  async (credentials: AuthRequest, { rejectWithValue }) => {
    try {
      const response = await AuthenticationService.authenticate(credentials);
      localStorage.setItem('token', response?.token ?? '');
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { errorMsg: 'An error occurred' });
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (data: RegistrationRequest, { rejectWithValue }) => {
    try {
      await AuthenticationService.register(data);
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || { validationErrors: ['An error occurred'] });
    }
  }
);

export const confirmAccount = createAsyncThunk(
    'auth/confirm',
    async (token: string, { rejectWithValue }) => {
      try {
        await AuthenticationService.confirm(token);
        return true;
      } catch (error: any) {
        return rejectWithValue(error.response?.data || { errorMsg: 'Token has been expired or invalid' });
      }
    }
  );

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.validationErrors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.validationErrors = [];
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token || null;
      })
      .addCase(login.rejected, (state, action: any) => {
        state.isLoading = false;
        state.validationErrors = action.payload.validationErrors || [action.payload.errorMsg];
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.validationErrors = [];
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action: any) => {
        state.isLoading = false;
        state.validationErrors = action.payload.validationErrors;
      });
  },
});

export const { clearErrors } = authSlice.actions;
export default authSlice.reducer;