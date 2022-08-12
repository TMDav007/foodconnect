import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from 'next-redux-wrapper';

import auth from "./authSlice";
import food from "./foodSlice";
import { apiSlice } from "./../pages/api/auth/login";

const combineReducer = combineReducers({
  auth,
  food
});

export const makeStore = () =>
  configureStore({
    reducer: combineReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });

export const wrapper = createWrapper(makeStore);
