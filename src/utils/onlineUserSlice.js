// onlineUsersSlice.js

import { createSlice } from "@reduxjs/toolkit";

const onlineUsersSlice = createSlice({
  name: "onlineUsers",
  initialState: [],

  reducers: {
    setOnlineUsers: (state, action) => {
      return action.payload;
    },

    updateUserStatus: (state, action) => {
      const { userId, isOnline } = action.payload;

      if (isOnline) {
        if (!state.includes(userId)) {
          state.push(userId);
        }
      } else {
        return state.filter((id) => id !== userId);
      }
    },
  },
});

export const { setOnlineUsers, updateUserStatus } =
  onlineUsersSlice.actions;

export default onlineUsersSlice.reducer;