import { Outlet } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Body() {
  return (
    <div>
      <Navbar />
      <Outlet/>
      <Footer/>
    </div>
  );
}

export default Body;
