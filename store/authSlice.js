import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  register_success: false,
  token: null,
  message: null,
};

export const login = createAsyncThunk(
  "api/login",
  async (body, { rejectWithValue }) => {
    try {
      const res = await fetch("api/auth/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (res.status === 200) {
        return data.data;
      } else {
        console.log(data, res, "rroda");
        throw Error(data.message);
      }
    } catch (err) {
      console.log(err.message, "err1");
      return rejectWithValue(err.message);
    }
  }
);

export const verifyUser = createAsyncThunk(
  "api/verify",
  async (body, { rejectWithValue }) => {
    try {
      const res = await fetch("api/auth/verify", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        return data;
      } else {
        console.log(data, res, "rroda");
        throw Error(data.message);
      }
    } catch (err) {
      console.log(err.message, "err1");
      return rejectWithValue(err.message);
    }
  }
);

export const refreshToken = createAsyncThunk(
  "api/refreshToken",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const res = await fetch("api/auth/refresh", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (res.status === 200) {
        dispatch(verifyUser())
        return data;
      } else {
        console.log(data, res, "rroda");
        throw Error(data.message);
      }
    } catch (err) {
      console.log(err.message, "err1");
      return rejectWithValue(err.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.name = action.payload.username;
      state.token = action.payload.tokens;
    },
    loginFail: (state) => {
      state.isAuthenticated = false;
    },
    setAuthLoading: (state) => {
      state.loading = true;
    },
    removeLoading: (state) => {
      state.loading = false;
    },
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.user = user;
      state.token = accessToken;
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.loading = true;
        state.status = "pending";
      })
      .addCase(login.fulfilled, (state, action) => {
        const { username, tokens } = action.payload.data;
        const { message } = action.payload;
        state.status = "success";
        state.loading = false;
        state.user = username;
        state.token = tokens;
        state.isAuthenticated = true;
        state.message = message; // Add any fetched posts to the array
        // state.posts = state.posts.concat(action.payload);
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.payload, "ërrprP");
        state.status = "failed";
        state.message = action.payload;
        state.loading = false;
      })
      .addCase(verifyUser.pending, (state, action) => {
        state.loading = true;
        state.status = "pending";
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
        state.isAuthenticated = true;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";
        state.isAuthenticated = false;
        state.user = null;
      })
      .addCase(refreshToken.pending, (state, action) => {
        state.loading = true;
        state.status = "pending";
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.status = "success";
       // state.isAuthenticated = true;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.status = "failed";

        // state.isAuthenticated = false;
        // state.user = null;
      });
  },
});

export const {
  loginSuccess,
  loginFail,
  setAuthLoading,
  removeLoading,
  setCredentials,
  logOut,
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state) => state.auth.user;
export const selectCurrentToken = (state) => state.auth.token;
export const isAuthenticated = (state) => state.auth.isAuthenticated;
