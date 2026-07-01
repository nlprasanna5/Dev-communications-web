import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Login from "./components/Login";
import EditProfile from "./components/EditProfile";
import Profile from "./components/Profile";

function App() {
  return (
    <div data-theme={"mytheme"}>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />

              <Route path="/profile" element={<Profile />} />
              <Route path="/profile/edit" element={<EditProfile />} />
              <Route path="/connections" element={<div>Connections</div>} />
              <Route path="/messages" element={<div>Messages</div>} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
