import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ApiService } from "@/api/services"; // Import OpenAPI-generated client

// Async thunk for fetching user data
export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await ApiService.getUser(); // Call OpenAPI service
  return response.data;
});

// Redux slice to manage user state
const userSlice = createSlice({
  name: "user",
  initialState: { user: null, loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
