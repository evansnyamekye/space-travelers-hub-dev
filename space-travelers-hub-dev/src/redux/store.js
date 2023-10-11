import { configureStore } from '@reduxjs/toolkit';
import rocketReduser from './rocketSlice';
import missionReducer from './Missions/missionsSlice';

const store = configureStore({
  reducer: {
    rockets: rocketReduser,
    missions: missionReducer,
  },
});

export default store;
