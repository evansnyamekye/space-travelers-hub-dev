import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  rockets: [],
  status: 'idle',
  error: null,
};

export const fetchRockets = createAsyncThunk('rocket/fetchRockets', async () => {
  const response = await axios.get('https://api.spacexdata.com/v3/rockets');
  return response.data.map((rocket) => ({
    id: rocket.id,
    rocket_name: rocket.rocket_name,
    rocket_type: rocket.rocket_type,
    flickr_images: rocket.flickr_images,
    description: rocket.description,
    reserved: false,
  }));
});

const rocketReduser = createSlice({
  name: 'rocket',
  initialState,
  reducers: {
    reserveRocket: (state, action) => {
      const rocketIdToReserve = action.payload;
      state.rockets = state.rockets.map((rocket) => (
        rocket.id === rocketIdToReserve ? { ...rocket, reserved: true } : rocket
      ));
    },
    cancelReservation: (state, action) => {
      const cancelReservation = action.payload;
      state.rockets = state.rockets.map((rocket) => (
        rocket.id === cancelReservation ? { ...rocket, reserved: false } : rocket
      ));
    },

  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchRockets.pending, (state) => {
        state.status = 'loading';
      })

      .addCase(fetchRockets.fulfilled, (state, action) => {
        state.status = 'successed';
        state.rockets = action.payload;
      })

      .addCase(fetchRockets.rejected, (state, action) => {
        state.status = 'faild';
        state.error = action.error.message;
      });
  },
});

export const { reserveRocket, cancelReservation } = rocketReduser.actions;
export default rocketReduser.reducer;
