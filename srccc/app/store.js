import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { apiSlice } from './EndPoints/baseEndpoints';
import userReducer from './Slices/UserSlice';
import adminReducer from './Slices/AdminSlice';
import memberReducer from './Slices/MembersSlice';
import authReducer from "./Slices/AuthSlice";
import clubcurrentmemberReducer from './Slices/ClubMemberSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    user: userReducer,
    admin: adminReducer,
    members: memberReducer,
    clubcurrentmember: clubcurrentmemberReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

setupListeners(store.dispatch);
