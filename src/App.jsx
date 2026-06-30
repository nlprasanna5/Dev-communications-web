import { BrowserRouter, Route, Routes } from "react-router";
import Body from "./components/Body";

import Profile from "./components/Profile";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Feed from "./components/Feed";
import Login from "./components/Login";


function App() {
  return (
    <div data-theme={"mytheme"}>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />} />

              <Route path="/profile" element={<Profile />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/hello" element={<div>hello</div>} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
