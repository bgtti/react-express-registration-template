// import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
// import Home from '../pages/Home';

// const Router = () => {


//  return (
//   <BrowserRouter>
//    {/* {<AxiosApiInterceptor />}
//    {loaderDisplay ? <Loader></Loader> : ""} */}
//    {/* <NavBar /> */}
//    <Routes>
//     {/* Unprotected routes */}
//     <Route index element={<Home />} />
//     <Route exact path="/" element={<Home />} />
//     {/* <Route exact path="login" element={<Login />} />
//     <Route exact path="signup" element={<SignUp />} /> */}
//     {/* <Route exact path="terms" element={<Terms />} /> */}
//    </Routes>
//    {/* <Footer /> */}
//   </BrowserRouter>
//  )
// }
// export default Router

import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Home from '../pages/Home/Home';
import Terms from "../pages/Terms/Terms";
import Dashboard from "../pages/Dashboard/Dashboard";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";

const Router = () => {


 return (
  <BrowserRouter>
   <Header />
   <Routes>
    {/* <Route index element={<Home />} />
    <Route exact path="/" element={<Home />} /> */}
    {/* <Route path="/" element={<Home />} /> */}
    <Route index element={<Home />} />
    <Route exact path="/" element={<Home />} />
    <Route exact path="terms" element={<Terms />} />
    <Route exact path="login" element={<Login />} />
    <Route exact path="signup" element={<Signup />} />
   </Routes>
   <Footer />
  </BrowserRouter>
 )
}
export default Router