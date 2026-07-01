import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";

import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Login from "./components/Login";
import Profile1 from "./components/Profile1";


function App() {
  return (
    <div data-theme={"mytheme"}>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />

              <Route path="/profile" element={<Profile1 />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/connections" element={<div>Connections</div>} />
            <Route path="/messages" element={<div>Messages</div>} />
            <Route path="/hello" element={<div>Hello</div>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
