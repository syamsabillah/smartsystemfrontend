import { useEffect } from "react";
import { Header, Footer, Sidebar, MobileMenu } from ".";
import { Route, Routes, useLocation } from "react-router-dom";
import {
  Home,
  Login,
  Signup,
  NoMatch,
  Predict,
  Lessons,
  Inventory,
} from "../pages";
import Auth from "../utils/auth";

const MainSection = () => {
  const loggedIn = Auth.loggedIn();
  const location = useLocation();
  const { pathname } = location;

  // Determine if the current path should not show the sidebar
  const hideSidebar = pathname === "/" || pathname === "/login";

  // Scroll to the top of the page on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <>
      {!hideSidebar && <Sidebar />}
      <div
        className={`overflow-x-hidden overflow-y-auto flex flex-col ${
          loggedIn && !hideSidebar
            ? "mb-20 sm:mb-0 sm:ms-[88px] xl:ms-[300px]"
            : ""
        }`}
      >
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/lessons" element={<Lessons />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="*" element={<NoMatch />} />
          </Routes>
        </main>
        <Footer />
      </div>
      {!hideSidebar && <MobileMenu />}
    </>
  );
};

export default MainSection;
