import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connections",
  initialState: [],
  reducers: {
    getConnections: (state, action) => {
      console.log("action",action);
      console.log("state",state);
      return action.payload;
    },
  },
});

export const { getConnections } = connectionSlice.actions;

export default connectionSlice.reducer;
