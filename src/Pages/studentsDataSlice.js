import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

export const fetchData = createAsyncThunk('data/fetchData', async ({ page, pageSize }) => {
  const apiUrl = `${proxyUrl}http://3.223.98.72:1337/api/students?pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
      throw Error(error.response.data.message);
    } else if (error.request) {
      console.error("Error request:", error.request);
      throw Error("No response received from server.");
    } else {
      console.error("Error message:", error.message);
      throw Error(error.message);
    }
  }
});

const studentsDataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    status: 'idle',
    error: null,
    pagination: {
      page: 1,
      pageSize: 10,
      pageCount: 0,
      total: 0,
    },
  },
  reducers: {
    setPage: (state, action) => {
      state.pagination.page = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
        state.pagination = action.payload.meta.pagination;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setPage } = studentsDataSlice.actions;

export default studentsDataSlice.reducer;
