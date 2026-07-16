import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import feedSlice from "./feedSlice";
import connectionSlice from "./connectionSlice";
import requestSlice from "./requestSlice";
import onlineUsersSlice from "./onlineUserSlice";


const appStore= configureStore({
    reducer:{
        user:userSlice,
        feed:feedSlice,
        connections:connectionSlice,
        requests:requestSlice,
        onlineUsers:onlineUsersSlice

    }

});

export default appStore