"use client"

import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {METHOD_TYPE} from "../redux/constants";
import {fetchRequest} from "../Utils/axiosOptions";
import {localhostInstance} from "../Utils/axiosInstance";

export const fetchTopics = createAsyncThunk('fetchTopics', async () => {
   console.log("fetchTopics ---")

   const path = `topics`;
   const response = await localhostInstance(fetchRequest(METHOD_TYPE['GET'], path, {}))
   return response.data
})

export const addTopic = createAsyncThunk('addTopic', async ({name}) => {
   const path = `v1/topics`;
   const payload = {name}
   const response = await localhostInstance(fetchRequest(METHOD_TYPE['POST'], path, payload))
   return response.data
})

export const topicsSlice = createSlice({
   name: 'contents',
   initialState: {
      loading: false,
      results: [],
      errors: []
   },
   reducers: {
      select: (state, action) => {
         console.log("selecting a topic in reducer " + action.payload);
         state.selected = action.payload
      }
   },
   extraReducers: builder => {
      builder
         .addCase(fetchTopics.pending, (state, action) => {
            state.loading = true
         })
         .addCase(fetchTopics.fulfilled, (state, action) => {
            state.loading = false
            state.results = action.payload || []
         })
         .addCase(fetchTopics.rejected, (state, action) => {
            state.loading = false
            state.results = []
            state.errors = [...state.errors, action.error]
         })
         .addCase(addTopic.pending, (state, action) => {
            console.log("add pending")
            state.loading = true
         })
         .addCase(addTopic.fulfilled, (state, action) => {
            console.log("add fulfilled")
            state.loading = false
            state.results.data?.push(action.payload);
         })
         .addCase(addTopic.rejected, (state, action) => {
            console.log("add rejected")
            state.loading = false
            state.errors = [...state.errors, action.error]
         })
   }
})

export const {select} = topicsSlice.actions

export default topicsSlice.reducer
