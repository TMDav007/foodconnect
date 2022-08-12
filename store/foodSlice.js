import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  message: null,
  food: null,
};

export const getAllFood = createAsyncThunk(
  "api/allFood",
  async (food, { rejectWithValue }) => {
    try {
      const res = await fetch("api/food/allFood", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      });

      const data = await res.json();

      console.log(data, res.status, "food");
      if (res.status === 200) {
        return data
      } else {
        throw Error(data.error);
      }
    } catch (err) {
      console.log(err.message, "err1");
      return rejectWithValue(err.message);
    }
  }
);

const foodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getAllFood.pending, (state, action) => {
        state.loading = true;
        state.status = "pending";
      })
      .addCase(getAllFood.fulfilled, (state, action) => {
        state.status = "success";
        state.message = "Request was succesful";
        state.food = action.payload.allFood
        state.loading = false;
      })
      .addCase(getAllFood.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
        state.loading = false;
      });
  },
});

export default foodSlice.reducer;

export const loading = (state) => state.food.loading;

export const allFood = (state) => state.food.food;
