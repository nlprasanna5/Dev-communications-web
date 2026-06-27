import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    addUser: (state, action) => {
        console.log("userState",state);
        console.log("action",action);
        
      return action.payload;
    },
    removeUser: (state, action) => {
      console.log(action);

      return null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
