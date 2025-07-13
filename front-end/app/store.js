"use client"

import { configureStore } from '@reduxjs/toolkit';
import topicsReducer from './redux/topicsSlice';


export const store = configureStore({
   reducer: {
      topics: topicsReducer
   },
});
