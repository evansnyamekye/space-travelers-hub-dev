import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiLink = 'https://api.spacexdata.com/v3/missions';

export const getMissionsData = createAsyncThunk('missions/getMissionsData', async (thunkAPI) => {
  try {
    const response = await axios.get(apiLink);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const missionsSlice = createSlice({
  name: 'missions',
  initialState: {
    missions: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    joinMission: (state, action) => {
      const id = action.payload;
      state.missions = state.missions.map((mission) => (
        {
          ...mission,
          mission_join: (mission.mission_id
          === id) ? true : mission.mission_join,
        }
      ));
    },

    cancelMission: (state, action) => {
      state.missions = state.missions.map((mission) => (
        {
          ...mission,
          mission_join: action.payload
          === mission.mission_id ? false : mission.mission_join,
        }
      ));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMissionsData.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getMissionsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.missions = action.payload.map((mission) => ({
          mission_id: mission.mission_id,
          mission_name: mission.mission_name,
          description: mission.description,
          mission_join: false,
        }));
      })
      .addCase(getMissionsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error;
      });
  },
});

export const { joinMission, cancelMission } = missionsSlice.actions;
export default missionsSlice.reducer;
