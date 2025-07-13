"use client"

import {configureStore} from '@reduxjs/toolkit';
import topicsReducer from './redux/topicsSlice';
import tweetsReducer from './redux/tweetsSlice';


export const store = configureStore({
  reducer: {
    topics: topicsReducer,
    tweets: tweetsReducer
  },
});
