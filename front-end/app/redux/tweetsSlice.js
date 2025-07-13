"use client"

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {METHOD_TYPE} from "../redux/constants";
import {fetchRequest} from "../Utils/axiosOptions";
import {localhostInstance} from "../Utils/axiosInstance";

export const analyzeTweet = createAsyncThunk('analyzeTweet', async ({username, text}) => {
  console.log("analyzeTweet ---", username, text)

  const path = `/analyze_tweet`;
  const payload = {username, tweet_text: text}
  const response = await localhostInstance(fetchRequest(METHOD_TYPE['POST'], path, payload))
  return response.data
})

export const fetchMessages = createAsyncThunk('fetchMessages', async () => {
  //const path = `v1/tags`;
  return response.data
})


export const tweetsSlice = createSlice({
  name: 'tweets',
  initialState: {
    loading: false,
    messages: [
      {text: "Welcome to Barracuda474!", type: "user"},
      {text: "Type a query below", type: "user"},
    ],
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
      .addCase(fetchMessages.pending, (state, action) => {
        console.log("fetch pending")
        state.loading = true
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        console.log("fetch fulfilled")
        state.loading = false
        state.messages = []
        console.log(state.messages)
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        console.log("fetch rejected")
        state.loading = false
        state.messages = []
        state.errors = [...state.errors, action.error]
      })
      .addCase(analyzeTweet.pending, (state, action) => {
        console.log("analyze pending")
        state.loading = true
      })
      .addCase(analyzeTweet.fulfilled, (state, action) => {
        console.log("analyze fulfilled")
        state.loading = false
        console.log("action.payload", action.payload);
        state.messages.push({text: action.payload.response, type: "user"});
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
