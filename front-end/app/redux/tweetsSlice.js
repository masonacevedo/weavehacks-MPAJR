"use client"

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {METHOD_TYPE} from "../redux/constants";
import {fetchRequest} from "../Utils/axiosOptions";
import {localhostInstance} from "../Utils/axiosInstance";

export const analyzeTweet = createAsyncThunk('analyzeTweet', async ({text}) => {
  console.log("analyzeTweet ---", text)

  const path = `/analyze_tweet`;
  const payload = {user_name: "bob", tweet_text: text}
  const response = await localhostInstance(fetchRequest(METHOD_TYPE['POST'], path, payload))
  return response.data
})

export const tweetsSlice = createSlice({
  name: 'tweets',
  initialState: {
    loading: false,
    results: [],
    errors: []
  },
  reducers: {
    select: (state, action) => {
      console.log("selecting a tweet in reducer " + action.payload);
      state.selected = action.payload
    }
  },
  extraReducers: builder => {
    builder
      .addCase(analyzeTweet.pending, (state, action) => {
        console.log("analyze pending")
        state.loading = true
      })
      .addCase(analyzeTweet.fulfilled, (state, action) => {
        console.log("analyze fulfilled")
        state.loading = false
        state.results.data?.push(action.payload);
      })
      .addCase(analyzeTweet.rejected, (state, action) => {
        console.log("analyze rejected")
        state.loading = false
        state.errors = [...state.errors, action.error]
      })
  }
})

export const {select} = tweetsSlice.actions

export default tweetsSlice.reducer
